class Carousel {
    listItems = [];
    #carouselId = null;
    currentItemIndex = 0;
    carоuselList = null;
    nextBtn = null;
    prevBtn = null;
    opt = {};
    intervalId = null;


    constructor(id, opt = {}) {
        this.#carouselId = id;
        this.opt = opt;
        this.init();
    }

    
    init() {
        this.carouselList = document.querySelector(".carousel_list");
        this.listItems = document.querySelectorAll(".list_item");
        this.carouselList.innerHTML = this.listItems[this.currentItemIndex].innerHTML;
        
        this.nextBtn = document.createElement('button');
        this.nextBtn.innerHTML = "Next";
        this.prevBtn = document.createElement('button');
        this.prevBtn.innerHTML = "Prev";
        this.prevBtn.style.display = 'none';

        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        document.body.appendChild(this.nextBtn);
        document.body.appendChild(this.prevBtn);

        if (this.opt.autoPlay){
            this.intervalId = setInterval(() => {this.nextSlide()}, this.opt.autoPlay);
        }

    }


    getId() {
        return this.#carouselId;
    }

    nextSlide() {
            
            if (this.currentItemIndex < this.listItems.length - 1) {
                this.currentItemIndex++;
                this.updateCarousel();
            } else if (this.opt.loop) {
                this.currentItemIndex = 0;
                this.updateCarousel();
            }
    }

    prevSlide() {
        
            if (this.currentItemIndex > 0) {
                this.currentItemIndex--;
                this.updateCarousel();
            };
    }

    updateCarousel() {
        this.carouselList.innerHTML = this.listItems[this.currentItemIndex].innerHTML;

        this.nextBtn.style.display = this.currentItemIndex === this.listItems.length - 1 && !this.opt.loop ? 'none' : 'inline-block';
        this.prevBtn.style.display = this.currentItemIndex === 0 ? 'none' : 'inline-block';

    }
}

const carousel = new Carousel('first-carousel', {autoPlay: 2000, loop: true});
console.log(carousel.getId());
