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
    
    var selectMin = new YatinSelectMin(30000);
    var selectMax = new YatinSelectMax(400000);
    
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
    
    var $submitButtonArea = $(`
      <div id="submit-btn-area">
        <div class="btn_search">
          <img src="img/common/form/btn_search.png">
        </div>
      </div>
    `);
    
    $searchForm.append( $submitButtonArea );
    
    var $stationInput = $searchForm.find("input[name=station]");
    $stationInput.focus(function() {
      $(this).blur();
      renderPage({
        page: "search_form_station",
        transitionType: "SLIDE_LEFT"
      });
      return false;
    });
    
    var $stationInput = $searchForm.find("input[name=kodawari]");
    $stationInput.focus(function() {
      $(this).blur();
      renderPage({
        page: "search_form_detail",
        transitionType: "SLIDE_LEFT"
      });
      return false;
    });
    
    var $searchButton = $searchForm.find(".btn_search");
    $searchButton.on("click", function() {
      
      APP.api.ietopia.user.search_history.request()
      
      renderPage({
        page: "search_result",
        action: "index",
        transitionType: "SLIDE_LEFT"
      });
    });
    
    this.$contents.html( $searchForm );
  }
}