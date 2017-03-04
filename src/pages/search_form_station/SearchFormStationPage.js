import Page from '../Page';
import './search_form_station.scss';
import queryString from 'queryString';

import StationSection from "../parts/StationSection";
import RosenSection from "../parts/RosenSection";

export default class SearchFormStationPage extends Page {
  indexAction() {
    this.headerTitle = "路線・駅";
    this.headerBackButtonText = `検索条件`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    var $searchForm = $(`
      <form class="search-form">
        <div id="rosen-area"></div>
        <div id="station-area"></div>
      </form>
    `);
    var $rosenArea = $searchForm.find("#rosen-area");
    var $stationArea = $searchForm.find("#station-area");
    
    // 路線選択メニューエリア
    var rosenSection = new RosenSection();
    $rosenArea.html(null);
    $rosenArea.append( rosenSection.getHtml() );
    
    renderStationSection();
    rosenSection.setChangeEvent(function() {
      saveSearchHistory();
      renderStationSection();
    });
    
    // 駅選択チェックボックスエリア
    function renderStationSection() {
      console.log( "global.APP.search_history.station", global.APP.search_history.station );
      var stationSection = new StationSection({
        selectedVals: global.APP.search_history.station || [],
        rosen: rosenSection.getSelectedValue()
      });
      var $html = stationSection.getHtml();
      var $checkboxes = $html.find("input[type=checkbox]");
      $checkboxes.on("change", saveSearchHistory);
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
    function saveSearchHistory() {
      // 検索条件をローカル変数とAPIサーバー側に保管
      var api = APP.api.ietopia.user.search_history;
      var params = global.APP.search_history;
      params.rosen = rosenSection.getSelectedValue();
      params.station = getStationCheckedVals();
      api.save( JSON.stringify(params) );
    }
    
    
    // 決定ボタンエリア
    var $submitButtonArea = $(`
      <div id="submit-btn-area">
      </div>
    `);
    var $submitButton = $(`
      <div class="search_form_conditions_submit_button">
        <img src="img/common/form/search_form_conditions_submit_button.png">
      </div>
    `);
    $submitButtonArea.append( $submitButton );
    $submitButton.on("click", function() {
      history.back();
    });
    
    $searchForm.append( $submitButtonArea );
    
    this.$contents.html( $searchForm );
  }
}