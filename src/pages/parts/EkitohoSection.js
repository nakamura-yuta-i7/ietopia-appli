import Html from "./Html";
import "./ekitoho_section.scss";

export default class EkitohoSection extends Html {
  constructor(selectedVal) {
    super();
    var $ekitohoSection = $(`
      <section class="ekitoho-section">
        <h2>駅徒歩</h2>
      </section>
    `);
    var options = [{
      val: "",
      name: "指定なし",
    }];
    global.APP.master.ekitoho.forEach((data)=>{
      options.push({
        val: data.value,
        name: data.name,
      })
    });
    var name = "ekitoho";
    $ekitohoSection.append( $select({options, selectedVal, name}) );
    this.$html = $ekitohoSection;
  }
}