import Html from "./Html";
import { YatinSelectMin, YatinSelectMax } from "../parts/YatinSelect";

export default class YatinSection extends Html {
  constructor(min="", max="") {
    super();
    
    var $yatinSection = $(`
      <section class="yatin-section">
        <h2>￥家賃</h2>
        <div class="center"></div>
      </section>
    `);
    
    var selectMin = new YatinSelectMin(min);
    var selectMax = new YatinSelectMax(max);
    
    $yatinSection.find(".center").append( selectMin.getHtml() );
    $yatinSection.find(".center").append( $(`<div class="kara">〜</div>`) );
    $yatinSection.find(".center").append( selectMax.getHtml() );
    
    this.$html = $yatinSection
  }
}