import CheckboxesSection from "./CheckboxesSection";
// import "./station_section.scss";

export default class StationSection extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || []
    
    var title = "駅";
    var identifier = "station";
    var apiResult = global.APP.master.station;
    
    super({selectedVals, title, identifier, apiResult});
  }
}