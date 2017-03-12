import Page from '../Page';
import './favorite.scss';
import RoomList from "../parts/RoomList";

export default class FavoritePage extends Page {
  indexAction() {
    this.headerTitle = "お気に入り"
    
    RoomList.findAll({favorite:1})
    .then( $roomList => {
      this.$contents.append($roomList);
    });
  }
}