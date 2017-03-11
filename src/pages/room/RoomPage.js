import Page from '../Page';
import "./room.scss";
import FavoriteButton from "../parts/FavoriteButton";
import TelModal from '../parts/TelModal';
import RoomImagesArea from "./RoomImagesArea";
import MainDataArea from "./MainDataArea";
import MapArea from "./MapArea";
import SetubiJokenArea from "./SetubiJokenArea";
import DetailDataArea from "./DetailDataArea";

export default class RoomPage extends Page {
  indexAction() {
    // ヘッダーパネルの設定
    this.headerTitle = "物件詳細";
    this.headerBackButtonText = `一覧`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    // 部屋IDは参照の仕方がめんどくさいのでここでメモしておく
    var room_id = this.requests.room_id;
    this.room_id = room_id;
    
    // 部屋API
    var api = global.APP.api.ietopia.room;
    
    // お気に入り登録ボタン
    this.$headerOriginalContents = $(`
      <div class="room-sub-menu">
      </div>
    `);
    var $favoriteBtn = new FavoriteButton({room_id}).getHtml();
    this.$headerOriginalContents.append( $favoriteBtn );
    
    // 部屋詳細ページの土台
    var $roomContents = $(`
      <div class="room-contents">
      </div>
    `);
    
    this.room = {};
    
    api.get(room_id)
    .then(data=>{
      
      console.log( "RoomData" );
      console.log( data );
      
      this.room = data;
      
      // 画像リスト
      $roomContents.append(
        new RoomImagesArea(data).getHtml() );
      
      // メイン情報
      $roomContents.append(
        new MainDataArea(data).getHtml() );
      
      // 地図エリア
      $roomContents.append(
        new MapArea(data).getHtml() );
      
      // 担当者からのコメント
      // 設備・条件
      $roomContents.append(
        new SetubiJokenArea(data).getHtml() );
      
      // 物件詳細情報
      $roomContents.append(
        new DetailDataArea(data).getHtml() );
      
      // 部屋情報HTMLをセット
      this.$contents.html( $roomContents );
    });
  }
  postRender() {
    
    var room_id = this.room_id;
    
    // お問い合わせエリア: ここから
    var $inquiryArea = $(`
      <div class="inquiry-area">
        <img class="inquiry-tel-btn" src="img/room/inquiry-tel-btn.png" width="270">
        <img class="inquiry-mail-btn" src="img/room/inquiry-mail-btn.png" width="68">
      </div>
    `);
    // 電話でお問い合わせボタン
    var $inquiryTelBtn = $inquiryArea.find(".inquiry-tel-btn");
    $inquiryTelBtn.on("click", () => {
      new TelModal({bukken: this.room});
    });
    
    // メールでお問い合わせボタン
    var $inquiryMailBtn = $inquiryArea.find(".inquiry-mail-btn");
    $inquiryMailBtn.on("click", function() {
      // 画面切り替え
      renderPage({
        page: "inquiry",
        transitionType: "SLIDE_LEFT",
        requests: {
          room_id: room_id
        }
      });
    });
    
    // エリアに追加
    this.$contents.after( $inquiryArea );
    // お問い合わせエリア: ここまで
  }
}
