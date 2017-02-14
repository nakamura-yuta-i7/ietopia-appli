import Page from '../Page';
import './kibou_osumai.scss';

export default class KibouOsumaiPage extends Page {
  indexAction() {
    this.headerTitle = "希望のお住い"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    // 希望のお住い：説明欄について
    var $descriptionArea = $(`
      <div class="description-area">
        <div class="message">
          お探しのお住いの条件を登録することができます。<br>
条件にマッチしたお部屋をリアルタイムで受け取ることができたり、お問い合わせいただいた際によりスムーズにご案内することができますので是非ご活用ください。
        </div>
      </div>
    `);
    this.$contents.append($descriptionArea);
    
    var $kibouForm = $(`
      <form class="kibou-form">
      </form>
    `);
    
    // お客様について
    var $userInfoSection = $(`
      <section>
        <h2>お客様について</h2>
        <div class="table">
          <div class="table-cell">
            <label>性別</label>
            <select name="sex">
              <option value="">選択してください</option>
              <option>男性</option>
              <option>女性</option>
            </select>
          </div>
          <div class="table-cell">
            <label>年齢</label>
            <select name="age">
              <option value="">選択してください</option>
              <option>10代</option>
              <option>20代</option>
              <option>30代</option>
              <option>40代</option>
              <option>50代</option>
              <option>60代</option>
              <option>70代</option>
              <option>80代</option>
              <option>90歳以上</option>
            </select>
          </div>
        </div>
        <div class="additional-note">
          ご入力いただいた情報はより良いサービスをご提供する為に利用されます。お客様の情報はプライバシーポリシーに則り厳重に管理いたします。
        </div>
      </section>
    `);
    $kibouForm.append($userInfoSection);
    
    
    // 家賃について
    var $yatinSection = $(`
      <section>
        <h2>￥家賃</h2>
      </section>
    `);
    
    global.$yatinSelectMax = function(selectedVal="") {
      var options = APP.values.yatinSelectBaseOptions();
      var name = "yatin-max";
      options.push( { val: "", name: "上限なし" } );
      return $select({options, selectedVal, name});
    };
    global.$yatinSelectMin = function(selectedVal="") {
      var options = APP.values.yatinSelectBaseOptions();
      var name = "yatin-min";
      options.unshift( { val: "", name: "下限なし" } );
      return $select({options, selectedVal, name});
    };
    global.APP.values.yatinSelectBaseOptions = function() {
      return [
        { val: "30000", name: "3万" },
        { val: "50000", name: "5万" },
        { val: "60000", name: "6万" },
        { val: "65000", name: "6.5万" },
        { val: "70000", name: "7万" },
        { val: "75000", name: "7.5万" },
        { val: "80000", name: "8万" },
        { val: "85000", name: "8.5万" },
        { val: "90000", name: "9万" },
        { val: "95000", name: "9.5万" },
        { val: "100000", name: "10万" },
        { val: "105000", name: "10.5万" },
        { val: "110000", name: "11万" },
        { val: "115000", name: "11.5万" },
        { val: "120000", name: "12万" },
        { val: "125000", name: "12.5万" },
        { val: "130000", name: "13万" },
        { val: "135000", name: "13.5万" },
        { val: "140000", name: "14万" },
        { val: "145000", name: "14.5万" },
        { val: "150000", name: "15万" },
        { val: "170000", name: "17万" },
        { val: "200000", name: "20万" },
        { val: "300000", name: "30万" },
        { val: "400000", name: "40万" },
        { val: "500000", name: "50万" },
      ];
    };
    
    $yatinSection.append( $yatinSelectMin(100000) );
    $yatinSection.append( $(`<div class="kara">〜</div>`) );
    $yatinSection.append( $yatinSelectMax(150000) );
    
    $kibouForm.append($yatinSection);
    
    // 間取について
    var $madoriSection = $(`
      <section>
        <h2>間取</h2>
      </section>
    `);
    var $madoriCheckboxArea = $(`
      <div class="madori-checkboxes">
        <div class="remove-all-checks">
          <a>すべてのチェックを外す</a>
        </div>
        
      </div>
    `);
    
    
    $kibouForm.append($madoriSection);
    
    // 築年数について
    var $tikunenSection = $(`
      <section>
        <h2>築年数</h2>
      </section>
    `);
    $kibouForm.append($tikunenSection);
    
    // 備考について
    var $noteSection = $(`
      <section>
        <h2>その他のご希望</h2>
      </section>
    `);
    $kibouForm.append($noteSection);
    
    // フォームに挿入
    this.$contents.append($kibouForm);
  }
}