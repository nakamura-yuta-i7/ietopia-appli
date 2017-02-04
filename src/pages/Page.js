import './common.scss';

export default class Page {
  constructor(requestParams) {
    this.requests = requestParams;
    this.$app = $("#app");
    this.$app.show();
    this.$app.html(null);
    console.log( this.requests );
  }
}