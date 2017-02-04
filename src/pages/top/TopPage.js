import Page from '../Page';
import './toppage.scss';

export default class TopPage extends Page {
  indexAction() {
    var $img = $html("img", {
      src: require("./img/logo.png")
    });
    var $logo = $html("div", {
      id: "logo",
    });
    $logo.on("click", () => {
      this.gotoNextPage();
    });
    $logo.append($img);
    this.$app.html( $logo );
    
    setTimeout( () => {
      this.$app.fadeOut("slow", () => {
        this.gotoNextPage();
      });
    }, 2000);
  }
  gotoNextPage() {
    renderPage({page: "special", action: "index"});
  }
}

