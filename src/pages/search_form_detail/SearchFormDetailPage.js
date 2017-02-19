import Page from '../Page';
import './search_form_detail.scss';

import MadoriSection from "../parts/MadoriSection";
import TikunenSection from "../parts/TikunenSection";
import MensekiSection from "../parts/MensekiSection";
import EkitohoSection from "../parts/EkitohoSection";
import KodawariJokenSection from "../parts/KodawariJokenSection";

export default class SearchFormDetailPage extends Page {
  indexAction() {
    this.headerTitle = "条件・こだわり";
    this.headerBackButtonText = `検索条件`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    var $searchForm = $(`
      <form class="search-form">
      </form>
    `);
    
    // 間取選択エリア
    var madoriSecrion = new MadoriSection({
      selectedVals: ["3K"],
    });
    $searchForm.append(madoriSecrion.getHtml());
    
    // 築年数選択エリア
    var tikunenSection = new TikunenSection({
      selectedVals: [3],
    });
    $searchForm.append(tikunenSection.getHtml());
    
    // 専有面積エリア
    var mensekiSection = new MensekiSection({
      selectedVals: ["20-30"],
    });
    $searchForm.append(mensekiSection.getHtml());
    
    // 駅徒歩エリア
    var ekitohoSection = new EkitohoSection({
      selectedVals: [5],
    });
    $searchForm.append(ekitohoSection.getHtml());
    
    // こだわり条件エリア
    var kodawariJokenSection = new KodawariJokenSection({
      selectedVals: ["BSアンテナ"],
    });
    $searchForm.append(kodawariJokenSection.getHtml());
    
    // 決定ボタンエリア
    var $submitButtonArea = $(`
      <div id="submit-btn-area">
      </div>
    `);
    var $submitButton = $(`
      <div class="search_form_conditions_submit_button">
        <img width="199" src="img/common/form/search_form_conditions_submit_button.png" style="display:block;">
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