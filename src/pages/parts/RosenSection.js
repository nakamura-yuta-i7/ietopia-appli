import Html from "./Html";
export default class RosenSection extends Html {
  constructor(selectedVal) {
    super();
    
    var options = [
      { value: "", name: "指定なし" },
    ];
    global.APP.master.rosen.forEach((data)=>{
      options.push( data.name );
    });
    
    var $rosenSelect = $select({
      options: options,
      name: "rosen",
      selectedVal: global.APP.search_history.rosen || "",
    });
    
    var $rosenSection = $(`
      <section>
        <h2>路線</h2>
        <div class="form-item"></div>
      </section>
    `);
    $rosenSection.find(".form-item").append($rosenSelect);
    this.$rosenSelect = $rosenSelect;
    this.$html = $rosenSection;
  }
  getSelectedValue() {
    return this.$rosenSelect.val();
  }
  setChangeEvent(func) {
    this.$rosenSelect.on("change", func);
  }
}