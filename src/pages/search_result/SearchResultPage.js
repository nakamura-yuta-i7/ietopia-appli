import Page from '../Page';
import './search_result.scss';

export default class SearchResultPage extends Page {
  indexAction() {
    this.displayHeaderTitle = false;
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    this.$headerOriginalContents = $(`
      <div id="search-result-panel">
      </div>
    `);
    var $countDiv = $(`
        <div id="count">
          <span id="val">505</span>
          <span id="ken">件</span>
        </div>`);
    var $sortButton = $(`<div id="sort-button">並び替え</div>`);
    var $filterButton = $(`<div id="filter-button">絞り込み</div>`);
    
    this.$headerOriginalContents.append( $countDiv );
    this.$headerOriginalContents.append( $sortButton );
    this.$headerOriginalContents.append( $filterButton );
    
    var $roomList = $(`<div class="room-list"></div>`);
    this.$contents.append( $roomList );
    
    this.requestList()
    .then( (rooms) => {
      rooms.forEach( (room) => {
        var $room = this.createRoomElem(room);
        $roomList.append($room);
      } );
    } )
    .catch( (err) => {
      console.error( err );
    } );
  }
  // 部屋要素を構築
  createRoomElem(room) {
    // 部屋
    var $room = $(`<div class="room">`);
    // 外観写真
    var $gaikanImage = ( () => {
      var gaikanImageMainUrl = room.gaikan_images.count == 0 ?
          "" : // 外観写真が無い場合
          room.gaikan_image_main ; // 外観写真（メイン）
      return $(`<img class="main" src="${gaikanImageMainUrl}">`);
    } )();
    $room.append( $gaikanImage );
    // 半透明グラデーション背景
    var $bg = $(`<div class="bg"></div>`);
    $room.append( $bg );
    // お気に入り登録スターアイコン
    var $starImg = $(`<img src="img/common/room-list/icon_star_off.png">`);
    var $starDiv = $(`<div class="star"></div>`);
    $starDiv.append( $starImg );
    $starDiv.on("click", () => {
      console.log( "お気に入りに登録しました: ", room.id );
      return false;
    });
    $room.append( $starDiv );
    // 家賃＆間取／面積
    var $yatinMadoriDiv = $(`<div class="yatin-madori"></div>`);
    // 家賃
    var $yatinDiv = $(`<div class="yatin">
      <span class="yatin-int">${room.yatin_int/10000}</span>
      <span class="manyen">万円</span>
    </div>`);
    $yatinMadoriDiv.append( $yatinDiv );
    // 間取／面積
    var $madoriDiv = $(`<div class="madori-menseki">
      <span class="madori">${room.madori}</span>
      / <span class="menseki">${room.senyumenseki}</span>
    </div>`);
    $yatinMadoriDiv.append( $madoriDiv );
    $room.append( $yatinMadoriDiv );
    // 交通(１行目)
    var $kotuDiv = $(`<div class="kotu">
      <span>${room.kotu_first_line}</span>
    </div>`);
    $room.append( $kotuDiv );
    // 部屋タップで詳細ページに遷移
    $room.on("click", () => {
      $.ajax({
        url: global.config.API_BASE_URL + "/api/room/detail?id=" + room.id,
        dataType: "json",
      }).then( (room) => {
        console.log( room );
      } );
    });
    return $room;
  }
  requestList() {
    return $.ajax({
      url: global.config.API_BASE_URL + "/api/room/list",
      dataType: "json",
    })
  }
}