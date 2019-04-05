export default {
  stream: {},

  initialise(video) {
    let self = this;

    window.navigator.getUserMedia(
      { video: true },

      s => {
        self.stream = s;
        video.srcObject = s;
        video.play();
      },

      err => {
        console.error(err);
      }
    );
  },

  takeSnapshot(video) {
    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  },

  stop() {
    this.stream.getTracks()[0].stop();
  }
};
