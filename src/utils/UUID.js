export default class UUID {
  static get() {
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
}