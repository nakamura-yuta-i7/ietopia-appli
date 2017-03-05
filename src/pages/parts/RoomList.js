import RoomItem from "./RoomItem";

export default class RoomList {
  static findAll(searchParams) {
    var $roomList = $(`<div class="room-list"></div>`);
    
    return RoomList.requestList(searchParams)
    .then( (rooms) => {
      rooms.forEach( (room) => {
        var $room = RoomItem.createElem(room);
        $roomList.append($room);
      } );
      if ( rooms.length == 0 ) {
        $roomList.append( $(`
          <div>検索条件にヒットする物件がありませんでした。</div>
        `) );
      }
      return $roomList;
    } );
  }
  static requestList(searchParams) {
    return global.APP.api.ietopia.room.list(searchParams);
  }
}