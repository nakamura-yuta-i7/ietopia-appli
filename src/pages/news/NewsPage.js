import Page from '../Page';
import './news.scss';

import Promise from "bluebird";

class WebSqlDatabase {
    DBNAME(){
      return "ietopia_web_db";
    }
    constructor() {
        var dbname = this.DBNAME();
        var version = "1.0";
        var displayName = dbname;
        var estimatedSize = 4999999; // 5MB(5MBを超える場合、確認ダイアログが出るらしい)
        this.db = openDatabase(dbname, version, displayName, estimatedSize);
    }
    query(sql) {
        return new Promise( (resolve, reject) => {
            this.db.transaction( (tx) => {
                    tx.executeSql(sql, [], function(tran, result) {
                        resolve(result.rows);
                    });
                },
                // 第2引数はエラー時のコールバック
                reject
            );
        });
    }
}
class IetopiaWebDb extends WebSqlDatabase {
    DBNAME() {
      return "ietopia_web_db";
    }
    constructor() {
        super();
        this.createIfNotExists().catch( (err) => {
            console.error( err );
        } );
    }
    findCount(where="") {
        where = where ? `WHERE ${where}` : ``
        return this.query(`SELECT count(*) AS c FROM ${this.TABLE()} ${where}`)
        .then(function(rows) {
            return rows[0]["c"];
        });
    }
    findFirst(where="") {
        where = where ? `WHERE ${where}` : ``
        return this.query(`SELECT * FROM ${this.TABLE()} ${where} LIMIT 1`)
        .then(function(rows) {
            if ( rows.length == 0 ) return false;
            return rows[0];
        });
    }
    dropTable() {
        return this.query(`DROP TABLE IF EXISTS ${this.TABLE()}`);
    }
}
class Kvs extends IetopiaWebDb {
    TABLE() {
      return "kvs";
    }
    createIfNotExists() {
        return this.query(`
            CREATE TABLE IF NOT EXISTS kvs ( 
                key_str TEXT UNIQUE,
                value TEXT DEFAULT NULL )
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

export default class NewsPage extends Page {
    indexAction() {
        
        this.headerTitle = "新着・おすすめ";
        
        // var kvs = new Kvs();
        // kvs.dropTable();
        
        var kvs = new Kvs();
        kvs.set("test5", "test6_String")
        .catch(function(err) {
            console.error( err );
            
        }).then(function() {
            
            return kvs.get("test6").then(function(result) {
                console.log( {result} );
            });
        });
        
        // kvs.query(`select * from kvs`)
        // // kvs.query(`select name from sqlite_master where type = 'table';`)
        // .then(function(result) {
        //     console.log( result );
        // }).catch(function(err) {
        //     console.error( err );
        // });
    }
}