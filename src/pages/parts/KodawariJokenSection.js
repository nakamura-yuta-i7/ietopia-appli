import CheckboxesSection from "./CheckboxesSection";
import "./kodawari_joken_section.scss";

export default class KodawariJokenSection extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || []
    
    var title = "こだわり条件";
    var identifier = "kodawari_joken";
    var api = global.APP.api.ietopia.kodawari_joken;
    
    super({selectedVals, title, identifier, api});
  }
}