class FrameGenerator {
    constructor(canvas_id) {
        this.canvas_id = canvas_id;
        this.frameSize = {
            width: 800,
            height: 600
        }
        this.canvas = new fabric.Canvas(canvas_id, {
            backgroundColor: '#000',
            width: this.frameSize.width,
            height: this.frameSize.height
        });
        this.backgroundImage = null;
        this.profileImage = null;
    }

    onFrameSizeChanged(width, height) {

    }

    onBackgroundImageChanged(backgroundImage) {

    }

    onProfileImageChanged(profileImage) {

    }

    onProfileImageSizeChanged(width, height) {

    }

    onProfileImagePositionChanged(left, top) {

    }
}