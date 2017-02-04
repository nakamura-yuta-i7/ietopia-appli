import TopPage from "./pages/top/TopPage";
import SpecialPage from "./pages/special/SpecialPage";

export default class Router {
  constructor(requestParams) {
    this.pageParam   = requestParams.page || "top";
    this.actionParam = requestParams.action || "index";
    this.requestParams = requestParams;
  }
  getController() {
    switch (this.pageParam) {
      case "top"    : return new TopPage(this.requestParams);
      case "special": return new SpecialPage(this.requestParams);
      default:
        throw Error("Not found.");
    }
  }
  getAction() {
    return this.actionParam;
  }
}