import RoomItem from "./RoomItem";
import "./RoomList.scss";

export default class RoomList {
  static findAll(searchParams, $countVal=null) {
    $(".room-list").remove();
    var $roomList = $(`<div class="room-list"></div>`);
    
    return RoomList.requestList(searchParams)
    .then( result => {
      if ( $countVal ) {
        var count = result.count;
        $countVal.html(count);
      }
      var rooms = result.list;
      rooms.forEach( room => {
        var $room = RoomItem.createElem(room);
        $roomList.append($room);
      } );
      if ( rooms.length == 0 ) {
        $roomList.append( $(`
          <div class="not-found-search-result">
            検索条件にヒットする物件は見つかりませんでした。
          </div>
        `) );
      }
      return $roomList;
    } );
  }
  static requestList(searchParams) {
    return global.APP.api.ietopia.room.list(searchParams);
  }
}