import CheckboxesSection from "./CheckboxesSection";
import "./RecommendArea.scss";

export default class RecommendArea extends CheckboxesSection {
  constructor(params={}) {
    var selectedVals = params.selectedVals || []
    
    var title = "おすすめエリア";
    var identifier = "recommend_area";
    var apiResult = global.APP.master.recommend_area;
    
    super({selectedVals, title, identifier, apiResult});
  }
}