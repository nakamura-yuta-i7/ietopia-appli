import _ from 'lodash';

export default class Layout {
  constructor($base) {
    this.$base = $base;
  }
  renderDefault() {
    var $template = this.getTemplate();
    this.$base.html( $template );
  }
  getTemplate() {
    var $template = $("<div>");
    $template.append( this.getHeader() );
    $template.append( this.getFooter() );
    return $template;
  }
  getHeader() {
    var $header = $("<header>");
    $header.html("header!");
    return $header;
  }
  getFooter() {
    var $header = $("<footer>");
    $header.html("footer!");
    return $header;
  }
}