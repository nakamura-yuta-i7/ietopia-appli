import Html from "./Html";
import "./checkboxes_section.scss";
var moji = require('moji');

export default class CheckboxesSection extends Html {
  constructor(params={}) {
    super();
    var title = params.title || "";
    var identifier = params.identifier || "";
    this.identifier = identifier;
    this.apiResult = params.apiResult || "";
    this.selectedVals = params.selectedVals || []
    this.selectedVals = is("Array", this.selectedVals) ? this.selectedVals : [this.selectedVals];
    
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
    $removeAllChecks.tappable( ()=>{
      $section.find(":checked").trigger("click");
    });
    this.$html = $section;
  }
  buildCheckbox(data) {
    var $checkbox = $(`
      <label class="checkbox">
        <input type="checkbox" name="${this.identifier}" value="${data.value}">
        <span>${moji(data.name).convert('ZK', 'HK').toString()}</span>
      </label>
    `);
    if ( $.inArray(data.value, this.selectedVals) !== -1 ) {
      $checkbox.find("input").trigger("click");
    }
    return $checkbox;
  }
}

