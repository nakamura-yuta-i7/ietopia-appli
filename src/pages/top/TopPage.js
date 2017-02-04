import Page from '../Page';
import './toppage.scss';

export default class TopPage extends Page {
  indexAction() {
    this.displayHeader = false;
    this.displayFooter = false;
    
    var $img = $html("img", {
      src: require("./img/logo.png")
    });
    var $logo = $html("div", {
      id: "logo",
    });
    $logo.append($img);
    this.$app.html( $logo );
    
    // 自動で次のページへ遷移
    var timer = setTimeout( () => {
      this.$app.fadeOut("slow", () => {
        this.gotoNextPage();
      });
    }, 2000);
    
    // タップしたらすぐにページ遷移
    $logo.on("click", () => {
      this.gotoNextPage();
      clearTimeout( timer );
    });
  }
  gotoNextPage() {
    renderPage({page: "special", action: "index"});
  }
}