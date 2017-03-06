import Html from "../parts/Html";
export default class MainDataArea extends Html {
  constructor(data={}) {
    super();
    // 建物名・部屋番号
    var $name = $(`
      <h2 class="name">
        ${data.name}
        <a href="${data.detail_url}">URL</a>
      </h2>
    `);
    // キャッチコピー
    var $catchcopy = $(`
      <div class="catchcopy">${data.catchcopy}</div>
    `);
    
    var $layoutTable = $(`
      <div class="layout-table table w100per">
        <div class="left table-cell"></div>
        <div class="right table-cell"></div>
      </div>
    `);
    var $left = $layoutTable.find(".left");
    var $right = $layoutTable.find(".right");
    
    // セル:左
    // 間取・面積
    var $madori_menseki = $(`
      <div class="madori_menseki">
        <span class="type">間取・面積</span>
        <span class="val">${data.madori}/${data.senyumenseki}</span>
      </div>
    `);
    
    $left.append($madori_menseki);
    
    // 賃料
    var $tinryo = $(`
      <div class="tinryo">
        <span class="type">賃料</span>
        <span class="val">
          <span class="yatin">${data.yatin_int/10000}</span>
          <span class="manyen">万円</span>
        </span>
      </div>
    `);
    $left.append($tinryo);
    
    // 管理費・共益費
    var $kanrihi_kyoekihi = $(`
      <div class="kanrihi_kyoekihi">
        <div class="type">管理費・共益費</div>
        <div class="val">${data.kanrihi_kyoekihi}</div>
      </div>
    `);
    $left.append($kanrihi_kyoekihi);
    
    // 敷金/礼金
    var $shikikin_reikin = $(`
      <div class="shikikin_reikin"></div>
    `);
    var $shikikin = $(`
      <div class="sikikin">
        <span class="type">敷金</span>
        <span class="val">${data.sikikin}</span>
      </div>
    `);
    var $reikin = $(`
      <div class="reikin">
        <span class="type">礼金</span>
        <span class="val">${data.reikin}</span>
      </div>
    `);
    $shikikin_reikin.append($shikikin);
    $shikikin_reikin.append($reikin);
    $left.append($shikikin_reikin);
    
    // セル:右
    // 所在地
    var $shozaiti = $(`
      <div class="shozaiti">
        <h3>所在地</h3>
        <span class="val">${data.shozaiti}</span>
      </div>
    `);
    $right.append($shozaiti);
    
    // 交通
    var $kotu = $(`
      <div class="kotu">
        <h3>交通</h3>
        <div class="val">${data.kotu.replace(/分/g,"分<br>")}</div>
      </div>
    `);
    $right.append($kotu);
    
    this.$html = $(`<div class="main-data-area"></div>`);
    this.$html.append($name);
    this.$html.append($catchcopy);
    this.$html.append($layoutTable);
  }
}