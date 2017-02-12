import Page from '../Page';
import './favorite.scss';

export default class FavoritePage extends Page {
  indexAction() {
    this.headerTitle = "お気に入り"
  }
}