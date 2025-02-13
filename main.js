const carouselList = document.querySelector(".carousel_list");
const listItem = document.querySelectorAll(".list_item");
carouselList.innerHTML = "";
carouselList.appendChild(listItem[0]);

let currentItemIndex = 0;

const nextBtn = document.createElement('button');
nextBtn.innerHTML = "Next";

const prevBtn = document.createElement('button');
prevBtn.innerHTML = "Prev";
prevBtn.style.display = 'none';

nextBtn.addEventListener('click', () => {
    carouselList.innerHTML = "";
    currentItemIndex += 1;
    carouselList.appendChild(listItem[currentItemIndex]);

    prevBtn.style.display = 'inline-block';
    
    if (currentItemIndex === listItem.length - 1) {
        nextBtn.style.display = 'none';
    }
})

document.body.appendChild(nextBtn);


prevBtn.addEventListener('click', () => {

    carouselList.innerHTML = "";
    currentItemIndex -= 1;
    carouselList.appendChild(listItem[currentItemIndex]);

    nextBtn.style.display = 'inline-block';

    if (currentItemIndex === 0) {
        prevBtn.style.display = 'none';
    }
});

document.body.insertBefore(prevBtn, document.body.firstChild);

