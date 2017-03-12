import Page from '../Page';
import './history.scss';

export default class HistoryPage extends Page {
  indexAction() {
    this.headerTitle = "履歴"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    global.APP.api.ietopia.room.list({history:1})
    .then( list => {
      list.list.forEach( room => {
        
        var $item = $(`
          <section class="item">
            <div class="">
              <span class="date">${room.history_created_at}</span>
              <h3>${room.name}</h3>
              <img src="${room.gaikan_image_main}" width="100">
              <div class="info">
                <div class="yatin">
                  <span class="int">${room.yatin_int / 10000}</span>
                  <span class="manyen">万円</span>
                </div>
                <span class="madori">${room.madori}</span>
                /
                <span class="senyumenseki">${room.senyumenseki}</span>
                <div class="kotu_first_line">${room.kotu_first_line}</div>
              </div>
            </div>
          </section>
        `);
        $item.find("h3").on("click", ()=>{
          
          // 画面切り替え
          renderPage({
            page: "room",
            transitionType: "SLIDE_LEFT",
            requests: {
              room_id: room.id
            }
          });
        });
        this.$contents.append( $item );
      });
    } );
  }
}