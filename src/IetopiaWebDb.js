class WebSqlDatabase {
    DBNAME(){
      throw new Error("DBNAME() is undefined");
    }
    TABLE() {
      throw new Error("TABLE() is undefined");
    }
    constructor() {
        var dbname = this.DBNAME();
        var version = "1.0";
        var displayName = dbname;
        var estimatedSize = 4999999; // 5MB(5MBを超える場合、確認ダイアログが出るらしい)
        this.db = openDatabase(dbname, version, displayName, estimatedSize);
    }
    createSelectSql(params={}) {
        var where = (function() {
            if ( ! params.where ) return ""; 
            return params.where.length ? " WHERE " + params.where : "";
        })();
        var join   = params.join ? " "+ params.join : "";
        var fields = params.fields ? params.fields : " * ";
        var fields = $.isArray(fields) ? fields.join(",") : fields;
        var group  = params.group ? "GROUP BY "+ params.group : "";
        var order  = params.order ? "ORDER BY "+ params.order : "";
        var limit  = params.limit ? "LIMIT "+ params.limit : "";
        var offset = params.offset ? "OFFSET "+ params.offset : "";
        return ` SELECT ${fields} FROM ${this.TABLE()} ${join} ${where} ${group} ${order} ${limit} ${offset}`;
    }
    insert(values) {
        var sql = this.createInsertSql({values});
        return this.query( sql )
        .then(()=>{
            return this.lastInsertId()
        })
    }
    createInsertSql(params={}) {
        var fields = [];
        var values = [];
        var fields_string = "";
        var values_string = "";
        if ( params.values ) {
            fields = Object.keys(params.values);
            values = Object.values(params.values);
            values = values.map( (val) => `'${val}'` );
            fields_string = fields.length ? fields.join(",") : ""
            values_string = values.length ? values.join(",") : ""
        }
        return `
            INSERT INTO ${this.TABLE()} 
                (${fields_string}) 
                VALUES (${values_string}) ;
        `;
    }
    lastInsertId() {
        return this.query(` SELECT last_insert_rowid() `)
        .then((row)=>{
            return row[0] ? row[0]["last_insert_rowid()"] : false ;
        });
    }
    save(values, where) {
        return this.findAll({where})
        .then((rows)=>{
            if ( rows.length ) {
                return this.update(values, where);
            } else {
                return this.insert(values);
            }
        })
    }
    delete(where) {
        var where = this.createWhereSql(where);
        return this.query(` DELETE FROM ${this.TABLE()} WHERE ${where} `);
    }
    update(values, where) {
        var sql = this.createUpdateSql({values, where});
        return this.query(sql);
    }
    createUpdateSql(params={}) {
        var fields = [];
        var values = [];
        var field_and_values_string = "";
        var field_and_values = [];
        if ( params.values ) {
            fields = Object.keys(params.values);
            values = params.values;
            fields.forEach((field)=>{
                var value = values[field];
                field_and_values.push(` ${field} = '${value}' `);
            });
            field_and_values_string = field_and_values.length ? field_and_values.join(",") : ""
        }
        var where_string = this.createWhereSql(params.where);
        
        return `
            UPDATE ${this.TABLE()} SET 
                ${field_and_values_string} WHERE ${where_string};
        `;
    }
    createWhereSql(where) {
        var where_string = " 1 = 1 ";
        if ( is("String", where) && where.length ) {
            where_string = where;
        } else if ( is("Array", where) ) {
            where.forEach((val)=>{
                where_string += ` AND ${val} `
            });
        } else {}
        return where_string;
    }
    query(sql) {
        return new Promise( (resolve, reject) => {
            this.db.transaction( (tx) => {
                    tx.executeSql(sql, [], function(tran, result) {
                        resolve(result.rows);
                    });
                }, reject // 第2引数はエラー時のコールバック
            );
        });
    }
    findAll(params={}) {
        var sql = this.createSelectSql(params);
        return this.query(sql);
    }
    findCount(where="") {
        where = " WHERE " + this.createWhereSql(where)
        return this.query(`SELECT count(*) AS c FROM ${this.TABLE()} ${where}`)
        .then(function(rows) {
            return rows[0]["c"];
        });
    }
    findLast(where="") {
        var order = " id DESC ";
        return this.findFirst(where, order)
    }
    findFirst(where="", order="") {
        if ( order.length == 0 ) {
            order = " id ASC ";
        }
        var order = order.length ? ` ORDER BY ${order} ` : "";
        where = " WHERE " + this.createWhereSql(where)
        return this.query(`SELECT * FROM ${this.TABLE()} ${where} ${order} LIMIT 1`)
        .then(function(rows) {
            if ( rows.length == 0 ) return false;
            return rows[0];
        });
    }
    dropTable() {
        return this.query(`DROP TABLE IF EXISTS ${this.TABLE()}`);
    }
}
export default class IetopiaWebDb extends WebSqlDatabase {
    DBNAME() {
      return "ietopia_web_db";
    }
    constructor() {
        super();
        this.createIfNotExists().catch( (err) => {
            console.error( err );
        } );
    }
}
export class SearchHistory extends IetopiaWebDb {
    TABLE() {
        return "search_history";
    }
    static get fields() {
        return Enum(
            "params_json",
            "created_at"
        );
    }
    createIfNotExists() {
        return this.query(`
            CREATE TABLE IF NOT EXISTS ${this.TABLE()} (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                "params_json" TEXT NULL,
                "created_at" datetime NOT NULL
            )
        `);
    }
    getLastConditions() {
        return this.findLast()
        .then(function(result) {
            if (result == false) return {};
            return JSON.parse(result["params_json"]);
        });
    }
    SAVE_MAX_COUNT() {
        return global.config.SEARCH_HISTORY_MAX_COUNT;
    }
    saveConditions(conditionParams={}) {
        // 検索条件パラメータを記録
        var value = JSON.stringify( conditionParams )
        return this.insert({
            params_json: value,
            created_at: now(),
        });
    }
}
export class Kvs extends IetopiaWebDb {
    TABLE() {
      return "kvs";
    }
    createIfNotExists() {
        return this.query(`
            CREATE TABLE IF NOT EXISTS kvs ( 
                key_str TEXT UNIQUE,
                value TEXT DEFAULT NULL
            )
        `);
    }
    set(key, value) {
        var where = `key_str = '${key}'`;
        return this.findCount(where).then( (count) => {
            if ( count > 0 ) {
                // 存在したら
                var sql = `UPDATE kvs SET value='${value}' WHERE key_str='${key}';`;
            } else {
                // 存在しなければ
                var sql = `INSERT INTO kvs(key_str,value) VALUES ('${key}', '${value}');`;
            }
            return this.query(sql);
        });
    }
    get(key) {
        var where = `key_str = '${key}'`;
        return this.findFirst(where).then( (row) => {
            if ( ! row ) return false;
            return row.value;
        });
    }
}