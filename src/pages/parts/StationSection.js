import CheckboxesSection from "./CheckboxesSection";
// import "./station_section.scss";

export default class StationSection extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || [];
    params.rosen = params.rosen || "";
    
    var title = "駅";
    var identifier = "station";
    var apiResult = (function() {
      if (params.rosen=="") return global.APP.master.station;
      return global.APP.master.station.filter(function(station) {
        return station.rosen_name == params.rosen;
      });
    })();
    apiResult = _.uniqBy(apiResult, 'name');
    
    super({selectedVals, title, identifier, apiResult});
  }
}