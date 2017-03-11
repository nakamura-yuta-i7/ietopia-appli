import "./hit_count.scss";

export default class HitCount {
  constructor($parent) {
    var $hitCount = $(`
      <div class="hit-count">
        <div class="heading">条件にマッチ</div>
        <div class="data">
          <span class="value">--</span>
          <span class="ken">件</span>
        </div>
      </div>
    `);
    this.$hitCount = $hitCount.find(".value");
    $parent.append($hitCount);
    
    this._reflectCount();
  }
  _reflectCount() {
    this._getCount()
    .then( count => this.$hitCount.text(count) );
  }
  _getCount() {
    var params = global.APP.search_history;
    return global.APP.api.ietopia.room.count(params);
  }
  refresh() {
    console.log( "HitCount.refresh()" );
    this._getCount()
    .then( count => $(".hit-count").find(".value").text(count) );
  }
}