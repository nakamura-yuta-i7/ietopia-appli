import Page from '../Page';
import './news.scss';

import Promise from "bluebird";

export default class NewsPage extends Page {
    indexAction() {
        this.headerTitle = "新着・おすすめ";
        
        
        var db = openDatabase("testDB", "", "Test Database", 1000);
        console.log( "DB" );
        console.log( db );
        console.log( "koko2" );
        
        db.transaction(
            function(tr) {
                var sql = "select name from sqlite_master where type = 'table';";
                tr.executeSql(sql, [], function(tran, result) {
                    console.log( result );
                });
                // tr.executeSql("DROP TABLE IF EXISTS test", [],
                //     function() { console.log("DROP TABLE SUCCESS"); },
                //     function() { console.log("DROP TABLE ERROR"); }
                // );
                // tr.executeSql("CREATE TABLE test ( id, name )", [],
                //     function() { console.log("CREATE TABLE SUCCESS"); },
                //     function() { console.log("CREATE TABLE ERROR"); }
                // );
                tr.executeSql("SELECT id FROM test ORDER BY id DESC LIMIT 1", [], function(rt, result) {
                    var row = result.rows.item(0);
                    var maxId = row["id"] + 1;
                    tr.executeSql("INSERT INTO test VALUES ( ?, ? )", [ maxId, 'YAMADA' ],
                        function() {
                            console.log("INSERT DATA YAMADA"+ maxId +" SUCCESS");
                            
                            tr.executeSql("SELECT * FROM test", [],
                                function(rt, rs) {
                                    console.log("SELECT: SUCCESS");
                                    for (var i = 0; i < rs.rows.length; i++) {
                                        var row = rs.rows.item(i);
                                        console.log(row.id + " / " + row.name);
                                    }
                                },
                                function() { console.log("SELECT: ERROR"); }
                            );
                        },
                        function() { console.log("INSERT DATA YAMADA ERROR"); }
                    );
                })
            },
            function(err) { console.log("TRANSACTION ERROR", err); },
            function(   ) { console.log("TRANSACTION SUCCESS"); }
        );
        
        var model = new APP.db.SearchHistory();
        model.showTables()
        .then((tables)=>{
             console.log( "koko1" );
            tables.forEach((table)=>{
                console.log( "koko2" );
                model.query(`SELECT * FROM ${table}`)
                .then((rows)=>{
                    console.log( rows );
                });
            });
        })
        .then((result)=>{
            console.log( {result} );
        });
    }
}