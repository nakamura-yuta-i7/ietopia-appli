import FavoriteButton from "../parts/FavoriteButton";

export default class RoomItem {
  // 部屋要素を構築
  static createElem(room) {
    // 部屋
    var $room = $(`<div class="room">`);
    // 外観写真
    var $gaikanImage = ( () => {
      var gaikanImageMainUrl = room.gaikan_images.count == 0 ?
          "" : // 外観写真が無い場合
          room.gaikan_image_main ; // 外観写真（メイン）
      return $(`<img class="main-img" src="${gaikanImageMainUrl}">`);
    } )();
    $room.append( $gaikanImage );
    // 半透明グラデーション背景
    var $bg = $(`<div class="bg"></div>`);
    $room.append( $bg );
    // お気に入り登録スターアイコン
    var $starDiv = new FavoriteButton({room_id: room.id}).getHtml();
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
    $room.on("tap", () => {
      
      // 画面切り替え
      renderPage({
        page: "room",
        transitionType: "SLIDE_LEFT",
        requests: {
          room_id: room.id
        }
      });
    });
    return $room;
  }
}