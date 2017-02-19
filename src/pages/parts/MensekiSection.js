import CheckboxesSection from "./CheckboxesSection";
import "./menseki_section.scss";

export default class MensekiSection extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || []
    
    var title = "専有面積";
    var identifier = "menseki";
    var api = global.APP.api.ietopia.menseki;
    
    super({selectedVals, title, identifier, api});
  }
}