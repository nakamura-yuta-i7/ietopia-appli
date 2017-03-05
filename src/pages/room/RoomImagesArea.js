import Html from "../parts/Html";
export default class RoomImagesArea extends Html {
  constructor(data={}) {
    super();
    var gaikan_images = data.gaikan_images;
    var naikan_images = data.naikan_images;
    
    this.$html = $(`<div>RoomImagesArea</div>`);
  }
}