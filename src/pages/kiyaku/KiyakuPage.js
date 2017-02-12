import Page from '../Page';
import './kiyaku.scss';

export default class KiyakuPage extends Page {
  indexAction() {
    this.headerTitle = "利用規約"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
  }
}