import Page from '../Page';
import './info.scss';

export default class InfoPage extends Page {
  indexAction() {
    this.headerTitle = "お知らせ"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
  }
}