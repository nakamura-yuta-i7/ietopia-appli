import Page from '../Page';
import './search_form_station.scss';

export default class SearchFormStationPage extends Page {
  indexAction() {
    this.headerTitle = "路線・駅";
    this.headerBackButtonText = `検索条件`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    var $searchForm = $(`<form class="search-form">
      <section>
        <h2>路線</h2>
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
      
      <section>
        <h2>駅</h2>
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
      
      <div id="submit-btn-area">
        <div class="btn_search">
          <img src="img/common/form/btn_search.png">
        </div>
      </div>
      
    </form>`);
    
    var $stationInput = $searchForm.find("input[name=station]");
    $stationInput.focus(function() {
      console.log( "koko1" );
      $(this).blur();
      return false;
    });
    
    var $searchButton = $searchForm.find(".btn_search");
    $searchButton.focus(function() {
      
      renderPage({
        page: "search_result",
        action: "index",
        transitionType: "SLIDE_LEFT"
      });
    });
    
    this.$contents.html( $searchForm );
  }
}