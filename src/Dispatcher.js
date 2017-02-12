import Router from "./Router";

export default class Dispatcher {
  
  static dispatch(requestParams, transitionType) {
    try {
      const router = new Router(requestParams, transitionType);
      const controller = router.getController();
      const action     = router.getAction();
      if (transitionType != "BACK") {
        controller[ action + "Action" ]();
      }
      controller.render();
      
    } catch (err) {
      
      console.error( err );
    }
  }
}