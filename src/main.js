/**
 * @file the main entry point of the axiom-touch ui
 */
"use strict";


// create the dom for the sliders
let description = {
    // base image sensor settings
    "iso": [200, 400, 800],
    "shutter": ["1/10", "1/13", "1/15", "1/20", "1/25", "1/30", "1/40", "1/50", "1/60", "1/80", "1/100", "1/125", "1/160", "1/200", "1/250", "1/320", "1/400"],
    "fps": ["23.976", "24", "25", "30", "60", "120"],

    // more advanced settings
    "hdr": ["off", "on"],
    "assist": ["off", "focus", "exposure"],
    "whitebalance": Array.apply(null, {length: 11}).map((_, i) => 3000 + i * 1000 / 5).map(k => `${k}K`),

};

function k2rgb(k) {
    let x = (parseInt(k.replace(/[^0-9]/g, "")) - 3000) / 2000;
    let color = {
        r: x < .5 ? 1 : 1 - x * 2 + 1,
        g: -Math.abs(x -.5) * 2 + 1,
        b: x > .5 ? 1 : x * 2
    };


    return `rgb(${~~(color.r * 90) + 150}, ${~~(color.g * 90) + 150}, ${~~(color.b * 90) + 150})`;
}

function create_sliders(description) {
    return Object.keys(description).map(key => `
        <!-- Slider main container -->
        <div class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="scale-name">${key}</div>
            <div class="swiper-wrapper">
                <!-- Slides -->
                ${
        description[key].map(val => `
                        <div class="swiper-slide ${(val + "").replace(/[^a-z]/gi, "")} ${(key + "").replace(/[^a-z]/gi, "")}" 
                            ${(val + "").match(/[0-9]+K/) ? `style="background-color: ${k2rgb(val)}"` : ``}>
                            ${val}
                        </div>
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
    freeMode: true,
    freeModeSticky: true,
    freeModeMomentumBounceRatio: 3,
    freeModeMinimumVelocity: 0.3,
    freeModeMomentumVelocityRatio: 1,
    freeModeMomentumRatio: .5,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
    },
});
