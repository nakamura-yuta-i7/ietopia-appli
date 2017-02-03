
import Layout from './Layout';

class Page {
  constructor(requestParams) {
    this.requests = requestParams;
    this.$app = $("#app");
  }
  render() {
    const layout = new Layout( this.$app );
    layout.renderDefault();
  }
}

class TopPage extends Page {
  indexAction() {
    console.log( this.requests );
  }
  secondAction() {
    console.log( "second action." );
    console.log( this.requests );
  }
}

class Router {
  constructor(requestParams) {
    this.pageParam   = requestParams.page || "top";
    this.actionParam = requestParams.action || "index";
    this.requestParams = requestParams;
  }
  getController() {
    switch (this.pageParam) {
      case "top": return new TopPage(this.requestParams);
      default:
        throw Error("Not found.");
    }
  }
  getAction() {
    return this.actionParam;
  }
}

class Dispatcher {
  static dispatch(requestParams) {
    try {
      const router = new Router(requestParams);
      const controller = router.getController();
      const action     = router.getAction();
      controller[ action + "Action" ]();
      controller.render();
      
    } catch (err) {
      
      console.error( err );
    }
  }
}

import queryString from 'query-string';

function renderPage(params={}) {
  const controller    = params.controller || "top";
  const action        = params.action     || "index";
  const requestParams = params.requests || queryString.parse(location.search);
  requestParams.page   = controller;
  requestParams.action = action;
  
  Dispatcher.dispatch( requestParams );
}


renderPage({
  action: "second",
  requests: {
    name: "yuta",
  },
});
