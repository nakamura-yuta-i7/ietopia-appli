import Page from '../Page';
import './mypage.scss';

export default class MyPagePage extends Page {
  indexAction() {
    this.headerTitle = "マイページ"
    var $menus = $(`<div class="menus"></div>`);
    var menus = [
      { type:"line", action: function() {
        window.open(config.IETOPIA_LINE_AT_URL, "_blank");
      } },
      { type:"map", action: function() {
        window.open(config.IETOPIA_GOOGLE_MAP_URL, "_blank");
      } },
      { type:"inquiry", action: function() {
        
      } },
      { type:"history", action: function() {
        
      } },
      { type:"kibou_osumai", action: function() {
        
      } },
      { type:"info", action: function() {
        
      } },
      { type:"kiyaku", action: function() {
        
      } },
      { type:"privacy_policy", action: function() {
        window.open(config.IETOPIA_PRIVACY_POLICY_URL, "_blank");
      } },
      { type:"gaiyou", action: function() {
        window.open(config.IETOPIA_GAIYO_URL, "_blank");
      } },
    ];
    menus.forEach( (data) => {
      var type = data.type;
      var action = data.action;
      var $menu = $(`<div class="menu menu-${type}"><img src="img/mypage/mypage_menu_${type}.png"></div>`);
      $menu.on("click", action);
      $menus.append($menu);
    });
    this.$contents.append( $menus );
  }
}