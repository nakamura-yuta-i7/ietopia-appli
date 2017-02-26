import Html from "./Html";
import "./checkboxes_section.scss";

export default class CheckboxesSection extends Html {
  constructor(params={}) {
    super();
    var title = params.title || "";
    var identifier = params.identifier || "";
    this.identifier = identifier;
    this.apiResult = params.apiResult || "";
    this.selectedVals = params.selectedVals || []
    
    var $section = $(`
      <section class="checkboxes-section ${identifier}-section">
        <h2>${title}</h2>
      </section>
    `);
    var $checkboxesArea = $(`
      <div class="${identifier}-checkboxes-area">
      </div>
    `);
    var $checkboxes = $(`
      <div class="${identifier}-checkboxes checkboxes">
        <div class="remove-all-checks">
          <a>すべてのチェックを外す</a>
        </div>
      </div>
    `);
    this.apiResult.forEach((data)=>{
      var $checkbox = this.buildCheckbox(data);
      $checkboxes.append($checkbox);
    });
    $checkboxesArea.append($checkboxes);
    $section.append($checkboxesArea);
    var $removeAllChecks = $checkboxes.find(".remove-all-checks");
    $removeAllChecks.on("click", ()=>{
      $section.find(".checked").trigger("click");
    });
    this.$html = $section
  }
  buildCheckbox(data) {
    var $checkbox = $(`
      <div class="ui checkbox">
        <input type="checkbox" name="${this.identifier}[]" value="${data.value}">
        <label>${data.name}</label>
      </div>
    `);
    $checkbox.checkbox();
    if ( $.inArray(data.value, this.selectedVals) !== -1 ) {
      $checkbox.trigger("click");
    }
    return $checkbox;
  }
}