import Page from '../Page';
import './history.scss';

export default class HistoryPage extends Page {
  indexAction() {
    this.headerTitle = "履歴"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
  }
}