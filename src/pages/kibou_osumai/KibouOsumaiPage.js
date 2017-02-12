import Page from '../Page';
import './kibou_osumai.scss';

export default class KibouOsumaiPage extends Page {
  indexAction() {
    this.headerTitle = "希望のお住い"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
  }
}