class FrameGenerator {
    constructor(canvas_id, profileImage, backgroundImage) {
        this.canvas_id = canvas_id;
        this.frameSize = {
            width: 800,
            height: 600
        }
        this.canvas = new fabric.Canvas(canvas_id, {
            width: this.frameSize.width,
            height: this.frameSize.height,
        });

        this.backgroundImage = backgroundImage;
        this.profileImage = profileImage;

        this.onBackgroundImageChanged(backgroundImage);
        this.onProfileImageChanged(profileImage);
    }
    // To Save Image as Image
    onSaveAsImage() {
        return this.canvas.toDataURL({
            format: 'jpg',
            quality: 1.0
        });
    }
    // When Background Image Changed.
    onBackgroundImageChanged(backgroundImage) {
        if (backgroundImage) {
            const canvas = this.canvas;
            // Reset Canvas size
            canvas.setWidth(backgroundImage.frameWidth);
            canvas.setHeight(backgroundImage.frameHeight);
            canvas.renderAll();
            // Rendering new Background Image
            fabric.Image.fromURL(backgroundImage.src, function (img) {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: backgroundImage.frameWidth / img.width,
                    scaleY: backgroundImage.frameHeight / img.height
                });
            });
        }
    }
    // When Profile Image Changed.
    onProfileImageChanged(profileImage) {
        const canvas = this.canvas;
        // Removing previous image
        const previousObjects = canvas.getObjects();
        if (previousObjects) {
            previousObjects.map(object => canvas.remove(object));
        }
        // Generate new image
        fabric.Image.fromURL(profileImage.src, function (image) {
            const img = image.set({
                left: profileImage.left,
                top: profileImage.top,
                width: image.width,
                height: image.height,
                scaleX: profileImage.width / image.width,
                scaleY: profileImage.height / image.height,
            });
            canvas.add(img);
        });
    }
}