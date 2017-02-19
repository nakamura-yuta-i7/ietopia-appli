import CheckboxesSection from "./CheckboxesSection";
// import "./station_section.scss";

export default class StationSection extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || []
    
    var title = "駅";
    var identifier = "station";
    var api = global.APP.api.ietopia.station;
    
    super({selectedVals, title, identifier, api});
  }
  apiRequest(params={}) {
    params.group = "name";
    params.order = "name ASC";
    return this.api.request(params);
  }
}