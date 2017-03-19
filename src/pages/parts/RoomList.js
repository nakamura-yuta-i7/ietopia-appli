import RoomItem from "./RoomItem";
import "./RoomList.scss";

export default class RoomList {
  
  static get PAGING_COUNT() {
    return 50;
  }
  
  static findAll(searchParams, $countVal=null) {
    $(".room-list").remove();
    var $roomList = $(`<div class="room-list"></div>`);
    searchParams.offset = 0;
    searchParams.limit = RoomList.PAGING_COUNT;
    
    return RoomList.requestList(searchParams)
    .then( result => {
      var totalCount = parseInt(result.count);
      var loadedCount = parseInt(result.list.length);
      var rooms = result.list;
      
      if ( $countVal ) {
        $countVal.html(totalCount);
      }
      
      if ( totalCount == 0 ) {
        
        $roomList.append( $(`
          <div class="not-found-search-result">
            検索条件にヒットする物件は見つかりませんでした。
          </div>
        `) );
        
      } else {
        
        addRooms(rooms);
        if ( totalCount > RoomList.PAGING_COUNT ) {
          $roomList.append(createGoNextPageElem());
        }
        
      }
      return $roomList;
      
      function addRooms(rooms) {
        rooms.forEach( room => {
          var $room = RoomItem.createElem(room);
          $roomList.append($room);
        } );
      }
      function createGoNextPageElem() {
        var $goNextPage = $(`
          <div class="goto-next-page">
            次の${RoomList.PAGING_COUNT}件を表示 ( ${totalCount}件中 ${loadedCount}件を表示中 )
          </div>
        `);
        $goNextPage.on("click", function() {
          
          searchParams.offset += RoomList.PAGING_COUNT;
          RoomList.requestList(searchParams)
          .then( result => {
            loadedCount += parseInt(result.list.length);
            addRooms(result.list);
            console.log( {totalCount, loadedCount} );
            if ( totalCount > loadedCount ) {
              $roomList.append(createGoNextPageElem());
            }
            $goNextPage.remove();
          } );
        });
        return $goNextPage;
      }
    } );
  }
  static requestList(searchParams) {
    return global.APP.api.ietopia.room.list(searchParams);
  }
}
