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
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
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

    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length;

        gallery[i].onclick = () => {
            clickedImgIndex = i;
            resetAutoSlide();
            newIndex = i;
            preview();

            const prevBtn = document.querySelector(".slide.prev");
            const nextBtn = document.querySelector(".slide.next");
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

    // Adicionando botão "anterior" à esquerda do wrapper
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
    // Centralizar a seta da esquerda na parte média do quadrado
    const wrapperRect = wrapper.getBoundingClientRect();
    const arrowHeight = prevButton.offsetHeight;
    const arrowTop = (wrapperRect.height - arrowHeight) / 2;
    prevButton.style.top = arrowTop + 'px';
    wrapper.insertBefore(prevButton, wrapper.firstChild);

    // Adicionando botão "próximo" à direita do wrapper
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

    // Fechar a janela de preview ao clicar fora da área da foto
    shadow.onclick = () => {
        newIndex = clickedImgIndex;
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        previewBox.classList.remove("show");
        shadow.style.display = "none";
        document.querySelector("body").style.overflow = "scroll";
        resetAutoSlide();
    };
};
