/**
 * @file the main entry point of the axiom-touch ui
 */
"use strict";


// create the dom for the sliders
let description = {
    "ISO": [100, 200, 800],
    "SHUTTER": ["1/1000", "1/100", "1/50", "1/25", "1/10", "1/5", "1/2", "1'"],
    "HDR": ["OFF", "ON"],
    "FPS": ["23.976", "24", "25", "30", "60", "120"],
};

function create_sliders(description) {
    return Object.keys(description).map(key => `
        <!-- Slider main container -->
        <div class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                ${
        description[key].map(val => `
                        <div class="swiper-slide">${key}<br>${val}</div>
                    `).reduce((a, b) => a+b)
        }
            </div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    `).reduce((a, b) => a + b);
}

document.querySelector("main").innerHTML = create_sliders(description);


// make them sliders
let Swiper = require('../lib/swiper/dist/js/swiper');
let test = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
    },
});
