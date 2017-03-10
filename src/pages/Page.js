import './common.scss';

export default class Page {
  constructor(requestParams,
  transitionType = "REPLACE" ) {
    
    this.requests = requestParams;
    this.page     = this.requests.page;
    this.action   = this.requests.action;
    this.transitionType = transitionType;
    
    this.$app = $("#app");
    this.$app.find(".loading-message").remove();
    this.$app.show();
    
    // ヘッダー要否
    this.displayHeader = true;
    // ヘッダータイトル要否
    this.displayHeaderTitle = true;
    // ヘッダータイトル
    this.headerTitle = "タイトル";
    // ヘッダー戻るボタン
    this.displayHeaderBackButton = false;
    this.headerBackButtonText = `戻る`
    // ヘッダー内ロゴ要否
    this.displayHeaderLogoS = true;
    // ヘッダーオリジナルコンテンツ
    this.$headerOriginalContents = "";
    // フッター要否
    this.displayFooter = true;
    
    // メインパネル(フッター以外の部分)
    var depthTop = 0;
    this.$main = $(`<div class="main" depth="${depthTop}"></a>`);
    this.$main.addClass(`${this.page}-page`);
    this.$main.addClass(`${this.action}-action`);
    // コンテンツ
    this.$contents = $(`
      <div class="contents"></div>
    `);
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
        ? `<div class="history-back">
            <img src="img/common/header/icon_back.png">
            <span>${this.headerBackButtonText}</span>
          </div>` : ``;
      var $header = $(`
        <header>
          ${headerTitle}
          ${headerLogoS}
          ${headerBackButton}
        </header>
      `);
      
      var $headerBackButton = $header.find(".history-back");
      $headerBackButton.on("click", () => {
        history.back();
      });
      if ( this.$headerOriginalContents.length ) {
        $header.append( this.$headerOriginalContents );
      }
      this.$main.append($header);
      this.$main.append($(`<div id="header-under-space"></div>`));
    }
    
    if ( this.transitionType != "BACK" ) {
      this.$main.append(this.$contents);
      this.$app.append( this.$main );
    }
    
    // 元々表示していたページは裏のレイヤーとする
    // その際はレイヤーの深さを設定してあげる
    this.refreshMainDepth();
    
    function windowWidthPx() {
      return `${window.innerWidth}px`;
    }
    
    var $mainDepth1 = $(".main[depth=1]");
    var $mainDepth0 = $(".main[depth=0]");
    
    if ( this.transitionType == "REPLACE" ) {
      $(".main[depth!=0]").remove();
      
    } else if ( this.transitionType == "BACK" ) {
      
      if ( $(".main").length > 1 ) {
        // BACKのページ切り替え時
        $mainDepth1.animate({left: "0px"});
        $mainDepth0.animate({left: windowWidthPx()}, () => {
          $mainDepth0.remove();
        });
        this.refreshMainDepth();
      }
    } else if ( this.transitionType == "SLIDE_LEFT" ) {
      
      if ( $(".main").length > 1 ) {
        // REPLACE以外のページ切り替え時
        $mainDepth0.css({left: windowWidthPx()});
        $mainDepth1.animate({left: "-100px"});
        $mainDepth0.animate({left: "0px"});
      }
    }
    this.buildFooter();
    this.postRender();
  }
  postRender() {}
  refreshMainDepth() {
    $( $(".main").get().reverse() ).each(function(i) {
      var depth = i;
      $(this).attr("depth", depth);
    });
  }
  buildFooter() {
    
    if ( !this.displayFooter ) {
      // フッター不要なら何もしない
      if ( $("footer").length ) {
        // でも既にフッターが存在するなら削除
        $("footer").remove();
      }
      return;
    }
    // フッターが必要、でも
    // 既に フッター構築済みなら何もしない
    if ( $("footer").length ) return;
    
    // フッター構築
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
    
    $footer.find("li").on("tap", function() {
      var page = $(this).attr("class");
      renderPage({ page: page });
    });
    
    this.$app.append($footer);
    global.APP.$footer = $footer;
  }
}