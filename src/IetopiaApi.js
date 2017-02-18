class IetopiaApi {
  constructor() {
    this.API_BASE_URL = global.config.API_BASE_URL + "/api";
  }
  request(params={}) {
    var url = this.API_BASE_URL + this.API_URL_SUFIX;
    
    return $.ajax({
      url,
      dataType: "json",
    });
  }
}
class IetopiaMasterApiBase extends IetopiaApi {
  constructor() {
    super();
    this.API_URL_SUFIX = "/master";
  }
  setApiUrlSufix(sufix) {
    this.API_URL_SUFIX = this.API_URL_SUFIX + sufix;
  }
}
export class EkitohoApi extends IetopiaMasterApiBase {
  constructor() {
    super();
    this.setApiUrlSufix("/madori");
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