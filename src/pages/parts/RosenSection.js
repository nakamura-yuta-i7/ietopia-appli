import Html from "./Html";
export default class RosenSection extends Html {
  constructor(selectedVal) {
    super();
    
    var $rosenSelect = $select({
      options: [
        { val: "", name: "指定なし" },
      ],
      name: "rosen",
      selectedVal: "",
    });
    
    global.APP.api.ietopia.rosen.request()
    .then((result)=>{
      result.forEach((data)=>{
        $rosenSelect.append( $(`<option>${data.name}</option>`) );
      });
    });
    
    var $rosenSection = $(`
      <section>
        <h2>路線</h2>
        <div class="form-item"></div>
      </section>
    `);
    $rosenSection.find(".form-item").append($rosenSelect);
    this.$html = $rosenSection;
  }
  setChangeEvent(stationSection) {
    var $rosenSelect = this.$html.find("select");
    $rosenSelect.on("change", function() {
    });
  }
}