import Html from "./Html";

export default class MadoriSection extends Html {
  constructor() {
    super();
    var $madoriSection = $(`
      <section>
        <h2>間取</h2>
      </section>
    `);
    var $madoriCheckboxArea = $(`
      <div class="madori-checkboxes-area">
      </div>
    `);
    var $madoriCheckboxes = $(`
      <div class="madori-checkboxes">
        <div class="remove-all-checks">
          <a>すべてのチェックを外す</a>
        </div>
      </div>
    `);
    global.APP.api.ietopia.ekitoho.request()
    .then((result)=>{
      result.forEach((data)=>{
        var $checkbox = $(`
          <div class="ui checkbox">
            <input type="checkbox" name="madori[]" value="${data.name}">
            <label>${data.name}</label>
          </div>
        `);
        $checkbox.checkbox();
        $madoriCheckboxes.append($checkbox);
      });
      $madoriCheckboxArea.append($madoriCheckboxes);
      $madoriSection.append($madoriCheckboxArea);
      var $removeAllChecks = $madoriCheckboxes.find(".remove-all-checks");
      $removeAllChecks.on("click", ()=>{
        $madoriSection.find(".checked").trigger("click");
      });
      
    });
    this.$html = $madoriSection
  }
}