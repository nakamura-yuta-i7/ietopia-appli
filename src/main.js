// 便利関数
global.$html = function(tagname, params={}) {
  var $html = $(`<${tagname}>`);
  $html.attr(params);
  return $html;
}

import Dispatcher from "./Dispatcher";
import queryString from 'query-string';
global.renderPage = function (params={}) {
  const qs = queryString.parse(location.search);
  const page   = params.page || qs.page || "top";
  const action = params.action     || qs.action || "index";
  const requestParams = params.requests || qs;
  requestParams.page   = page;
  requestParams.action = action;
  
  history.pushState(null,null, "?" + queryString.stringify(requestParams) );
  
  Dispatcher.dispatch( requestParams );
}
// アプリ初回起動時
global.renderPage();

// 戻るボタン押した時
window.onpopstate = function(e) {
  // ページ読み込み、描画処理
  global.renderPage(queryString.parse(location.search));
}

