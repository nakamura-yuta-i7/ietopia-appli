import Html from "../parts/Html";
export default class SetubiJokenArea extends Html {
  constructor(data={}) {
    super();
    // 担当者からのコメント
    var $comment = $(`
      <div class="comment">
        <h3>担当者からのコメント</h3>
        <div class="text">
          ${data.comment}
        </div>
      </div>
    `);
    // 設備・条件
    var setubi_jokens = data.setubi_joken.split("、");
    var master = APP.master.kodawari_joken.map(row=>row.name);
    var items = master.map(name=>{
      var found = _.includes(setubi_jokens, name);
      var checked = found ? "checked" : "";
      var $item = $(`
        <div class="item ${checked}">${name}</div>
      `);
      return $item;
    });
    
    var $setubi_joken = $(`
      <div class="setubi_joken">
        <h3>設備・条件</h3>
        <div class="items"></div>
      </div>
    `);
    var $itemsArea = $setubi_joken.find(".items");
    $itemsArea.append( items );
    
    this.$html = $(`<div class="setubi-joken-area"></div>`);
    this.$html.append($comment);
    this.$html.append($setubi_joken);
  }
}