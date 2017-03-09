import Page from '../Page';
import './toppage.scss';

export default class TopPage extends Page {
  indexAction() {
    
    this.displayHeader = false;
    this.displayFooter = false;
    
    var $img = $html("img", {
      class: "logo-img",
      src: require("../../../www/img/logo.png")
    });
    $img.show();
    this.$logo = $html("div", {
      id: "logo",
    });
    this.$logo.append($img);
    this.$contents.append(this.$logo);
    
    // 自動で次のページへ遷移
    var timer = setTimeout( () => {
      this.gotoNextPage();
    }, 2000);
    
    // タップしたらすぐにページ遷移
    this.$logo.on("tap", () => {
      this.gotoNextPage();
      clearTimeout( timer );
    });
  }
  gotoNextPage() {
    this.$app.fadeOut("slow", () => {
      this.$logo.animate({opacity: 0});
      renderPage({page: "special", action: "index"});
    });
  }
}