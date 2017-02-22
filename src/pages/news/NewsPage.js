import Page from '../Page';
import './news.scss';

import Promise from "bluebird";

export default class NewsPage extends Page {
    indexAction() {
        this.headerTitle = "新着・おすすめ";
        
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