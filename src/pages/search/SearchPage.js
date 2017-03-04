import Page from '../Page';
import './search.scss';
import './search-common.scss';
import { YatinSelectMin, YatinSelectMax } from "../parts/YatinSelect";

export default class SearchPage extends Page {
  indexAction() {
    
    this.headerTitle = "検索";
    var $searchForm = $(`
      <form class="search-form">
      </form>
    `);
    
    var $freewordSection = $(`
      <section>
        <div class="description text-right">マンション・アパート名、全文から検索</div>
        <div class="ui input word">
          <input type="text" name="word" placeholder="フリーワードで検索">
        </div>
      </section>
    `);
    var $freewordInput = $freewordSection.find("input");
    $freewordInput.val( global.APP.search_history.word );
    
    $searchForm.append( $freewordSection );
    
    var $rosenStationSection = $(`
      <section>
        <h2>路線・駅</h2>
        <div class="ui left icon input station">
          <input type="text" name="station" placeholder="指定なし">
          <div class="icon_train">
            <img src="img/common/form/icon_train.png">
          </div>
          <div class="icon_remove">
            <img src="img/common/form/icon_remove.png">
          </div>
        </div>
      </section>
    `);
    $searchForm.append( $rosenStationSection );
    
    var $yatinSection = $(`
      <section id="yatin">
        <h2>￥ 家賃</h2>
        <div class="table">
          <div class="table-cell min">
          </div>
          <div class="table-cell">
            <span class="between">〜</span>
          </div>
          <div class="table-cell max">
          </div>
        </div>
      </section>
    `);
    $searchForm.append($yatinSection);
    
    var selectMin = new YatinSelectMin( global.APP.search_history["yatin-min"] );
    var selectMax = new YatinSelectMax( global.APP.search_history["yatin-max"] );
    
    $yatinSection.find(".min").append( selectMin.getHtml() );
    $yatinSection.find(".max").append( selectMax.getHtml() );
    
    var $codawariJokenSection = $(`
      <section>
        <h2>条件・こだわり</h2>
        <div class="description">間取や面積、駅徒歩、設備などこだわりポイントを指定</div>
        <div class="ui left icon input kodawari">
          <input type="text" name="kodawari" placeholder="指定なし">
          <div class="icon_list">
            <img src="img/common/form/icon_list.png">
          </div>
          <div class="icon_remove">
            <img src="img/common/form/icon_remove.png">
          </div>
        </div>
      </section>
    `);
    $searchForm.append( $codawariJokenSection );
    
    var $stationInput = $searchForm.find("input[name=station]");
    $stationInput.focus(function() {
      $(this).blur();
      renderPage({
        page: "search_form_station",
        transitionType: "SLIDE_LEFT"
      });
      return false;
    });
    
    // 路線・駅選択画面に遷移
    var $kodawariInput = $searchForm.find("input[name=kodawari]");
    $kodawariInput.focus(function() {
      $(this).blur();
      renderPage({
        page: "search_form_detail",
        transitionType: "SLIDE_LEFT"
      });
      return false;
    });
    
    this.$contents.html( $searchForm );
    
    // 検索ボタンエリア
    var $submitButtonArea = $(`
      <div id="submit-btn-area">
        <div class="btn_search">
          <img src="img/common/form/btn_search.png">
        </div>
      </div>
    `);
    this.$main.append( $submitButtonArea );
    
    // 「検索する」ボタンを押した時
    var $searchButton = $submitButtonArea.find(".btn_search");
    $searchButton.on("click", function() {
      
      global.APP.search_history.word = $freewordInput.val();
      
      // 検索条件をローカル変数とAPIサーバー側に保管
      var api = global.APP.api.ietopia.user.search_history;
      var params = global.APP.search_history;
      api.save( JSON.stringify(params) );
      
      // 画面切り替え
      renderPage({
        page: "search_result",
        action: "index",
        transitionType: "SLIDE_LEFT"
      });
    });
  }
}