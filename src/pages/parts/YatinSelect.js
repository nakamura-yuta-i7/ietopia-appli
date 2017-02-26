import Html from "./Html";

class YatinSelect extends Html {
  constructor() {
    super();
    this.options = deepCopy(APP.master.yatin);
  }
}
export class YatinSelectMin extends YatinSelect {
  constructor(selectedVal="") {
    super();
    var name = "yatin-min";
    this.options.unshift( { value: "", name: "下限なし" } );
    this.$html = $select({options: this.options, selectedVal, name});
    this.$html.on("change", function() {
      global.APP.search_history[name] = $(this).val();
    });
  }
}
export class YatinSelectMax extends YatinSelect {
  constructor(selectedVal="") {
    super();
    var name = "yatin-max";
    this.options.push( { value: "", name: "上限なし" } );
    this.$html = $select({options: this.options , selectedVal, name});
    this.$html.on("change", function() {
      global.APP.search_history[name] = $(this).val();
    });
  }
}