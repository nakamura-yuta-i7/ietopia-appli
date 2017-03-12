import Page from '../Page';
import './news.scss';
import RoomList from "../parts/RoomList";

export default class NewsPage extends Page {
  indexAction() {
    this.headerTitle = "新着・おすすめ";
    var $switchPanel = $(`
      <div class="switch-panel">
        <div class="switch-btn selected new">
          <span class="title">新着</span>
          <span class="count">--</span>
          <span class="ken">件</span>
        </div>
        <div class="switch-btn pickup">
          <span class="title">おすすめ</span>
          <span class="count">--</span>
          <span class="ken">件</span>
        </div>
      </div>
    `);
    this.$main.append($switchPanel);
    var $newCount = $switchPanel.find(".new .count");
    var $pickupCount = $switchPanel.find(".pickup .count");
    
    getPickupCount()
    .then( count => $pickupCount.html(count) );
    
    RoomList.findAll({new:1}, $newCount)
    .then( $roomList => {
      this.$contents.append($roomList);
    });
    
    var $pickupBtn = $switchPanel.find(".pickup");
    var $newBtn = $switchPanel.find(".new");
    
    $pickupBtn.on("click", () => {
      $newBtn.removeClass("selected");
      $pickupBtn.addClass("selected");
      RoomList.findAll({pickup:1})
      .then( $roomList => {
        this.$contents.append($roomList);
      });
    });
    
    $newBtn.on("click", () => {
      $pickupBtn.removeClass("selected");
      $newBtn.addClass("selected");
      RoomList.findAll({new:1})
      .then( $roomList => {
        this.$contents.append($roomList);
      });
    });
  }
}

function getPickupCount() {
  return global.APP.api.ietopia.room.count({pickup:1})
}