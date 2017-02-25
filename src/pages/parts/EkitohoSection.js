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
    global.APP.api.ietopia.master.ekitoho.request().then((result)=>{
      var options = [{
        val: "",
        name: "指定なし",
      }];
      result.forEach((data)=>{
        options.push({
          val: data.value,
          name: data.name,
        })
      });
      var name = "ekitoho";
      $ekitohoSection.append( $select({options, selectedVal, name}) );
    });
    this.$html = $ekitohoSection;
  }
}