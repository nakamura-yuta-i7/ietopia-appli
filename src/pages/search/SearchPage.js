import Page from '../Page';
import './search.scss';

export default class SearchPage extends Page {
  indexAction() {
    this.headerTitle = "検索";
    var $searchForm = $(`<form>`);
    
    this.$contents.html( $searchForm );
  }
}