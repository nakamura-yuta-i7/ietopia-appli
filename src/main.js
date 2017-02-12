// JQuery.easing: 設定
jQuery.easing.def = "easeOutExpo";
// 便利関数
global.$html = function(tagname, params={}) {
  var $tag = $(`<${tagname}>`);
  $tag.attr(params);
  return $tag;
}
global.config = require("./config");

global.APP = {
  ScreenTransitionType: ["SLIDE_LEFT", "REPLACE"]
};
console.log( "global.APP", global.APP );

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log( device.cordova );
    console.log( device.uuid );
    console.log( {device: device} );
}

import Dispatcher from "./Dispatcher";
import queryString from 'query-string';
global.renderPage = function (params={}) {
  const transitionType = params.transitionType || "REPLACE"
  const qs = queryString.parse(location.search);
  const page   = params.page   || qs.page || "top";
  const action = params.action || qs.action || "index";
  const requestParams = params.requests || qs;
  requestParams.page   = page;
  requestParams.action = action;
  console.log( {page, action, requestParams, transitionType} );
  
  if ( transitionType != "BACK" ) {
    history.pushState(null,null, 
      "?" + queryString.stringify(requestParams) ); 
  }
  
  Dispatcher.dispatch( requestParams, transitionType );
}
// アプリ初回起動時
global.renderPage();

// 戻るボタン押した時
window.onpopstate = function(e) {
  console.log( e );
  // ページ読み込み、描画処理
  var qs = queryString.parse(location.search);
  qs.transitionType = "BACK";
  global.renderPage(qs);
}

