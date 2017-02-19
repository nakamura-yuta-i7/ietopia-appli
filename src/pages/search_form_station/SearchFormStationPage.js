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
    
    // 路線選択メニューエリア
    var $rosenArea = $searchForm.find("#rosen-area");
    var rosenSection = new RosenSection();
    $rosenArea.html(null);
    $rosenArea.append( rosenSection.getHtml() );
    
    // 駅選択チェックボックスエリア
    var $stationArea = $searchForm.find("#station-area");
    var stationSection = new StationSection({
      selectedVals: []
    });
    $stationArea.html(null);
    $stationArea.append( stationSection.getHtml() );
    
    rosenSection.setChangeEvent( stationSection );
    
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