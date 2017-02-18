import Page from '../Page';
import './inquiry.scss';
import ModalDialog from '../../utils/ModalDialog';

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
      var $modalContents = $(`
        <div class="modal-bukken-content">
          <div class="title">担当者にお繋ぎいたします</div>
          <div class="bukken">
            <div class="bukken-no">物件番号: </div>
            <div class="bukken-name">サンプル物件名:ウエストパークタワー池袋,(WEST PARK TOWER IKEBUKURO),【ペット可,仲介手数料無料キャンペーン中】</div>
            <div class="bukken-info">15.7万円：1DK/35.65m²</div>
          </div>
          <div class="call-tel">
            <img src="img/common/form/call_tel_icon_text_button.png" width="158">
          </div>
        </div>
      `);
      
      var modal = new ModalDialog($modalContents);
      modal.open();
      
      var $telButton = $modalContents.find(".call-tel");
      $telButton.on("click", () => {
        location.href = `tel:${config.IETOPIA_TEL}`;
        modal.close();
      });
    });
    
    // お問い合わせ説明エリアについて
    var $descriptionArea = $(`
      <div class="description">
        お問い合せは、<strong>お電話(上部メニューの電話アイコンをタップ)</strong>、または下記メールフォームより受け付けておりますのでお気軽にお問い合わせください。<br>
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
      <form class="inquiry-form ui form">
        <h2>お問い合わせ内容入力</h2>
        
        <div class="table w100per form-group">
          <div class="table-cell">
            <label>お名前</label>
            <div class="ui input" style="margin-right:10px;">
              <input type="text" name="name" placeholder="お名前">
            </div>
          </div>
          <div class="table-cell">
            <label>フリガナ</label>
            <div class="ui input">
              <input type="text" name="furigana" placeholder="フリガナ">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>住所</label>
          <div class="ui input fluid">
            <input type="text" name="jusho" placeholder="住所: 東京都豊島区 東池袋1丁目2−11 片山ビル4F">
          </div>
        </div>
        
        <div class="form-group">
          <label>電話番号</label>
          <div class="ui input fluid">
            <input type="text" name="tel" placeholder="電話番号: 0120-55-2470">
          </div>
        </div>
        
        <div class="form-group">
          <label>メールアドレス</label>
          <div class="ui input fluid">
            <input type="text" name="mail" placeholder="メールアドレス: mail@ietopia.jp">
          </div>
        </div>
        
        <div class="form-group">
          <label>メールアドレス（再入力）</label>
          <div class="ui input fluid">
            <input type="text" name="mail" placeholder="メールアドレス（再入力）: mail@ietopia.jp">
          </div>
        </div>
        
        <div class="form-group">
          <label>ご希望の連絡方法</label>
          <div class="table w100per">
            <div class="table-cell">
              <div class="ui checkbox">
                <input type="checkbox" name="kibou_renraku_houhou" value="メール" checked>
                <label>メール</label>
              </div>
            </div>
            <div class="table-cell">
              <div class="ui checkbox">
                <input type="checkbox" name="kibou_renraku_houhou" value="電話" checked>
                <label>電話</label>
              </div>
            </div>
            <div class="table-cell nowrap">
              <select name="kibou_renraku_jikan_start">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option selected>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
              </select>
              時 〜
              <select name="kibou_renraku_jikan_end">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option selected>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
              </select>
              時
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>備考</label>
          <div class="field">
            <textarea rows="3" name="note"></textarea>
          </div>
        </div>
        
      </form>
    `);
    var $inquirySection = $(`<section></section>`);
    $inquirySection.append($inquiryForm);
    $inquirySection.find(".checkbox").checkbox();
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