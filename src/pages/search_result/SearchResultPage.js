import Page from '../Page';
import './search_result.scss';
import RoomList from "../parts/RoomList";
import SortModal from '../parts/SortModal';


export default class SearchResultPage extends Page {
  indexAction() {
    this.displayHeaderTitle = false;
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    this.$headerOriginalContents = $(`
      <div id="search-result-panel">
      </div>
    `);
    var $countDiv = $(`
        <div id="count">
          <span id="val">--</span>
          <span id="ken">件</span>
        </div>`);
    var $countVal = $countDiv.find("#val");
    var $sortButton = $(`<div id="sort-button">並び替え</div>`);
    $sortButton.on("click", () => {
      new SortModal();
    });
    var $filterButton = $(`<div id="filter-button">絞り込み</div>`);
    $filterButton.on("click", () => {
      renderPage({
        page: "search"
      });
    });
    
    this.$headerOriginalContents.append( $countDiv );
    this.$headerOriginalContents.append( $sortButton );
    this.$headerOriginalContents.append( $filterButton );
    
    RoomList.findAll(global.APP.search_history, $countVal)
    .then( $roomList => {
      this.$contents.append( $roomList );
    });
  }
}