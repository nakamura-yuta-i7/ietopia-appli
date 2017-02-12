import TopPage               from "./pages/top/TopPage";
import SearchPage            from "./pages/search/SearchPage";
import SearchFormDetailPage  from "./pages/search_form_detail/SearchFormDetailPage";
import SearchFormStationPage from "./pages/search_form_station/SearchFormStationPage";
import SearchResultPage      from "./pages/search_result/SearchResultPage";
import SpecialPage           from "./pages/special/SpecialPage";
import NewsPage              from "./pages/news/NewsPage";
import FavoritePage          from "./pages/favorite/FavoritePage";
import MyPagePage            from "./pages/mypage/MyPagePage";

export default class Router {
  constructor(requestParams, transitionType) {
    this.pageParam   = requestParams.page || "top";
    this.actionParam = requestParams.action || "index";
    this.requestParams = requestParams;
    this.transitionType = transitionType;
  }
  getController() {
    switch (this.pageParam) {
      case "top"                : return new TopPage(this.requestParams, this.transitionType);
      case "search"             : return new SearchPage(this.requestParams, this.transitionType);
      case "search_form_detail" : return new SearchFormDetailPage(this.requestParams, this.transitionType);
      case "search_form_station": return new SearchFormStationPage(this.requestParams, this.transitionType);
      case "search_result"      : return new SearchResultPage(this.requestParams, this.transitionType);
      case "special"            : return new SpecialPage(this.requestParams, this.transitionType);
      case "news"               : return new NewsPage(this.requestParams, this.transitionType);
      case "favorite"           : return new FavoritePage(this.requestParams, this.transitionType);
      case "mypage"             : return new MyPagePage(this.requestParams, this.transitionType);
      default:
        throw Error("Not found.");
    }
  }
  getAction() {
    return this.actionParam;
  }
}