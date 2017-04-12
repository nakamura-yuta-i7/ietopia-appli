import Page from '../Page';
import './special.scss';

export default class SpecialPage extends Page {
  indexAction() {
    this.headerTitle = "特集";
    var $banners = $(`
      <div class="banners">
        <div class="banner"><img src="img/special/banner_jimusho.png" word="SOHO・事務所"></div>
        <div class="banner"><img src="img/special/banner_gakki.png" word="楽器"></div>
        <div class="banner"><img src="img/special/banner_family.png" word="ファミリー向け"></div>
        <div class="banner"><img src="img/special/banner_designers.png" word="デザイナーズ"></div>
        <div class="banner"><img src="img/special/banner_shintiku.png" word="新築"></div>
        <div class="banner"><img src="img/special/banner_pet.png" word="ペット"></div>
        <div class="banner"><img src="img/special/banner_shiki_rei_nashi.png" word="礼金なし 敷金なし"></div>
        <div class="banner"><img src="img/special/banner_ekitika.png" word="駅近"></div>
      </div>
    `);
    $banners.find(".banner").on("click", function() {
      global.APP.search_history.word = $(this).find("img").attr("word");
      
      renderPage({
        page: "search_result",
        transitionType: "SLIDE_LEFT"
      });
    });
    this.$contents.html( $banners );
  }
}