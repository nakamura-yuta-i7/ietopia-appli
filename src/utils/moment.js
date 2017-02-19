import moment from "moment";
global.moment = moment;
global.now = function() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
moment.locale("ja");
console.log( "moment.locale()", moment.locale() );
console.log( "now()", now() );
