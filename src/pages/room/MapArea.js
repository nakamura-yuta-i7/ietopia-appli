import Html from "../parts/Html";
export default class MapArea extends Html {
  constructor(data={}) {
    super();
    
    // 住所をメモ
    var shozaiti = data.shozaiti;
    
    // 地図・ストリートビュー用エリア
    var $mapArea = $(`
      <div class="map-area">
      </div>
    `);
    var $mapStreetViewButtonArea = $(`
      <div class="map-street-view-button-area button-combi-area">
        <div class="map-street-view-button button-combi">
          <div class="button left map tapped">マップ</div>
          <div class="button right street">ストリートビュー</div>
        </div>
      </div>
    `);
    
    var $map = $(`
      <div id="map">
        <iframe src="./map.html?type=map&shozaiti=${shozaiti}"></iframe>
      </div>
    `);
    
    var $streetView = $(`
      <div id="street-view">
        <iframe src="./map.html?type=streetview&shozaiti=${shozaiti}"></iframe>
      </div>
    `);
    
    var $mapBtn = $mapStreetViewButtonArea.find(".map");
    var $streetBtn = $mapStreetViewButtonArea.find(".street");
    
    $mapBtn.on("click", function() {
      $mapBtn.addClass("tapped");
      $streetBtn.removeClass("tapped");
      $map.show();
      // $streetView.hide();
    });
    $streetBtn.on("click", function() {
      $mapBtn.removeClass("tapped");
      $streetBtn.addClass("tapped");
      $map.hide();
      // $streetView.show();
    });
    $mapArea.append($mapStreetViewButtonArea);
    $mapArea.append($map);
    $mapArea.append($streetView);
    
    this.$html = $mapArea;
    
    // setTimeout(function() {
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 15,
    //     center: {lat: -34.397, lng: 150.644}
    //   });
    //   var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({address: shozaiti}, function(results, status) {
    //     if ( status === google.maps.GeocoderStatus.OK ) {
    //       var fenway = results[0].geometry.location;
    //       map.setCenter(fenway);
    //       var marker = new google.maps.Marker({
    //         map: map,
    //         position: fenway
    //       });
    //       var streetView = document.getElementById('street-view');
    //       var panorama = new google.maps.StreetViewPanorama(
    //         streetView, {
    //         position: fenway,
    //         pov: {
    //           heading: 34,
    //           pitch: 10
    //         }
    //       });
    //       // $(streetView).hide();
    //     }
    //   });
    // }, 1000);
  }
}