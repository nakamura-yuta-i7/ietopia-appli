function ajaxWithSession(params) {
  params.xhrFields = {withCredentials: true};
  params.dataType = "json";
  // params.beforeSend = function(xhr) {
  //   xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
  // };
  console.log( params.url );
  return $.ajax(params);
}
export default class IetopiaApi {
  constructor() {
    this.API_BASE_URL = global.config.API_BASE_URL + "/api";
    this.url = this.API_BASE_URL;
  }
  setApiUrlSufix(sufix) {
    this.API_URL_SUFIX += sufix;
    this.url = this.API_BASE_URL + this.API_URL_SUFIX;
  }
  request(params={}, method="GET", url) {
    return ajaxWithSession({
      url: url || this.url,
      method: method,
      data: params,
    });
  }
  static login(uuid) {
    return ajaxWithSession({
      url: global.config.API_BASE_URL + "/login",
      data: { uuid: uuid, },
    });
  }
  static isloggedIn() {
    return ajaxWithSession({
      url: global.config.API_BASE_URL + "/is_logged_in",
    });
  }
  static logout() {
    return ajaxWithSession({
      url: global.config.API_BASE_URL + "/logout",
    });
  }
}
class IetopiaMasterApiBase extends IetopiaApi {
  constructor() {
    super();
    this.API_URL_SUFIX = "/master";
  }
}
export class IetopiaMasterAllApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/all");
  }
}
export class StationApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/station");
  }
}
export class MadoriApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/madori");
  }
}
export class TikunensuApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/tikunensu");
  }
}
export class EkitohoApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/ekitoho");
  }
}
export class MensekiApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/menseki");
  }
}
export class RosenApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/rosen");
  }
}
export class KodawariJokenApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/kodawari_joken");
  }
}
export class YatinApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/yatin");
  }
}
class IetopiaUserApiBase extends IetopiaApi {
  constructor() {
    super();
    this.API_URL_SUFIX = "/user";
  }
}
class IetopiaMeApiBase extends IetopiaUserApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/me");
  }
}
export class MeApi extends IetopiaMeApiBase {
  save(data="{}") {
    var url = this.url + "/save";
    return this.request(data, "POST", url);
  }
}
export class SearchHistoryApi extends IetopiaMeApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/search_history");
  }
  get() {
    return this.request().then( data => {
      if ( data.params_json ) return JSON.parse(data.params_json);
      return {};
    } );
  }
  save(params_json="{}") {
    var url = this.url + "/save";
    return this.request({params_json}, "POST", url);
  }
}
export class RoomHistoryApi extends IetopiaMeApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/room_history");
  }
  save(room_id) {
    var url = this.url + "/save";
    return this.request({room_id}, "GET", url);
  }
}
export class FavoriteApi extends IetopiaMeApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/favorite");
  }
  list() {
    var url = this.url + "/list";
    return this.request({}, "GET", url);
  }
  save(room_id) {
    var url = this.url + "/save";
    return this.request({room_id}, "GET", url);
  }
  delete(room_id) {
    var url = this.url + "/delete";
    return this.request({room_id}, "GET", url);
  }
}
export class IetopiaRoomApi extends IetopiaApi {
  constructor() {
    super();
  }
  list(params) {
    var url = this.url + "/room/list";
    return this.request(params, "GET", url);
  }
  get(room_id) {
    var url = this.url + "/room/detail";
    return this.request({id: room_id}, "GET", url);
  }
  count(params) {
    var url = this.url + "/room/count";
    return this.request(params, "GET", url);
  }
}