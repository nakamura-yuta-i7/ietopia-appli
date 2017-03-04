// JQuery.easing: 設定
jQuery.easing.def = "easeOutExpo";
// 便利関数群ロード
import "./utils/html";
import "./utils/is";
import "./utils/deepCopy";
import "./utils/moment";
import "./utils/enum";
global.promise = require("bluebird");
global._ = require("lodash");
// 定数等の設定
global.config = require("./config");
import IetopiaApi from "./IetopiaApi";
import { EkitohoApi, TikunensuApi, 
  MensekiApi, MadoriApi, RosenApi, 
  StationApi, KodawariJokenApi, YatinApi } from "./IetopiaApi";
import { MeApi, SearchHistoryApi, RoomHistoryApi, FavoriteApi } from "./IetopiaApi";

// グローバル変数
global.APP = {
  me: null,
  search_history: null,
  room_history: null,
  favorite: null,
  master: {},
  api: {
    ietopia: {
      master: {
        madori: new MadoriApi(),
        ekitoho: new EkitohoApi(),
        tikunensu: new TikunensuApi(),
        menseki: new MensekiApi(),
        rosen: new RosenApi(),
        station: new StationApi(),
        kodawari_joken: new KodawariJokenApi(),
        yatin: new YatinApi(),
      },
      user: {
        me: new MeApi(),
        search_history: new SearchHistoryApi(),
        room_history: new RoomHistoryApi(),
        favorite: new FavoriteApi(),
      },
    },
  },
};

import Dispatcher from "./Dispatcher";
import queryString from 'query-string';
global.queryString = queryString;
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
// 戻るボタン押した時
window.onpopstate = function(e) {
  console.log( e );
  // ページ読み込み、描画処理
  var qs = queryString.parse(location.search);
  qs.transitionType = "BACK";
  global.renderPage(qs);
}
// 発生したエラーを最後まで捕捉できなかった場合のエラーハンドリング
window.onerror = function (msg, file, line, column, err) {
  console.log( "window.onerror!!!" );
  console.log( {msg, file, line, column, err} );
};

// アプリ起動時
// if ( IS_PRODUCTION ) {
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
  console.log( "deviceready" );
} else {
  onDeviceReady();
}
function onDeviceReady() {
  
  console.log( "koko1" );
  
  promise.resolve()
  .then( IetopiaApi.logout )
  .then( IetopiaApi.isloggedIn )
  .then( isloggedIn => {
    if ( isloggedIn == false ) return IetopiaApi.login( getUUID() );
    return global.APP.api.ietopia.user.me.request();
  })
  .then( me => {
    global.me = me;
    return loadApi();
  })
  .then(()=>{
    console.log( "global.APP", global.APP );
    console.log( "IS_PRODUCTION", IS_PRODUCTION );
    global.renderPage();
  })
  .catch((err)=>{
    throw err;
  });
}

function getUUID() {
  // 端末情報の取得
  // see: https://docs.monaca.io/ja/reference/cordova_3.5/device/
  if ( typeof device === "undefined" || ! device.uuid ) {
    console.log( "NOT APP !!!!" );
    while ( true ) {
      //var uuid = prompt("uuid", "test-uuid");
      var uuid = "test-uuid";
      if ( uuid.length ) {
        break;
      }
    }
    console.log( "UUID: " + uuid );
  } else {
    console.log( {
      device: device,
    } );
    var uuid = device.uuid;
  }
  return uuid;
}

function loadApi() {
  return promise.resolve()
  .then(function() {
    return APP.api.ietopia.user.search_history.get()
    .then( params => global.APP.search_history = params );
  })
  .then(()=>{
    var masters = APP.api.ietopia.master;
    return promise.all(Object.keys(masters).map(key=>{
      return masters[key].request()
      .then( list => global.APP.master[key] = list );
    }));
  });
}