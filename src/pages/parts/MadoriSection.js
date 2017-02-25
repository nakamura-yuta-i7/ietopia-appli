import CheckboxesSection from "./CheckboxesSection";
import "./madori_section.scss";

export default class MadoriSection extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || []
    
    var title = "間取";
    var identifier = "madori";
    var api = global.APP.api.ietopia.master.madori;
    
    super({selectedVals, title, identifier, api});
  }
}