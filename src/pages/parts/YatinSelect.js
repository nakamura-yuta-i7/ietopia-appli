import Html from "./Html";

class YatinSelect extends Html {
  constructor() {
    super();
    this.options = deepCopy(APP.values.yatinSelectBaseOptions);
  }
}
export class YatinSelectMin extends YatinSelect {
  constructor(selectedVal="") {
    super();
    var name = "yatin-min";
    this.options.unshift( { val: "", name: "下限なし" } );
    this.$html = $select({options: this.options, selectedVal, name});
  }
}
export class YatinSelectMax extends YatinSelect {
  constructor(selectedVal="") {
    super();
    var name = "yatin-max";
    this.options.push( { val: "", name: "上限なし" } );
    this.$html = $select({options: this.options , selectedVal, name});
  }
}