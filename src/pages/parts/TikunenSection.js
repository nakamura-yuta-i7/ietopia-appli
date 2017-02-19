import Html from "./Html";
import "./tikunen_section.scss";

export default class TikunenSection extends Html {
  constructor(selectedVal) {
    super();
    var $tikunenSection = $(`
      <section class="tikunensu-section">
        <h2>築年数</h2>
      </section>
    `);
    global.APP.api.ietopia.tikunensu.request().then((result)=>{
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
      var name = "tikunensu";
      $tikunenSection.append( $select({options, selectedVal, name}) );
    });
    this.$html = $tikunenSection;
  }
}