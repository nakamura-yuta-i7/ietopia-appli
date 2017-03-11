import Page from '../Page';
import './search_form_station.scss';
import queryString from 'queryString';

import StationSection from "../parts/StationSection";
import RosenSection from "../parts/RosenSection";
import HitCount from "../parts/HitCount";

export default class SearchFormStationPage extends Page {
  indexAction() {
    this.headerTitle = "路線・駅";
    this.headerBackButtonText = `検索条件`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    this.hitCount = null;
    
    var $searchForm = $(`
      <form class="search-form">
        <div id="rosen-area"></div>
        <div id="station-area"></div>
      </form>
    `);
    $searchForm.change(()=>{
      var formQs = $searchForm.serialize();
      var formParams = global.queryString.parse(formQs);
      formParams.station = formParams.station ? formParams.station : [];
      formParams.station = Array.isArray(formParams.station) ? formParams.station : [formParams.station];
      Object.assign(APP.search_history, formParams);
      this.hitCount.refresh();
    });
    var $rosenArea = $searchForm.find("#rosen-area");
    var $stationArea = $searchForm.find("#station-area");
    
    // 路線選択メニューエリア
    var rosenSection = new RosenSection();
    $rosenArea.html(null);
    $rosenArea.append( rosenSection.getHtml() );
    
    renderStationSection();
    rosenSection.setChangeEvent(()=>{
      renderStationSection();
    });
    
    // 駅選択チェックボックスエリア
    function renderStationSection() {
      
      var stationSection = new StationSection({
        selectedVals: global.APP.search_history.station || [],
        rosen: rosenSection.getSelectedValue()
      });
      var $html = stationSection.getHtml();
      var $checkboxes = $html.find("input[type=checkbox]");
      $stationArea.html(null);
      $stationArea.append( $html );
    }
    function getStationCheckedVals() {
      return (function() {
        var values = [];
        $stationArea.find(":checked").each(function() {
          values.push( $(this).val() );
        });
        return values;
      })();
    }
    
    
    // // 決定ボタンエリア
    // var $submitButtonArea = $(`
    //   <div id="submit-btn-area">
    //   </div>
    // `);
    // var $submitButton = $(`
    //   <div class="search_form_conditions_submit_button">
    //     <img src="img/common/form/search_form_conditions_submit_button.png">
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

    $(".search_form_station-page .history-back").on("click", function() {
      
      var api = global.APP.api.ietopia.user.search_history;
      api.save( JSON.stringify(global.APP.search_history) );
      
      global.refreshRosenStationInput($(".search-page input[name=station]"));
    });
    
  }
}