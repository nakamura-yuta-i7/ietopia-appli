import Page from '../Page';
import './inquiry.scss';
import TelModal from '../parts/TelModal';

export default class InquiryPage extends Page {
  indexAction() {
    this.headerTitle = "お問い合わせ";
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    // 電話をかけるアイコンについて
    var $callTelDiv = $(`
      <div class="call-tel">
        <img src="img/common/header/icon_phone.png">
      </div>
    `);
    this.$headerOriginalContents = $callTelDiv;
    
    // お問い合わせ説明エリアについて
    var $descriptionArea = $(`
      <div class="description">
        お問い合せは、<strong>お電話(上部メニューの電話アイコンをタップ)</strong>、または下記メールフォームより受け付けておりますのでお気軽にお問い合わせください。<br>
        後日弊社の担当者よりご入力いただいたお電話番号又はメールアドレス宛てにご連絡させていただきます。
      </div>
    `);
    this.$contents.append($descriptionArea);
    
    // お問い合わせ物件について
    if ( this.requests.room_id ) {
      var room_id = this.requests.room_id;
      var $roomInfo = $(`
        <section class="room-info"></section>
      `);
      global.APP.api.ietopia.room.get(room_id)
      .then( room => {
        // 物件情報を表示
        $roomInfo.append( $(`
          <h3>${room.name}</h3>
          <img src="${room.gaikan_image_main}" width="100">
          <div class="info">
            <div class="yatin">
              <span class="int">${room.yatin_int / 10000}</span>
              <span class="manyen">万円</span>
            </div>
            <span class="madori">${room.madori}</span>
            /
            <span class="senyumenseki">${room.senyumenseki}</span>
            <div class="kotu_first_line">${room.kotu_first_line}</div>
          </div>
        `) )
        // 電話をかける場合のダイアログを表示
        $callTelDiv.on("click", () => {
          new TelModal({bukken:room});
        });
      } );
      this.$contents.append($roomInfo);
      
    } else {
      
      // 電話をかける場合のダイアログを表示
      $callTelDiv.on("click", () => {
        new TelModal();
      });
    }
    
    var $kibou_renraku_jikan_start = $select({
      name: "kibou_renraku_jikan_start",
      options: _.range(0,24),
      selectedVal: APP.me.kibou_renraku_jikan_start
    });
    var $kibou_renraku_jikan_end = $select({
      name: "kibou_renraku_jikan_end",
      options: _.range(0,24),
      selectedVal: APP.me.kibou_renraku_jikan_end
    });
    
    // お問い合わせフォームについて
    var $inquiryForm = $(`
      <form class="inquiry-form ui form">
        <h2>お問い合わせ内容入力</h2>
        
        <div class="table w100per form-group namae">
          <div class="table-cell">
            <label>お名前</label>
            <div class="ui input" style="margin-right:10px;">
              <input type="text" name="name" placeholder="お名前" value="${APP.me.name}">
            </div>
          </div>
          <div class="table-cell">
            <label>フリガナ</label>
            <div class="ui input">
              <input type="text" name="furigana" placeholder="フリガナ" value="${APP.me.furigana}">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>住所</label>
          <div class="ui input fluid">
            <input type="text" name="jusho" placeholder="住所: 東京都豊島区 東池袋1丁目2−11 片山ビル4F" value="${APP.me.jusho}">
          </div>
        </div>
        
        <div class="form-group">
          <label>電話番号</label>
          <div class="ui input fluid">
            <input type="text" name="tel" placeholder="電話番号: 0120-55-2470" value="${APP.me.tel}">
          </div>
        </div>
        
        <div class="form-group">
          <label>メールアドレス</label>
          <div class="ui input fluid">
            <input type="text" name="mail" placeholder="メールアドレス: mail@ietopia.jp" value="${APP.me.mail}">
          </div>
        </div>
        
        <div class="form-group">
          <label>メールアドレス（再入力）</label>
          <div class="ui input fluid">
            <input type="text" name="mail_retype" placeholder="メールアドレス（再入力）: mail@ietopia.jp" value="${APP.me.mail}">
          </div>
        </div>
        
        <div class="form-group kibou-renraku-group">
          <label>ご希望の連絡方法</label>
          <div class="table w100per">
            <div class="table-cell">
              <div class="ui checkbox">
                <label>
                <input type="checkbox" name="kibou_renraku_houhou" value="メール" checked>
                メール</label>
              </div>
            </div>
            <div class="table-cell">
              <div class="ui checkbox">
                <label>
                <input type="checkbox" name="kibou_renraku_houhou" value="電話" checked>
                電話</label>
              </div>
            </div>
            <div class="table-cell nowrap">
              ${$kibou_renraku_jikan_start.outerHTML()}
              時 〜
              ${$kibou_renraku_jikan_end.outerHTML()}
              時
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>備考</label>
          <div class="field">
            <textarea rows="8" name="note">${global.APP.me.note}</textarea>
          </div>
        </div>
        
      </form>
    `);
    
    var $kibouRenrakuHouhouMail = $inquiryForm.find("[value='メール']");
    $kibouRenrakuHouhouMail.attr("checked", _.includes(global.APP.me.kibou_renraku_houhou, "メール") );
    var $kibouRenrakuHouhouTel = $inquiryForm.find("[value='電話']");
    $kibouRenrakuHouhouTel.attr("checked", _.includes(global.APP.me.kibou_renraku_houhou, "電話") );
    
    $inquiryForm.on("change", ()=>{
      var data = global.queryString.parse($inquiryForm.serialize());
      Object.keys(data).forEach(key=>{
        if ( key == "kibou_renraku_houhou" ) {
          if ( !global.is("Array", data["kibou_renraku_houhou"]) ) {
            data["kibou_renraku_houhou"] = [data["kibou_renraku_houhou"]];
          }
        }
        var value = data[key];
        if ( global.is("Array", value) ) {
          value = JSON.stringify(value);
        }
        data[key] = value;
      });
      global.APP.api.ietopia.user.me.save(data)
      .then(()=>{
        return global.APP.api.ietopia.user.me.request();
      })
      .then( me => global.APP.me = me );
    });
    
    var $inquirySection = $(`<section></section>`);
    $inquirySection.append($inquiryForm);
    // $inquirySection.find(".checkbox").checkbox();
    this.$contents.append($inquirySection);
    
    // 希望のお住いについて
    // マイページ：希望のお住いページで情報登録していた場合
    // ここに表示させる
    if ( false ) {
      this.$contents.append( $(`
        <section>
          <h2>希望のお住い</h2>
        </section>
      `) );
    }
    
    // 送信ボタンエリアについて
    var $submitArea = $(`
      <section class="submit-area">
        <div class="message">
          <a href="${config.IETOPIA_PRIVACY_POLICY_URL}" target="_blank">プライバシーポリシー</a>
          をお読みいただき、<br>
          同意の上、メールを送信してください。
        </div>
        <img class="submit-button" src="img/common/form/submit_inquiry_form.png" width="234">
      </section>
    `);
    var $submitButton = $submitArea.find(".submit-button");
    $submitButton.on("click", () => {
      console.log( $inquiryForm.serialize() );
    });
    this.$contents.append($submitArea);
  }
}