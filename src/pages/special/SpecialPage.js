import Page from '../Page';
import './special.scss';

export default class SpecialPage extends Page {
  indexAction() {
    var $header = $(`
      <header>
        <h1>特集</h1>
      </header>
    `);
    var $footer = $(`
      <footer>
        <nav>
          <ul>
            <li><img src="img/common/footer/nav_search.png"></li>
            <li><img src="img/common/footer/nav_special.png"></li>
            <li><img src="img/common/footer/nav_news.png"></li>
            <li><img src="img/common/footer/nav_favorite.png"></li>
            <li><img src="img/common/footer/nav_mypage.png"></li>
          </ul>
        </nav>
      </footer>
    `);
    var $contents = $(`
      <div id="contents"></div>
    `);
    this.$app.append($header);
    this.$app.append($contents);
    this.$app.append($footer);
  }
}