import Html from "../parts/Html";
export default class RoomImagesArea extends Html {
  constructor(data={}) {
    super();
    var gaikan_images = data.gaikan_images || [];
    var naikan_images = data.naikan_images || [];
    
    var image_first = gaikan_images.length ? 
      (function() {
        return gaikan_images[0];
      })() : 
      (function() {
        return naikan_images[0];
      })();
      
    // console.log( {image_first} );
    // => iamge(sample object)
    // gaikanImageId: "2162"
    // thumId: "a582d4f33efcf46805153866e94cee7b"
    // thumSmallUrl: "http://www.ietopia.jp/img/cache/64x48_a582d4f33efcf46805153866e94cee7b.jpg"
    // thumBigUrl: "http://www.ietopia.jp/img/cache/480x360_a582d4f33efcf46805153866e94cee7b.jpg"
    
    var $imagesArea = $(`
      <div class="images-area"></div>
    `);
    var $mainImage = $(`
      <div class="main-image">
        <img src="${image_first.thumBigUrl}">
      </div>
    `);
    var $thumsArea = $(`
      <div class="thums-area"></div>
    `);
    $imagesArea.append($mainImage);
    $imagesArea.append($thumsArea);
    
    // サムネイル写真一覧は外観＆内観
    var i = 0;
    var thumImgs = _.concat(gaikan_images, naikan_images).map(imgObj=>{
      i += 1;
      var selected = i == 1 ? "selected": "";
      var thumUrl = imgObj.thumSmallUrl;
      var thumBigUrl = imgObj.thumBigUrl;
      var $thumImg = $(`
        <div class="thum ${selected}">
          <img src="${thumUrl}">
        </div>
      `);
      var $thumBigImg = $(`
        <img src="${thumBigUrl}">
      `);
      $thumImg.on("click", function() {
        // クリックしたらメイン写真エリアに表示
        $mainImage.html( $thumBigImg );
        // 選択中のサムネイルからクラス削除しクリックしたものにクラスを付与
        var className = "selected";
        $thumsArea.find(".selected").removeClass(className);
        var $clickedThumImg = $(this);
        $clickedThumImg.addClass(className);
        // クリックした画像がサムネイルエリアの先頭あたりにスクロールして移動するように
        var x = $clickedThumImg.offset().left + ( $thumsArea.scrollLeft() ) - 120;
        $thumsArea.animate({scrollLeft: x});
      });
      return $thumImg;
    });
    $thumsArea.append(thumImgs);
    
    this.$html = $imagesArea;
  }
}