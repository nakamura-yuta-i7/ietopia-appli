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
    var options = [{
      value: "",
      name: "指定なし",
    }];
    global.APP.master.tikunensu.forEach((data)=>{
      options.push({
        value: data.value,
        name: data.name,
      })
    });
    var name = "tikunensu";
    $tikunenSection.append( $select({options, selectedVal, name}) );
    this.$html = $tikunenSection;
  }
}