import './modal_dialog.scss';

export default class ModalDialog {
  constructor($contents) {
    this.$contents = $(`<div class="modal-contents"></div>`);
    this.$contents.append($contents);
    this.$modalWrapper = $(`<div class="modal-wrapper"></div>`);
  }
  open() {
    this.renderBgLayer();
    this.renderContents();
    $("body").append(this.$modalWrapper);
  }
  renderContents() {
    this.$modalWrapper.append(this.$contents);
  }
  close() {
    this.$modalWrapper.remove();
  }
  renderBgLayer() {
    var $bg = $(`<div class="modal-bg-layer"></div>`);
    $bg.on("click", () => {
      this.close();
    });
    this.$modalWrapper.append($bg);
  }
}