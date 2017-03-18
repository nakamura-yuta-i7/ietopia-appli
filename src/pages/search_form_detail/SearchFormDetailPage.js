import Page from '../Page';
import './search_form_detail.scss';

import MadoriSection from "../parts/MadoriSection";
import TikunenSection from "../parts/TikunenSection";
import MensekiSection from "../parts/MensekiSection";
import EkitohoSection from "../parts/EkitohoSection";
import KodawariJokenSection from "../parts/KodawariJokenSection";
import HitCount from "../parts/HitCount";

export default class SearchFormDetailPage extends Page {
  indexAction() {
    this.headerTitle = "条件・こだわり";
    this.headerBackButtonText = `検索条件`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    this.hitCount = null;
    
    var $searchForm = $(`
      <form class="search-form">
      </form>
    `);
    $searchForm.change(()=>{
      var formQs = $searchForm.serialize();
      var formParams = global.queryString.parse(formQs);
      formParams.madori = forceArray(formParams.madori);
      formParams.menseki = forceArray(formParams.menseki);
      formParams.kodawari_joken = forceArray(formParams.kodawari_joken);
      
      function forceArray(val) {
        val = typeof val === "undefined" ? [] : val;
        val = val.length == 0 ? [] : val;
        val = Array.isArray(val) ? val : [val];
        return val;
      }
      Object.assign(APP.search_history, formParams);
      
      this.hitCount.refresh();
    });
    
    // 間取選択エリア
    var madoriSecrion = new MadoriSection({
      selectedVals: global.APP.search_history.madori,
    });
    $searchForm.append(madoriSecrion.getHtml());
    
    // 築年数選択エリア
    var tikunenSection = new TikunenSection(
      global.APP.search_history.tikunensu
    );
    $searchForm.append(tikunenSection.getHtml());
    
    // 専有面積エリア
    var mensekiSection = new MensekiSection({
      selectedVals: global.APP.search_history.menseki,
    });
    $searchForm.append(mensekiSection.getHtml());
    
    // 駅徒歩エリア
    var ekitohoSection = new EkitohoSection(
      global.APP.search_history.ekitoho
    );
    $searchForm.append(ekitohoSection.getHtml());
    
    // こだわり条件エリア
    var kodawariJokenSection = new KodawariJokenSection({
      selectedVals: global.APP.search_history.kodawari_joken,
    });
    $searchForm.append(kodawariJokenSection.getHtml());
    
    // // 決定ボタンエリア
    // var $submitButtonArea = $(`
    //   <div id="submit-btn-area">
    //   </div>
    // `);
    // var $submitButton = $(`
    //   <div class="search_form_conditions_submit_button">
    //     <img width="199" src="img/common/form/search_form_conditions_submit_button.png" style="display:block;">
    //   </div>
    // `);
    // $submitButtonArea.append( $submitButton );
    // $submitButton.on("click", function() {
    //   history.back();
    // });
    
    // $searchForm.append( $submitButtonArea );
    
    this.$contents.html( $searchForm );
  }
  postRender() {
    
    var $parent = this.$main;
    this.hitCount = new HitCount($parent);
    
    $(".search_form_detail-page .history-back").on("click", function() {
      
      // 検索条件をローカル変数とAPIサーバー側に保管
      var api = global.APP.api.ietopia.user.search_history;
      api.save( JSON.stringify(global.APP.search_history) );
      console.log( "koko!!!" );
      var $kodawariInput = $(".search-page input[name=kodawari]");
      refreshKodawariInput($kodawariInput);
    });
    
  }
}