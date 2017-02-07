import './common.scss';

export default class Page {
  constructor(requestParams) {
    this.requests = requestParams;
    this.page = this.requests.page
    this.action = this.requests.action
    
    // ヘッダー要否
    this.displayHeader = true;
    // ヘッダータイトル要否
    this.displayHeaderTitle = true;
    // ヘッダータイトル
    this.headerTitle = "タイトル";
    // ヘッダー戻るボタン要否
    this.displayHeaderBackButton = false;
    // ヘッダー内ロゴ要否
    this.displayHeaderLogoS = true;
    // ヘッダーオリジナルコンテンツ
    this.$headerOriginalContents = "";
    // フッター要否
    this.displayFooter = true;
    // コンテンツ
    this.$contents = $(`
      <div id="contents"></div>
    `);
    
    this.$app = $("#app");
    this.$app.attr("class", `${this.page}-page ${this.action}-action`);
    this.$app.show();
    this.$app.html(null);
    console.log( this.requests );
  }
  render() {
    
    if ( this.displayHeader ) {
      
      var headerLogoS = this.displayHeaderLogoS
        ? `<div id="logo_s">
            <a href="./"><img src="img/common/header/logo_s.png"></a>
          </div>` : ``;
      var headerTitle = this.displayHeaderTitle
        ? `<h1>${this.headerTitle}</h1>` : ``
      var headerBackButton = this.displayHeaderBackButton
        ? `<div id="history-back">
            <img src="img/common/header/icon_back.png">
            <span>戻る</span>
          </div>` : ``;
      var $header = $(`
        <header>
          ${headerTitle}
          ${headerLogoS}
          ${headerBackButton}
        </header>
      `);
      
      var $headerBackButton = $header.find("#history-back");
      $headerBackButton.on("click", () => {
        history.back();
      });
      if ( this.$headerOriginalContents.length ) {
        $header.append( this.$headerOriginalContents );
      }
      this.$app.append($header);
      this.$app.append($(`<div id="header-under-space"></div>`));
    }
    
    this.$app.append(this.$contents);
    
    if ( this.displayFooter ) {
      var $footer = $(`
        <footer>
          <nav>
            <ul>
              <li class="search"><img src="img/common/footer/nav_search.png"></li>
              <li class="special"><img src="img/common/footer/nav_special.png"></li>
              <li class="news"><img src="img/common/footer/nav_news.png"></li>
              <li class="favorite"><img src="img/common/footer/nav_favorite.png"></li>
              <li class="mypage"><img src="img/common/footer/nav_mypage.png"></li>
            </ul>
          </nav>
        </footer>
      `);
      $footer.find("li").on("click", function() {
        var page = $(this).attr("class");
        renderPage({ page: page });
      });
      this.$app.append($footer);
    }
  }
}