import Html from "./Html";
import ModalDialog from './ModalDialog';
import "./SortModal.scss";

export default class SortModal extends Html {
  constructor(params={}) {
    super();
    
    var selectedVal = global.APP.search_history.sort;
    
    var $menu = $select({
      options: [
        "賃料の安い順",
        "面積の広い順",
        "新着順",
      ],
      name: "sort",
      selectedVal: selectedVal,
    });
    
    var $modalContents = $(`
      <div class="sort-modal-content">
        <div class="title">並び替え</div>
      </div>
    `);
    $modalContents.append($menu);
    
    var modal = new ModalDialog($modalContents);
    modal.open();
    
    $menu.on("change", () => {
      global.APP.search_history.sort = $menu.val();
      modal.close();
      
      // 画面切り替え
      renderPage({
        page: "search_result",
        action: "index",
      });
    });
    this.$html = $modalContents;
  }
}