import Router from "./Router";

export default class Dispatcher {
  
  static dispatch(requestParams) {
    try {
      const router = new Router(requestParams);
      const controller = router.getController();
      const action     = router.getAction();
      controller[ action + "Action" ]();
      
    } catch (err) {
      
      console.error( err );
    }
  }
}