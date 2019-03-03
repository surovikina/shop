// Mobile menu

(function () {

    let hamburger = document.getElementById("header-button");
    let header = document.querySelector(".page-header");

    function addClass() {
        if (header.classList.contains("show-main-nav")) {
            header.classList.remove("show-main-nav");
            document.body.classList.remove('no-scroll');
        } else {
            header.classList.add("show-main-nav");
            document.body.classList.add('no-scroll');
        }
    }

    hamburger.addEventListener("click", addClass);

})();

// Search icon on the main page

(function () {
    if (typeof (document.querySelector(".start-page")) != 'undefined' && document.querySelector(".start-page") != null) {

        if (screen.width < '1024') {

            let searchIcon = document.querySelector('.search');
            let buttonSubmit = document.querySelector('.search__submit');

            // buttonSubmit.disabled = true;


            function iconClickListener(event) {

                if (event.target.classList.contains('search__submit')) {
                    event.preventDefault();
                }

                searchIcon.classList.add('active');
                console.log(buttonSubmit);

            }

            searchIcon.addEventListener('click', iconClickListener)
        }

    }
})();


// Menu for filters

(function () {
    if (typeof (document.querySelector(".page-catalog")) != 'undefined' && document.querySelector(".page-catalog") != null) {

        let filterBlock = document.querySelector('.page-catalog .page-header__extra-inner');

        if (screen.width < '1024') {

            function filterClickHandler(event) {
                let target = event.target;

                if (filterBlock.classList.contains("show-filter-list") && target.classList.contains('filter-button')) {
                    filterBlock.classList.remove('show-filter-list');
                    document.body.classList.remove('no-scroll');
                } else {
                    filterBlock.classList.add("show-filter-list");
                    document.body.classList.add('no-scroll');
                }
            }

            filterBlock.addEventListener('click', filterClickHandler);
        }

// Filter selection

        let filters = document.querySelectorAll('.filter-list .filter-list__item');
        let mobileList = document.querySelector('.mob-filter-list');

        function selectFilter(event) {
            let target = event.target;
            let curentTarget = event.currentTarget;
            let activeButton = this.querySelector('.sub-filters .selected');

            if (activeButton !== null) {
                activeButton.classList.remove('selected');
            }

            if (target.classList.contains('disabled')) {
                curentTarget.classList.remove('chosen')
            } else if (target.classList.contains('sub-filters__item')) {
                target.classList.add('selected');
                curentTarget.classList.add('chosen');
                mobileList.innerHTML = '';

                if (screen.width < '1024') {
                    filters.forEach(function (item) {

                        if (item.classList.contains('chosen')) {
                            let menuItemNew = item.querySelector('.selected').innerHTML;

                            let mobLink = document.createElement('li');
                            mobLink.classList = 'mob-filter-list__item';
                            mobLink.classList.add('brand-color');
                            mobLink.innerHTML = menuItemNew + ',';

                            mobileList.appendChild(mobLink);

                        } else {
                            let menuItemNew = item.querySelector('a').innerHTML;
                            let mobLink = document.createElement('li');
                            mobLink.classList = 'mob-filter-list__item';
                            mobLink.innerHTML = menuItemNew + ',';

                            mobileList.appendChild(mobLink);
                        }
                    });
                } else {
                    console.log('desktop width')
                }
            }
        }

        for (let i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', selectFilter)
        }

    }
})();

// Carousel Start page

(function () {
    if (typeof (document.querySelector(".slider__wrapper")) != 'undefined' && document.querySelector(".slider__wrapper") != null) {

        let wrapper = document.querySelector(".slider__wrapper");
        let sliders = wrapper.querySelectorAll('.slider__item');
        let sliderWrapperPagination = document.querySelector('.slider__pagination');
        let nextBtn = document.querySelector('.slider__arrow-next');
        let prevBtn = document.querySelector('.slider__arrow-prev');
        let activeLink = 0;
        let maxSlides = sliders.length - 1;
        let loopCounter = 1;

        function createSliderBullet() {

            for (let i = 0; i < sliders.length; i++) {
                let bullet = document.createElement('a');
                bullet.className = ('slider__pagination-bullet');
                bullet.setAttribute('data-slide', i);

                sliderWrapperPagination.appendChild(bullet);
            }
        }

        createSliderBullet();

        let links = document.querySelectorAll(".slider__pagination-bullet");

        function addActiveClassFirs() {

            links[activeLink].classList.add("active");

        }

        function removeActiveLinks() {
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove("active");
            }
        }

        function moveSlider(slideIndexNext) {
            activeLink = typeof slideIndexNext !== "undefined" ? slideIndexNext : loopCounter;
            wrapper.style.left = '-' + activeLink * 100 + '%';

            removeActiveLinks();

            links[activeLink].classList.add('active');

            if (loopCounter >= maxSlides) {
                loopCounter = 0;
            } else {
                loopCounter = loopCounter + 1;
            }
        }

        nextBtn.addEventListener('click', function () {

            window.clearTimeout(timerId);

            removeActiveLinks();

            let nexSlide = activeLink++ >= maxSlides ? 0 : activeLink++;
            moveSlider(nexSlide);

            timerId = window.setInterval(moveSlider, 10000);
        });

        prevBtn.addEventListener('click', function () {

            window.clearTimeout(timerId);

            removeActiveLinks();

            let nexSlide = activeLink-- <= 0 ? maxSlides : activeLink--;

            moveSlider(nexSlide);

            timerId = window.setInterval(moveSlider, 10000);
        });

        sliderWrapperPagination.addEventListener('click', function (event) {
            let target = event.target;
            if (!target.classList.contains('slider__pagination-bullet') || target.classList.contains('active')) {
                return false;
            }

            let nexSlide = target.getAttribute('data-slide');

            window.clearTimeout(timerId);

            moveSlider(nexSlide);

            timerId = window.setInterval(moveSlider, 10000);
        });

        addActiveClassFirs();

        let timerId = window.setInterval(moveSlider, 10000);


        // document.addEventListener("DOMContentLoaded", addActiveClassFirs);

    }
})();


