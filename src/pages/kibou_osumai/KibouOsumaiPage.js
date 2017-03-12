import Page from '../Page';
import './kibou_osumai.scss';
import promise from "bluebird";
import queryString from 'query-string';

import YatinSection from "../parts/YatinSection";
import MadoriSection from "../parts/MadoriSection";
import TikunenSection from "../parts/TikunenSection";

export default class KibouOsumaiPage extends Page {
  indexAction() {
    this.headerTitle = "希望のお住い"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    // 希望のお住い：説明欄について
    this.$contents.append(getDescriptionArea());
    
    var $kibouForm = $html("form", {
      class: "kibou-form",
    });
    
    $kibouForm.on("change", ()=> {
      var data = global.queryString.parse($kibouForm.serialize());
      Object.keys(data).forEach(key=>{
        var value = data[key];
        if ( global.is("Array", value) ) {
          value = JSON.stringify(value);
        }
        data[key] = value;
      });
      console.log( {data} );
      global.APP.api.ietopia.user.me.save(data)
      .then(()=>{
        return global.APP.api.ietopia.user.me.request();
      })
      .then( me => global.APP.me = me );
    });
    
    // お客様について
    $kibouForm.append( getUserInfoSection({sex: "男性", age: "30代"}) );
    
    // 家賃について
    $kibouForm.append( new YatinSection(global.APP.me["yatin-min"], global.APP.me["yatin-max"]).getHtml() );
    
    // 間取について
    var madoriSection = new MadoriSection({
      selectedVals: global.APP.me.madori
    });
    $kibouForm.append(madoriSection.getHtml());
    
    // 築年数について
    $kibouForm.append( new TikunenSection(global.APP.me.tikunensu).getHtml() );
    
    // 備考について
    var $noteSection = $html("section", {}, $(`
        <h2>その他のご希望</h2>
        <div class="ui form">
          <textarea rows="8" name="other-kibou">${global.APP.me["other-kibou"]}</textarea>
        </div>
    `));
    $kibouForm.append($noteSection);
    
    // フォームに挿入
    this.$contents.append($kibouForm);
  }
}

function getDescriptionArea() {
  return $(`
    <div class="description-area">
      <div class="message">
        お探しのお住いの条件を登録することができます。<br>
条件にマッチしたお部屋をリアルタイムで受け取ることができたり、お問い合わせいただいた際によりスムーズにご案内することができますので是非ご入力ください。
      </div>
    </div>
  `);
}

function getUserInfoSection(params={}) {
  var sex = global.APP.me.sex;
  var age = global.APP.me.age;
  var $sexSelect = $select({
    options: [
      {value:"", name:"--"},
      {value:"男性", name:"男性"},
      {value:"女性", name:"女性"},
    ],
    selectedVal: sex,
    name: "sex"
  });
  var $ageSelect = $select({
    options: [
      { value: "", name: "--" },
      "10代","20代","30代","40代","50代","60代","70代","80代","90歳以上"
    ],
    selectedVal: age,
    name: "age"
  });
  
  return $(`
    <section class="okyakusama-ni-tuite">
      <h2>お客様について</h2>
      <div class="table">
        <div class="table-cell">
          <label>性別</label>
          ${$sexSelect.outerHTML()}
        </div>
        <div class="table-cell">
          <label>年齢</label>
          ${$ageSelect.outerHTML()}
        </div>
      </div>
      <div class="additional-note">
        ご入力いただいた情報はより良いサービスをご提供する為に利用されます。お客様の情報はプライバシーポリシーに則り厳重に管理いたします。
      </div>
    </section>
  `);
}