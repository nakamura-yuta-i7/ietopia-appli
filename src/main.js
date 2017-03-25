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
  StationApi, KodawariJokenApi, YatinApi, IetopiaMasterAllApi } from "./IetopiaApi";
import { MeApi, SearchHistoryApi, RoomHistoryApi, FavoriteApi } from "./IetopiaApi";
import { InquiryApi, IetopiaRoomApi, NewsApi, RecommendAreaApi } from "./IetopiaApi";

// グローバル変数
global.APP = {
  search_page: {
    hit_count_instance: null,
  },
  me: null, // ログインした後に入れる
  search_history: null, // 検索条件を変更したり検索した時に入れる
  favorite: null,
  master: {},
  api: {
    ietopia: {
      room: new IetopiaRoomApi(),
      master: {
        all: new IetopiaMasterAllApi(),
        madori: new MadoriApi(),
        ekitoho: new EkitohoApi(),
        tikunensu: new TikunensuApi(),
        menseki: new MensekiApi(),
        rosen: new RosenApi(),
        station: new StationApi(),
        kodawari_joken: new KodawariJokenApi(),
        yatin: new YatinApi(),
        news: new NewsApi(),
        recommend_area: new RecommendAreaApi(),
      },
      user: {
        me: new MeApi(),
        search_history: new SearchHistoryApi(),
        room_history: new RoomHistoryApi(),
        favorite: new FavoriteApi(),
        inquiry: new InquiryApi(),
      },
    },
  },
};


$(function() {
  $("#swipe-to-back").bind("touchstart mousedown", function() {
    console.log( "touchstart" );
    $(this).addClass("touch");
  });
  $("#swipe-to-back").bind("touchend mouseup", function() {
    console.log( "touchend" );
    $(this).removeClass("touch");
  });
  $("#swipe-to-back").swipe({
    swipe: (event, direction, distance, duration, fingerCount, fingerData) => {
      console.log( {event, direction, distance, duration, fingerCount, fingerData} );
      console.log( {direction} );
      if ( direction == "right" ) {
        history.back();
      }
    },
    threshold: 0
  });
});


import Dispatcher from "./Dispatcher";
import queryString from 'query-string';
global.queryString = queryString;
global.renderPage = function (params={}) {
  const transitionType = params.transitionType || "REPLACE";
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
  // ページ読み込み、描画処理
  var qs = queryString.parse(location.search);
  qs.transitionType = "BACK";
  
  console.log("onpopstate");
  console.log({qs});
  
  // if ( qs.page == "search" && qs.action == "index" ) {
  //   var hitCountInstance = global.APP.search_page.hit_count_instance;
  //   if ( hitCountInstance ) hitCountInstance.refresh();
  // }
  
  global.renderPage(qs);
}
// 発生したエラーを最後まで捕捉できなかった場合のエラーハンドリング
window.onerror = function (msg, file, line, column, err) {
  console.log( "window.onerror!!!" );
  console.log( {msg, file, line, column, err} );
};

// アプリ起動時
// if ( IS_PRODUCTION ) {
function isMobile() {
  return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
}
if ( isMobile() ) {
  document.addEventListener("deviceready", onDeviceReady, false);
  console.log( "deviceready" );
} else {
  onDeviceReady();
}

import UUID from "./utils/uuid";
function onDeviceReady() {
  console.log( "onDeviceReady" );
  
  promise.resolve()
  // .then( IetopiaApi.logout )
  .then( IetopiaApi.isloggedIn )
  .then( isloggedIn => {
    if ( isloggedIn == false ) return IetopiaApi.login( UUID.get() );
    return global.APP.api.ietopia.user.me.request();
  })
  .then( me => {
    global.APP.me = me;
    global.APP.search_history = me.search_history;
    global.APP.favorite       = me.favorite;
    var allMaster = APP.api.ietopia.master.all;
    return allMaster.request()
    .then( list => global.APP.master = list );
  })
  .then(()=>{
    console.log( "global.APP", global.APP );
    console.log( "IS_PRODUCTION", IS_PRODUCTION );
    global.renderPage();
    
    if ( window.NCMB ) {
      setPushNotificationHandler();
      setDeviceToken();
      
      var timerId = setInterval(function() {
        var installationId = getInstallationId();
        console.log({installationId});
        if ( installationId ) clearInterval(timerId);
      }, 3000);
    }
    
  })
  .catch((err)=>{
    throw err;
  });
}

function setPushNotificationHandler() {
  // プッシュ通知受信時のコールバックを登録します
  window.NCMB.monaca.setHandler(function(jsonData){
    // 送信時に指定したJSONが引数として渡されます 
    alert("callback :::" + JSON.stringify(jsonData));
  });
}
function setDeviceToken() {
  // デバイストークンを取得してinstallation登録が行われます
  // ※ aplication_key,client_keyはニフティクラウドmobile backendから発行されたkeyに置き換えてください
  // ※ sender_idは【GCMとの連携に必要な準備】で作成したProjectのProject Numberを入力してください
  window.NCMB.monaca.setDeviceToken(
    // aplication_key
    "742390256da53e7e1b1c00e98071641d9e18705b9ea6dd8e00ea2a9ca93ac067",
    // client_key
    "9c7caf2e4e9137b554f45436dae80e6943b88935934b999c471b7f6cffedd0e5",
    // sender_id
    "208112135877"
  );
}
function getInstallationId() {
  // 登録されたinstallationのobjectIdを取得します。
  window.NCMB.monaca.getInstallationId(function(id) {
    alert("installationID is: " + id);
  });
}
