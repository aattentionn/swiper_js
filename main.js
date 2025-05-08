class Carousel {
    listItems = [];
    #carouselId = null;
    currentItemIndex = 0;
    carоuselList = null;
    nextBtn = null;
    prevBtn = null;
    opt = {};
    intervalId = null;
    carouselContainer = null;


    constructor(id, opt = {}) {
        this.#carouselId = id;
        this.opt = opt;
        this.init();
    }

    
    init() {
        this.carouselContainer = document.getElementById(this.#carouselId);

        if (!this.carouselContainer) {
            alert('NO CONTAINER');
            return;
        }

        this.carouselList = this.carouselContainer.querySelector(".carousel_list");
        this.listItems = this.carouselContainer.querySelectorAll(".list_item");
        // this.carouselList.innerHTML = this.listItems[this.currentItemIndex].innerHTML;

        this.prevBtn = document.createElement('button');
        this.prevBtn.innerHTML = "Prev";
        this.prevBtn.classList.add('prev');
        this.nextBtn = document.createElement('button');
        this.nextBtn.innerHTML = "Next";
        this.nextBtn.classList.add('next');
        

        this.prevBtn.addEventListener('click', () => this.changeSlide('prev'));
        this.nextBtn.addEventListener('click', () => this.changeSlide('next'));

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('btnContainer');
        buttonContainer.appendChild(this.prevBtn);
        buttonContainer.appendChild(this.nextBtn);

        this.carouselContainer.appendChild(buttonContainer);

        if (this.opt.autoPlay){
            this.intervalId = setInterval(() => {this.changeSlide('next')}, this.opt.autoPlay);
        }

        this.updateCarousel();

    }


    getId() {
        return this.#carouselId;
    }

    setSliderInterval() {
        this.intervalId = setInterval(() => {this.nextFn()}, this.opt.autoPlay);
    }

    clearSliderInterval() {
        clearInterval(this.intervalId);
    }

    updateTimer(cb) {
        this.clearSliderInterval();
        cb();
        this.setSliderInterval();
    }

    nextFn() {
        if (this.currentItemIndex < this.listItems.length - 1) {
            this.currentItemIndex++;
            this.updateCarousel();
        } else if (this.opt.loop) {
            this.currentItemIndex = 0;
            this.updateCarousel();
        }
    }

    prevFn() {
        if (this.currentItemIndex > 0) {
            this.currentItemIndex--;
            this.updateCarousel();
        } else if (this.opt.loop) {
            this.currentItemIndex = this.listItems.length - 1;
            this.updateCarousel();
        }
    }

    changeSlide(type) {
        const cb = this.changeSlideFn(type);

        if (this.intervalId) {
            this.updateTimer(cb.bind(this))
        } else {
            cb();
        }
    }

    changeSlideFn(type) {
        if (type === 'prev') {
            return this.prevFn.bind(this)
        }

        if (type === 'next') {
            return this.nextFn.bind(this)
        }
    }

    updateCarousel() {
        this.carouselList.innerHTML = '';
        const newItem = this.listItems[this.currentItemIndex].cloneNode(true);
        newItem.classList.add('fade_slide');
        this.carouselList.appendChild(newItem);

        requestAnimationFrame(() => {
            newItem.classList.add('show');
        });

        this.nextBtn.style.display = this.currentItemIndex === this.listItems.length - 1 && !this.opt.loop ? 'none' : 'inline-block';
        this.prevBtn.style.display = this.currentItemIndex === 0 && !this.opt.loop ? 'none' : 'inline-block';

    }
}
