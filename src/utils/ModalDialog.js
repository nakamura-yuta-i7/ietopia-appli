import './modal_dialog.scss';

export default class ModalDialog {
  constructor($contents) {
    this.$contents = $(`<div class="modal-contents"></div>`);
    this.$contents.append($contents);
    this.$modalWrapper = $(`<div class="modal-wrapper"></div>`);
    this.$modalBg = $(`<div class="modal-bg-layer"></div>`);
  }
  open() {
    this.renderContents();
    this.renderBgLayer();
    $("body").append(this.$modalWrapper);
  }
  renderContents() {
    this.$modalWrapper.append(this.$contents);
  }
  close() {
    this.$modalWrapper.remove();
  }
  renderBgLayer() {
    this.$modalBg.on("tap", () => {
      this.close();
    });
    this.$modalWrapper.append(this.$modalBg);
  }
}