// Select the size and color on the product page

(function () {
    if (typeof (document.querySelector(".item-options")) != 'undefined' && document.querySelector(".item-options") != null) {

        let sizeButtons = document.getElementById('size-options');
        let colorButtons = document.getElementById('color-options');

        function buttonClickHandler(event) {
            let target = event.target;

            if (!target.classList.contains('button')) {
                return false
            }

            let activeButton = this.querySelector('.checked');
            activeButton.classList.remove('checked');

            event.target.classList.add('checked');
        }

        sizeButtons.addEventListener('click', buttonClickHandler);

        colorButtons.addEventListener('click', buttonClickHandler);
    }
})();


// Adding products to the cart

(function () {
    let costInBag = document.querySelector('.shopping-bag__cost');
    let quantityInBag = document.querySelector('.shopping-bag__quantity');
    let byButton = document.querySelector('.item-section__button .button');
    let totalQuantityBag = 0;
    let totalCost = 0;

    function randomPrice(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    function addToCard() {
        totalQuantityBag++;
        totalCost += randomPrice(250, 400);
        localStorage.clear();
        localStorage.setItem('quantityInBag', totalQuantityBag);
        localStorage.setItem('costInBag', totalCost);

        let quantityLocalStorage = localStorage.getItem('quantityInBag');
        let totalCostLocalStorage = localStorage.getItem('costInBag');
        quantityInBag.innerHTML = `(${quantityLocalStorage})`;
        costInBag.innerHTML = `Bag &#163;${totalCostLocalStorage}`;
    }

    if (byButton !== null) {
        byButton.addEventListener('click', addToCard);
    }

})();

// Remove items from the cart

(function () {
    if (typeof (document.querySelector(".page-bag")) != 'undefined' && document.querySelector(".page-bag") != null) {

        let byButton = document.querySelector('.buy-button');
        let emptyBagButton = document.querySelector('.empty-bag');
        let cardsContainer = document.querySelector('.cards-container__inner');
        let cards = document.querySelector('.cards-container__inner').querySelectorAll('.card');
        let quantity = cards.length;
        let costInBag = document.querySelector('.shopping-bag__cost');
        let quantityInBag = document.querySelector('.shopping-bag__quantity');
        let totalCost = document.querySelector('.total-cost__sum');

        function smoothScroll() {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothScroll);
                window.scrollTo(0, currentScroll - (currentScroll / 10));
            }
        }

        function addTextNotification(text) {
            let textNotification = document.createElement('p');
            textNotification.className = 'notification-bag';
            textNotification.innerHTML = text;
            document.querySelector('.cards-container__inner').appendChild(textNotification);
        }

        function clearBag() {
            costInBag.innerHTML = 'Bag';
            quantityInBag.innerHTML = '(0)';
            totalCost.innerHTML = '&#163;0'
        }

        function disabledButton() {
            byButton.setAttribute('disabled', true);
            byButton.classList.add('disabled');
            emptyBagButton.classList.add('disabled');
        }

        let removeItems = function (event) {
            for (let i = 0; i < quantity; i++) {
                cards[i].remove();
            }

            addTextNotification(event.target.myParam);
            disabledButton();
            smoothScroll();
            clearBag();

            localStorage.clear();

            byButton.removeEventListener('click', removeItems);
            emptyBagButton.removeEventListener('click', removeItems);
        };

        function removeOneItem(event) {
            let target = event.target;

            if (target.classList.contains('button-delete')) {
                target.closest('.card').remove();

                let costInBag = localStorage.getItem('costInBag');
                let quantityInBag = localStorage.getItem('quantityInBag');
                let newQuantityInBag = quantityInBag - 1;
                let newCostInBag = costInBag - 10;

                localStorage['quantityInBag'] = `${newQuantityInBag}`;
                localStorage['costInBag'] = `${newCostInBag}`;

                document.querySelector('.shopping-bag__cost').innerHTML = `Bag &#163;${newCostInBag}`;
                document.querySelector('.shopping-bag__quantity').innerHTML = `(${newQuantityInBag})`;

                if (document.querySelector('.cards-container__inner').querySelectorAll('.card').length === 0) {

                    addTextNotification('Your shopping bag is empty. Use Catalog to add new items');
                    disabledButton();
                    smoothScroll();
                }
            }
        }

        cardsContainer.addEventListener('click', removeOneItem);
        byButton.addEventListener('click', removeItems);
        byButton.myParam = 'Thank you for your purchase';

        emptyBagButton.addEventListener('click', removeItems);
        emptyBagButton.myParam = 'Your shopping bag is empty. Use Catalog to add new items';
    }
})();

