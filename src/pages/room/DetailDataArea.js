import Html from "../parts/Html";
export default class DetailDataArea extends Html {
  constructor(data={}) {
    super();
    
    var useKeysWithName = [
      { name: "価格", key: "kakaku" },
      { name: "更新料", key: "koushinryo" },
      { name: "その他費用", key: "sonota_hiyo" },
      { name: "保険料", key: "hokenryo" },
      { name: "契約期間", key: "keiyakukikan" },
      { name: "保証金", key: "hoshokin" },
      { name: "償却・敷引", key: "shokyaku_sikihiki" },
      { name: "バルコニー", key: "balcony" },
      { name: "物件種別", key: "bukken_shubetu" },
      { name: "築年月(築年数)", key: "tikunensu" },
      { name: "方位", key: "houi" },
      { name: "構造", key: "kozo" },
      { name: "所在階/階建", key: "shozoikai" },
      { name: "総戸数", key: "sotosu" },
      { name: "間取り内訳", key: "madori_utiwake" },
      { name: "バルコニー面積", key: "balcony_menseki" },
      { name: "駐車場", key: "chushajo" },
      { name: "引渡", key: "hikiwatashi" },
      { name: "現況(予定年月)", key: "genjo" },
      { name: "管理", key: "kanri" },
      { name: "備考", key: "bikou" },
      { name: "周辺施設", key: "shuhenshisetu" },
      { name: "取引態様", key: "torihikitaiyo" },
    ];
    
    // 詳細情報
    var $detailDataArea = $(`
      <div class="detail-data-area">
        <h3>詳細情報</h3>
      </div>
    `);
    var $table = $(`<table class="detail-table"></table>`);
    $detailDataArea.append($table);
    
    var TRs = useKeysWithName.map( keyWithName => {
      var name = keyWithName.name;
      var key = keyWithName.key;
      var val = data[key];
      if ( key == "bikou" ) {
        val = val.replace(/\n/g, "<br>");
      }
      return $(`<tr>
        <th>${name}</th><td>${val}</td>
      </tr>`);
    });
    $table.append(TRs);
    
    this.$html = $detailDataArea;
  }
}