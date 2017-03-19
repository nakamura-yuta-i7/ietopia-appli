import Page from '../Page';
import './info.scss';

export default class InfoPage extends Page {
  indexAction() {
    this.headerTitle = "お知らせ"
    this.displayHeaderLogoS = false;
    this.displayHeaderBackButton = true;
    
    var api = global.APP.api.ietopia.master.news;
    api.request()
    .then(list=>{
      
      if ( list.length == 0 ) {
        this.$contents.append( $(`
          <section>
            <div class="body">お知らせは現在ありません。</div>
          </section>
        `) );
      } else {
        list.forEach(data=>{
          var $section = $(`
            <section>
              <div class="date">${data.created_at}</div>
              <div class="title">${data.title}</div>
              <div class="body">${data.body}</div>
            </section>
          `);
          this.$contents.append($section);
        });
      }
      
    });
  }
}