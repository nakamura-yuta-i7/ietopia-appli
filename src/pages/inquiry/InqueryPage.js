import Page from '../Page';
import './inquiry.scss';

export default class InquiryPage extends Page {
  indexAction() {
    this.headerTitle = "お問い合わせ"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    // 電話をかけるアイコンについて
    var $callTelDiv = $(`<div class="call-tel">
        <img src="img/common/header/icon_phone.png">
      </div>`);
    this.$headerOriginalContents = $callTelDiv;
    $callTelDiv.on("click", () => {
      // 電話をかける場合のダイアログを表示
      alert("電話をかけます");
    });
    
    // お問い合わせ説明エリアについて
    var $descriptionArea = $(`
      <div class="description">
        お問い合せは、お電話(上部メニューの電話アイコンをタップ)、または下記メールフォームより受け付けておりますのでお気軽にお問い合わせください。<br>
        後日弊社の担当者よりご入力いただいたお電話番号又はメールアドレス宛てにご連絡させていただきます。
      </div>
    `);
    this.$contents.append($descriptionArea);
    
    // お問い合わせ物件について
    if ( this.requests.bukken_id ) {
      this.$contents.append($(`
        <section>
          ここに物件情報を表示します。
        </section>
      `));
    }
    
    // お問い合わせフォームについて
    var $inquiryForm = $(`
      <form class="inquiry-form">
        <h2>お問い合わせ内容入力</h2>
        
      </form>
    `);
    var $inquirySection = $(`<section></section>`);
    $inquirySection.append($inquiryForm);
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
  }
}