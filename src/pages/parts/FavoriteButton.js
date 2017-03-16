import Html from "./Html";
export default class FavoriteButton extends Html {
  constructor(params={}) {
    super();
    var room_id = params.room_id;
    
    var $favoriteBtn = $(`
        <div class="favorite star">
          <img src="${getfavoriteIconSrc(room_id)}" height="22">
        </div>`);
    $favoriteBtn.tappable(function() {
      (function() {
        return hasFavorite(room_id) ?
          global.APP.api.ietopia.user.favorite.delete(room_id) :
          global.APP.api.ietopia.user.favorite.save(room_id)
      })()
      .then(()=>{
        return global.APP.api.ietopia.user.favorite.list()
        .then( list => global.APP.favorite = list );
      })
      .then(()=>{
        var src = getfavoriteIconSrc(room_id);
        $(this).find("img").attr("src", src);
      });
      return false;
    });
    this.$html = $favoriteBtn;
  }
}
function getfavoriteIconSrc(room_id) {
  var found = hasFavorite(room_id);
  var name = found ? "icon_star_on" : "icon_star_off";
  return `img/common/room-list/${name}.png`;
}
function hasFavorite(room_id) {
  return _.includes(global.APP.favorite || [], room_id);
}