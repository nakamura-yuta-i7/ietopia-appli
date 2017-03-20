import Page from '../Page';
import './search.scss';
import './search-common.scss';
import RecommendArea from "../parts/RecommendArea";
import { YatinSelectMin, YatinSelectMax } from "../parts/YatinSelect";
import HitCount from "../parts/HitCount";

export default class SearchPage extends Page {
  postRender() {
    var $parent = this.$main;
    this.hitCount = new HitCount($parent);
    global.APP.search_page.hit_count_instance = this.hitCount;
  }
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
          <input type="text" name="station" placeholder="指定なし" readonly="readonly">
          <div class="icon_train">
            <img src="img/common/form/icon_train.png">
          </div>
          <div class="icon_remove">
            <img src="img/common/form/icon_remove.png">
          </div>
        </div>
      </section>
    `);
    var $stationInput = $rosenStationSection.find("input[name=station]");
    refreshRosenStationInput($stationInput);
    
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
    
    var $selectMin = new YatinSelectMin( global.APP.search_history["yatin-min"] ).getHtml();
    var $selectMax = new YatinSelectMax( global.APP.search_history["yatin-max"] ).getHtml();
    
    $yatinSection.find(".min").append( $selectMin );
    $yatinSection.find(".max").append( $selectMax );
    
    var $codawariJokenSection = $(`
      <section>
        <h2>条件・こだわり</h2>
        <div class="description">間取や面積、駅徒歩、設備などこだわりポイントを指定</div>
        <div class="ui left icon input kodawari">
          <input type="text" name="kodawari" placeholder="指定なし" readonly="readonly">
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
    $stationInput.click(function() {
      $(this).blur();
      renderPage({
        page: "search_form_station",
        transitionType: "SLIDE_LEFT"
      });
      return false;
    });
    
    // こだわり条件選択画面に遷移
    var $kodawariInput = $searchForm.find("input[name=kodawari]");
    $kodawariInput.click(function() {
      $(this).blur();
      renderPage({
        page: "search_form_detail",
        transitionType: "SLIDE_LEFT"
      });
      return false;
    });
    refreshKodawariInput($kodawariInput);
    
    
    // おすすめエリア
    var $recommendArea = new RecommendArea({
      selectedVals: global.APP.search_history.recommend_area,
    }).getHtml();
    $recommendArea.on("change", ()=>{
      var data = queryString.parse( $recommendArea.find("[name=recommend_area]").serialize() );
      global.APP.search_history.recommend_area = data["recommend_area"];
      this.hitCount.refresh();
    });
    $searchForm.append( $recommendArea );
    
    
    this.$contents.html( $searchForm );
    
    
    // 条件変更したらヒット件数更新
    $freewordInput.on("change", ()=>{
      global.APP.search_history.word = $freewordInput.val();
      this.hitCount.refresh();
    });
    $selectMin.on("change", ()=> this.hitCount.refresh() );
    $selectMax.on("change", ()=> this.hitCount.refresh() );
    
    $rosenStationSection.find(".icon_remove").on("click", ()=> {
      global.APP.search_history.rosen = null;
      global.APP.search_history.station = null;
      refreshRosenStationInput($stationInput);
      this.hitCount.refresh();
    });
    $codawariJokenSection.find(".icon_remove").on("click", ()=> {
      global.APP.search_history.tikunensu = "";
      global.APP.search_history.ekitoho = "";
      global.APP.search_history.menseki = [];
      global.APP.search_history.madori = [];
      global.APP.search_history.kodawari_joken = [];
      refreshKodawariInput($searchForm.find("input[name=kodawari]"));
      this.hitCount.refresh();
    });
    
    
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
      
      // 検索条件をローカル変数とAPIサーバー側に保管
      var params = global.APP.search_history;
      
      var api = global.APP.api.ietopia.user.search_history;
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
global.refreshRosenStationInput = function($stationInput) {
  console.log( "refreshRosenStationInput", global.APP.search_history );
  $stationInput.val( (function() {
    var rosen = global.APP.search_history.rosen || "";
    var stations = global.APP.search_history.station || [];
    if ( rosen.length && stations.length ) rosen += ": ";
    var strings = rosen + stations.join(",");
    strings = strings.length > 20 ? strings.substr(0,20)+"..." : strings;
    strings = strings.length == 0 ? "指定なし" : strings;
    return strings;
  })() );
}
global.refreshKodawariInput = function($kodawariInput) {
  console.log( "refreshKodawariInput", global.APP.search_history );
  $kodawariInput.val( (function() {
    var madori = global.APP.search_history.madori;
    var tikunensu = global.APP.search_history.tikunensu || "";
    var menseki = deepCopy( global.APP.search_history.menseki || [] );
    var ekitoho = global.APP.search_history.ekitoho || "";
    var kodawari_joken = (global.APP.search_history.kodawari_joken || []).concat().join(",");
    
    madori = (madori || []).concat().join(",");
    
    if (tikunensu.length) tikunensu = getTikunensuName(tikunensu);
    if (menseki.length) menseki = menseki.map(function(key) {
      return getMensekiName(key);
    });
    menseki = menseki.join(",");
    if (ekitoho.length) ekitoho = getEkitohoName(ekitoho);
    
    var arr = [];
    if ( madori.length ) arr.push(madori);
    if ( tikunensu.length ) arr.push(tikunensu);
    if ( menseki.length ) arr.push(menseki);
    if ( ekitoho.length ) arr.push(ekitoho);
    if ( kodawari_joken.length ) arr.push(kodawari_joken);
    
    var strings = arr.join(" ");
    strings = strings.length > 20 ? strings.substr(0,20)+"..." : strings;
    strings = strings.length == 0 ? "指定なし" : strings;
    return strings;
  })() );
}
global.getTikunensuName = function(key) {
  var item = _.find(global.APP.master.tikunensu, {value: key});
  return item ? item.name : false
}
global.getMensekiName = function(key) {
  var item = _.find(global.APP.master.menseki, {value: key});
  return item ? item.name : false
}
global.getEkitohoName = function(key) {
  var item = _.find(global.APP.master.ekitoho, {value: key});
  return item ? item.name : false
}

