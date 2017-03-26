import Html from "./Html";
import ModalDialog from './ModalDialog';

export default class TelModal extends Html {
  constructor(params={}) {
    super();
    
    var requestRoomId = params.bukken ? params.bukken.id : null ;
    
    var bukkenDiv = params.bukken ? `
      <div class="bukken">
        <div class="bukken-no">物件番号: ${params.bukken.id}</div>
        <div class="bukken-name">${params.bukken.name}</div>
        <div class="bukken-info">${params.bukken.tinryo}：${params.bukken.madori}/${params.bukken.senyumenseki}</div>
      </div>
    ` : "" ;
    
    var $modalContents = $(`
      <div class="modal-bukken-content">
        <div class="title">担当者にお繋ぎいたします</div>
        ${bukkenDiv}
        <div class="call-tel">
          <img src="img/common/form/call_tel_icon_text_button.png" width="158">
        </div>
      </div>
    `);
    
    var modal = new ModalDialog($modalContents);
    modal.open();
    
    var $telButton = $modalContents.find(".call-tel");
    $telButton.on("click", () => {
      location.href = `tel:${config.IETOPIA_TEL}`;
      
      var data = {};
      if ( requestRoomId ) {
        // 物件からのお問い合わせの場合、情報追加
        data.room_id = requestRoomId;
      }
      global.APP.api.ietopia.user.inquiry.callTel(data)
      .catch((err)=>{
        console.error(err);
      })
      
      modal.close();
    });
    this.$html = $modalContents;
  }
}