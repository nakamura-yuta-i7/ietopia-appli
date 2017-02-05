import Page from '../Page';
import './search.scss';

export default class SearchPage extends Page {
  indexAction() {
    this.headerTitle = "検索";
    
    var $icon
    
    var $searchForm = $(`<form>
      
      <section>
        <div class="description text-right">マンション・アパート名、全文から検索</div>
        <div class="ui input word">
          <input type="text" name="word" placeholder="フリーワードで検索">
        </div>
      </section>
      
      <section>
        <h2>路線・駅</h2>
        <div class="ui left icon input station">
          <input type="text" name="station" placeholder="指定なし">
          <div class="icon_train">
            <img src="img/common/form/icon_train.png">
          </div>
          <div class="icon_remove">
            <img src="img/common/form/icon_remove.png">
          </div>
        </div>
      </section>
      
      <section>
        <h2>￥ 家賃</h2>
        <div class="table">
          <div class="table-cell">
            <select class="ui dropdown">
              <option value="">下限なし</option>
              <option value="3">3.0万</option>
              <option value="2">5.0万</option>
              <option value="2">5.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
            </select>
          </div>
          <div class="table-cell">
            <span class="between">〜</span>
          </div>
          <div class="table-cell">
            <select class="ui dropdown">
              <option value="">下限なし</option>
              <option value="3">3.0万</option>
              <option value="2">5.0万</option>
              <option value="2">5.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
              <option value="2">2.0万</option>
            </select>
          </div>
        </div>
      </section>
      
      <section>
        <h2>条件・こだわり</h2>
        <div class="description">間取や面積、駅徒歩、設備などこだわりポイントを指定</div>
        <div class="ui left icon input">
          <input type="text" placeholder="指定なし">
          <div class="icon_list">
            <img src="img/common/form/icon_list.png">
          </div>
          <div class="icon_remove">
            <img src="img/common/form/icon_remove.png">
          </div>
        </div>
      </section>
      
      <div id="submit-btn-area">
        <div class="btn_search">
          <img src="img/common/form/btn_search.png">
        </div>
      </div>
      
    </form>`);
    
    this.$contents.html( $searchForm );
  }
}