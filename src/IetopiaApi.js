class IetopiaApi {
  constructor() {
    this.API_BASE_URL = global.config.API_BASE_URL + "/api";
  }
  request(params={}) {
    var url = API_BASE_URL;
    
    return $.ajax({
      url,
      dataType: "json",
    });
  }
}
export class IetopiaMasterApi extends IetopiaApi {
  constuctor() {
    
  }
}