import Page from '../Page';
import './news.scss';

import Promise from "bluebird";

export default class NewsPage extends Page {
    indexAction() {
        this.headerTitle = "新着・おすすめ";
        
    }
}