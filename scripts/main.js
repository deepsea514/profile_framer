$(document).ready(function () {
    /* Initialize the canvas */
    const backgroundImage = getBackgroundImage();
    const profileImage = getProfileImage();
    const frameGenerator = new FrameGenerator('canvas', profileImage, backgroundImage);

    /* Global Functions */
    function getFrameSize() {
        const width = $('#frame-width-input').val();
        const height = $('#frame-height-input').val();
        return {
            width: Number(width),
            height: Number(height)
        }
    }

    function getProfileSize() {
        const width = $('#profile-width-input').val();
        const height = $('#profile-height-input').val();
        return {
            width: Number(width),
            height: Number(height)
        }
    }

    function getProfilePosition() {
        const left = $('#profile-left-input').val();
        const top = $('#profile-top-input').val();
        return {
            left: Number(left),
            top: Number(top)
        }
    }

    function getProfileImage() {
        const images = $('.profile-image.selected img');
        const { width, height } = getProfileSize();
        const { left, top } = getProfilePosition();
        if (images.length) {
            return {
                src: images[0].src,
                width: width,
                height: height / images[0].naturalWidth * images[0].naturalHeight,
                left: left,
                top: top,
            };
        }
        return null;
    }

    function getBackgroundImage() {
        const { width, height } = getFrameSize();
        const images = $('.background-image.selected img');
        if (images.length) {
            return {
                src: images[0].src,
                width: images[0].naturalWidth,
                height: images[0].naturalHeight,
                frameWidth: width,
                frameHeight: height,
            };
        }
        return null;
    }

    function addProfileImage(image) {
        const imageString =
            `<div class="profile-image">
                <img src="${image}" />
            </div>`;
        const imgElement = $.parseHTML(imageString);
        $('.profile-images-gallery-container').append(imgElement);
        // On Profile Image Clicked
        $('.profile-image img').click(function (event) {
            // Remove previously selected profie image
            $('.profile-image.selected').removeClass('selected');
            // Newly set profile image
            $(event.target).parent().addClass('selected');
            frameGenerator.onProfileImageChanged(getProfileImage());
        })
    }

    function addBackgroundImage(image) {
        const imageString =
            `<div class="background-image">
                <img src="${image}" />
            </div>`;
        const imgElement = $.parseHTML(imageString);
        $('.background-images-gallery-container').append(imgElement);
        // On Background Image Clicked
        $('.background-image img').click(function (event) {
            // Remove previously selected profie image
            $('.background-image.selected').removeClass('selected');
            // Newly set background image
            $(event.target).parent().addClass('selected');
            frameGenerator.onBackgroundImageChanged(getBackgroundImage());
        })
    }

    /* Event Listeners */
    // On Save Image
    $('#save-image-button').click(function () {
        this.href = frameGenerator.onSaveAsImage();
        this.download = 'canvas.png'
    })

    // On Design Image Clicked
    $('.design-image img').click(function (event) {
        const data = $(event.target).data();
        $('#frame-width-input').val(data.frameWidth);
        $('#frame-height-input').val(data.frameHeight);
        $('#profile-width-input').val(data.profileWidth);
        $('#profile-height-input').val(data.profileHeight);
        $('#profile-left-input').val(data.profileLeft);
        $('#profile-top-input').val(data.profileTop);

        frameGenerator.onBackgroundImageChanged(getBackgroundImage());
        frameGenerator.onProfileImageChanged(getProfileImage());
    })

    // Add Profile Image Button Clicked
    $('#profile-image-button').click(function () {
        $('#profile-image-input').click();
    })
    // On Profile Image Uploaded
    $('#profile-image-input').change(function () {
        const files = this.files;

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = function () {
                addProfileImage(reader.result);
            }
            reader.readAsDataURL(files[i]);
        }
    })
    // On Profile Image Clicked
    $('.profile-image img').click(function (event) {
        // Remove previously selected profie image
        $('.profile-image.selected').removeClass('selected');
        // Newly set profile image
        $(event.target).parent().addClass('selected');
        frameGenerator.onProfileImageChanged(getProfileImage());
    })

    // Add Background Image Button Clicked
    $('#background-image-button').click(function () {
        $('#background-image-input').click();
    })
    // On Background Image Uploaded
    $('#background-image-input').change(function () {
        const files = this.files;

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = function () {
                addBackgroundImage(reader.result);
            }
            reader.readAsDataURL(files[i]);
        }
    })

    // On Background Image Clicked
    $('.background-image img').click(function (event) {
        // Remove previously selected background
        $('.background-image.selected').removeClass('selected');
        // Newly set background image
        $(event.target).parent().addClass('selected');
        frameGenerator.onBackgroundImageChanged(getBackgroundImage())
    })

    // On Frame Size changed
    $('#frame-size-form').submit(function (event) {
        event.preventDefault();
        frameGenerator.onBackgroundImageChanged(getBackgroundImage())
    })

    // On Profile Size changed
    $('#profile-size-form').submit(function (event) {
        event.preventDefault();
        frameGenerator.onProfileImageChanged(getProfileImage());
    })

    // On Profile Position changed
    $('#profile-position-form').submit(function (event) {
        event.preventDefault();
        frameGenerator.onProfileImageChanged(getProfileImage());
    })
})