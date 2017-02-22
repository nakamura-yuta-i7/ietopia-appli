import Page from '../Page';
import './news.scss';

import Promise from "bluebird";

export default class NewsPage extends Page {
    indexAction() {
        this.headerTitle = "新着・おすすめ";
        
        var model = new APP.db.SearchHistory();
        model.showTables()
        .then((tables)=>{
            tables.forEach((table)=>{
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