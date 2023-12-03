window.onload = () => {
    const gallery = document.querySelectorAll(".image"),
        previewBox = document.querySelector(".preview-box"),
        previewImg = previewBox.querySelector("img"),
        closeIcon = previewBox.querySelector(".icon"),
        currentImg = previewBox.querySelector(".current-img"),
        totalImg = previewBox.querySelector(".total-img"),
        shadow = document.querySelector(".shadow"),
        galleryContainer = document.querySelector('.gallery'),
        wrapper = document.querySelector('.wrapper');

    let newIndex = 0;
    let clickedImgIndex;
    let autoSlide;

    let isMouseDown = false;

    function preview() {
        currentImg.textContent = newIndex + 1;
        let imageURL = gallery[newIndex].querySelector("img").src;
        previewImg.src = imageURL;
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            newIndex++;
            if (newIndex >= gallery.length) {
                newIndex = 0;
            }
            preview();
            scrollGallery();
        }, 15000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        if (!isMouseDown) {
            startAutoSlide();
        }
    }

    function scrollGallery() {
        if (newIndex >= gallery.length) {
            newIndex = 0;
        }

        galleryContainer.scrollTo({
            left: galleryContainer.clientWidth * newIndex,
            behavior: 'smooth'
        });
    }

    startAutoSlide();

    galleryContainer.addEventListener('mousedown', () => {
        isMouseDown = true;
        clearInterval(autoSlide);
    });

    galleryContainer.addEventListener('mouseup', () => {
        isMouseDown = false;
        resetAutoSlide();
    });

    galleryContainer.addEventListener('mouseleave', () => {
        if (isMouseDown) {
            isMouseDown = false;
            resetAutoSlide();
        }
    });

    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length;

        gallery[i].onclick = () => {
            clickedImgIndex = i;
            resetAutoSlide();
            newIndex = i;
            preview();

            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");

            if (newIndex === 0) {
                prevBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
            }

            if (newIndex === gallery.length - 1) {
                nextBtn.style.display = "none";
            } else {
                nextBtn.style.display = "block";
            }

            prevBtn.onclick = () => {
                newIndex--;
                if (newIndex <= 0) {
                    newIndex = 0;
                    prevBtn.style.display = "none";
                } else {
                    prevBtn.style.display = "block";
                }
                nextBtn.style.display = "block";
                preview();
                resetAutoSlide();
                scrollGallery();
            }

            nextBtn.onclick = () => {
                newIndex++;
                if (newIndex >= gallery.length - 1) {
                    newIndex = gallery.length - 1;
                    nextBtn.style.display = "none";
                } else {
                    nextBtn.style.display = "block";
                }
                prevBtn.style.display = "block";
                preview();
                resetAutoSlide();
                scrollGallery();
            }

            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show");
            shadow.style.display = "block";

            closeIcon.onclick = () => {
                newIndex = clickedImgIndex;
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
                document.querySelector("body").style.overflow = "scroll";
                resetAutoSlide();
            }
        }
    }

    const prevButton = document.createElement('div');
    prevButton.className = 'slide prev';
    prevButton.innerHTML = '<i class="fas fa-arrow-left" style="color: #00baff;"></i>';
    prevButton.onclick = () => {
        newIndex--;
        if (newIndex <= 0) {
            newIndex = 0;
            prevButton.style.display = "none";
        } else {
            prevButton.style.display = "block";
        }
        nextButton.style.display = "block";
        preview();
        resetAutoSlide();
        scrollGallery();
    };

    const wrapperRect = wrapper.getBoundingClientRect();
    const arrowHeight = prevButton.offsetHeight;
    const arrowTop = (wrapperRect.height - arrowHeight) / 2;
    prevButton.style.top = arrowTop + 'px';
    wrapper.insertBefore(prevButton, wrapper.firstChild);

    const nextButton = document.createElement('div');
    nextButton.className = 'slide next';
    nextButton.innerHTML = '<i class="fas fa-arrow-right" style="color: #00baff;"></i>';
    nextButton.onclick = () => {
        newIndex++;
        if (newIndex >= gallery.length - 1) {
            newIndex = gallery.length - 1;
            nextButton.style.display = "none";
        } else {
            nextButton.style.display = "block";
        }
        prevButton.style.display = "block";
        preview();
        resetAutoSlide();
        scrollGallery();
    };
    wrapper.appendChild(nextButton);

    shadow.onclick = () => {
        newIndex = clickedImgIndex;
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        previewBox.classList.remove("show");
        shadow.style.display = "none";
        document.querySelector("body").style.overflow = "scroll";
        resetAutoSlide();
    };

    const prevBtnInside = document.createElement('div');
    prevBtnInside.className = 'slide prev inside';
    prevBtnInside.innerHTML = '<i class="fas fa-arrow-left" style="color: #00baff;"></i>';
    prevBtnInside.onclick = () => {
        newIndex--;
        if (newIndex <= 0) {
            newIndex = 0;
            prevBtnInside.style.display = "none";
        } else {
            prevBtnInside.style.display = "block";
        }
        nextBtnInside.style.display = "block";
        preview();
        resetAutoSlide();
        scrollGallery();
    };
    previewBox.appendChild(prevBtnInside);

    const nextBtnInside = document.createElement('div');
    nextBtnInside.className = 'slide next inside';
    nextBtnInside.innerHTML = '<i class="fas fa-arrow-right" style="color: #00baff;"></i>';
    nextBtnInside.onclick = () => {
        newIndex++;
        if (newIndex >= gallery.length - 1) {
            newIndex = gallery.length - 1;
            nextBtnInside.style.display = "none";
        } else {
            nextBtnInside.style.display = "block";
        }
        prevBtnInside.style.display = "block";
        preview();
        resetAutoSlide();
        scrollGallery();
    };
    previewBox.appendChild(nextBtnInside);
};