// Thumbnail

(function () {
    if (typeof (document.querySelector(".page-item")) != 'undefined' && document.querySelector(".page-item") != null) {

        let gallery = document.querySelector('.gallery');
        let thumbs = gallery.querySelector('.gallery__thumbs');
        let bigImages = gallery.querySelectorAll('.gallery__top .slide');


        function switchPhoto(event) {
            let target = event.target;
            let parent = target.parentElement;
            let index;

            this.querySelector('.selected').classList.remove('selected');

            if (target.classList.contains('slide')) {
                index = target.getAttribute('data-item');
                target.classList.add('selected');

            } else if (parent.classList.contains('slide')) {
                index = parent.getAttribute('data-item');
                parent.classList.add('selected');
            }

            bigImages.forEach(function (item) {
                item.classList.remove('selected')
            });

            bigImages[index].classList.add('selected');
        }

        thumbs.addEventListener('click', switchPhoto);
    }
})();

// function Slider(element) {
//
//     this.el = document.querySelector(element);
//     this.init();
// }
//
// Slider.prototype = {
//     init: function () {
//         this.links = this.el.querySelectorAll("#slider-nav a");
//         this.wrapper = this.el.querySelector(".slider__wrapper");
//         this.nextBtn = this.el.querySelector("#next");
//         this.prevBtn = this.el.querySelector("#prev");
//         this.navigate();
//     },
//     navigate: function () {
//
//         var self = this;
//
//         for (var i = 0; i < this.links.length; ++i) {
//             var link = this.links[i];
//             link.addEventListener("click", function (e) {
//                 self.slide(this);
//             });
//         }
//
//         self.prevBtn.style.display = 'none';
//
//         self.nextBtn.addEventListener('click', function (e) {
//             clearTimeout(timeOutId);
//
//             var currentSlideNumber = document.querySelector('#slider-nav a.active').getAttribute("data-slide");
//             var nextSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) + 1) + '"]');
//
//             nextSlide.click();
//         }, false);
//
//         self.prevBtn.addEventListener('click', function (e) {
//             var currentSlideNumber = document.querySelector('#slider-nav a.active').getAttribute("data-slide");
//             var prevSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) - 1) + '"]');
//
//             prevSlide.click();
//         }, false);
//
//         self.slideShow(9000);
//
//
//     },
//
//     slide: function (element) {
//         this.setCurrentLink(element);
//
//         var index = parseInt(element.getAttribute("data-slide"), 10) + 1;
//         var currentSlide = this.el.querySelector(".slider__item:nth-child(" + index + ")");
//
//         this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
//
//         if (index < this.links.length)
//             this.nextBtn.style.display = 'block';
//         else if (index == this.links.length)
//             this.nextBtn.style.display = 'none';
//
//         if (index > 1)
//             this.prevBtn.style.display = 'block';
//         else if (index == 1)
//             this.prevBtn.style.display = 'none';
//     },
//
//     setCurrentLink: function (link) {
//         var parent = link.parentNode;
//         var a = parent.querySelectorAll("a");
//
//         link.className = "active";
//         this.currentElement = link;
//
//         for (var j = 0; j < a.length; ++j) {
//             var cur = a[j];
//             if (cur !== link) {
//                 cur.className = "";
//             }
//         }
//     },
//     slideShow: function (timeout) {
//         var sliderCount = this.links.length;
//         var self = this;
//
//         this.slideCycle = setInterval(function () {
//             var currentSlideNumber = document.querySelector('#slider-nav a.active').getAttribute("data-slide");
//             var slideId = parseInt(currentSlideNumber, 10) + 1;
//             self.slide(document.querySelector('[data-slide="' + (sliderCount == slideId ? 0 : slideId) + '"]'));
//         }, timeout);
//
//         console.log('dfadfa', timeOutId)
//     }
//
// };
//
// document.addEventListener( "DOMContentLoaded", function() {
//     var aSlider = new Slider( ".slider-section" );
// });









