import './common.scss';

export default class Page {
  constructor(requestParams) {
    this.requests = requestParams;
    
    // ヘッダー要否
    this.displayHeader = true;
    // ヘッダータイトル
    this.headerTitle = "タイトル";
    // フッター要否
    this.displayFooter = true;
    // コンテンツ
    this.$contents = $(`
      <div id="contents"></div>
    `);
    
    this.$app = $("#app");
    this.$app.show();
    this.$app.html(null);
    console.log( this.requests );
  }
  render() {
    
    if ( this.displayHeader ) {
      
      var $header = $(`
        <header>
          <h1>${this.headerTitle}</h1>
        </header>
        <div id="header-under-space"></div>
      `);
      this.$app.append($header);
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