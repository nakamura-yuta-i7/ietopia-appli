import Page from '../Page';
import './search_form_detail.scss';

export default class SearchFormDetailPage extends Page {
  indexAction() {
    this.headerTitle = "条件・こだわり";
    this.headerBackButtonText = `検索条件`
    this.displayHeaderBackButton = true;
    this.displayHeaderLogoS = false;
    
    var $searchForm = $(`<form class="search-form">
      <section>
        <h2>間取</h2>
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
    $stationInput.on("click", function() {
      console.log( "koko1" );
      return false;
    });
    
    var $searchButton = $searchForm.find(".btn_search");
    $searchButton.on("click", function() {
      
      renderPage({
        page: "search_result",
        action: "index",
        transitionType: "SLIDE_LEFT"
      });
    });
    
    this.$contents.html( $searchForm );
  }
}