"use strict";

webshim.register("mediacapture-picker", function (a, b) {
  "use strict";

  function c(a) {
    this.$dom = a, this._createDom(), this.requestMedia();
  }

  c.prototype = {
    _createDom: function _createDom() {
      this.$dom.html('<div class="ws-videocapture-view"><video class="ws-usermedia ws-inlineusermedia" autoplay=""></video><div class="ws-video-overlay"></div></div><div class="button-row"><button type="button" class="ws-capture-button">take</button></div>');
    },
    requestMedia: function requestMedia() {
      var b = this;
      navigator.getUserMedia({
        video: {
          minWidth: 200,
          audio: !1
        }
      }, function (c) {
        b.stream = c, a("video", b.$dom).prop("src", URL.createObjectURL(c));
      }, function () {}), a("video", b.$dom).removeClass("ws-usermedia");
    }
  }, b.mediacapture.showContent = function (a, b, d) {
    new c(d.contentElement);
  };
});