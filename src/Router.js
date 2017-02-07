import TopPage          from "./pages/top/TopPage";
import SearchPage       from "./pages/search/SearchPage";
import SearchResultPage from "./pages/search_result/SearchResultPage";
import SpecialPage      from "./pages/special/SpecialPage";
import NewsPage         from "./pages/news/NewsPage";
import FavoritePage     from "./pages/favorite/FavoritePage";
import MyPagePage       from "./pages/mypage/MyPagePage";

export default class Router {
  constructor(requestParams) {
    this.pageParam   = requestParams.page || "top";
    this.actionParam = requestParams.action || "index";
    this.requestParams = requestParams;
  }
  getController() {
    switch (this.pageParam) {
      case "top"           : return new TopPage(this.requestParams);
      case "search"        : return new SearchPage(this.requestParams);
      case "search_result" : return new SearchResultPage(this.requestParams);
      case "special"       : return new SpecialPage(this.requestParams);
      case "news"          : return new NewsPage(this.requestParams);
      case "favorite"      : return new FavoritePage(this.requestParams);
      case "mypage"        : return new MyPagePage(this.requestParams);
      default:
        throw Error("Not found.");
    }
  }
  getAction() {
    return this.actionParam;
  }
}