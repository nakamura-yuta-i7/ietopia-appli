import Page from '../Page';
import './special.scss';

export default class SpecialPage extends Page {
  indexAction() {
    this.headerTitle = "特集";
    var $banners = $(`
      <div class="banners">
        <div class="banner"><img src="img/special/banner_designers.png"></div>
        <div class="banner"><img src="img/special/banner_shintiku.png"></div>
        <div class="banner"><img src="img/special/banner_pet.png"></div>
        <div class="banner"><img src="img/special/banner_shiki_rei_nashi.png"></div>
        <div class="banner"><img src="img/special/banner_ekitika.png"></div>
        <div class="banner"><img src="img/special/banner_jimusho.png"></div>
        <div class="banner"><img src="img/special/banner_gakki.png"></div>
        <div class="banner"><img src="img/special/banner_family.png"></div>
      </div>
    `);
    $banners.on("click", () => {
      renderPage({
        page: "search_result",
        transitionType: "SLIDE_LEFT"
      });
    });
    this.$contents.html( $banners );
    
  }
}