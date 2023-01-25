'use strict';

window.onload = function() {
    const submitBtn = document.querySelector('.submit-btn');
    const inputs = {
        country: document.querySelector('select.country'),
        height: document.querySelector('input.height'),
        length: document.querySelector('input.length'),
        depth: document.querySelector('input.depth')
    };
    const outputs = {
        volume: document.querySelector('.volume-output'),
        beforeDiscount: document.querySelector('.before-discount-output'),
        discount: document.querySelector('.discount-output'),
        container: document.querySelector('.answer-output')
    };
    const coefficients1 = {
        eng_wales: 10.5,
        scotland: 13.5,
        northern_ireland: 47,
        eire: 54,
        coast_islands: 65
    };
    const coefficients2 = {
        eng_wales: .37,
        scotland: .37,
        northern_ireland: .64,
        eire: .72,
        coast_islands: .8
    };

    const calcVolume = (height = 0, length = 0, depth = 0) => height * length * depth / 5000;

    const calcBeforeDiscount = (volume,  coefficient1,  coefficient2) => {
        let beforeDiscount = 0;
        if (volume <= 20) {
            beforeDiscount = coefficient1;
        } else {
            let answer1, answer2;
            answer1 = volume - 20;
            answer2 = answer1 * coefficient2;
            beforeDiscount = answer2 +  coefficient1;
        }
        return beforeDiscount;
    }

    const calcDiscount = (beforeDiscount) => beforeDiscount * .55;

    const calcAnswers = (height, length, depth, country) => {
        const volume = calcVolume(height, length, depth);
        const coefficient1 = coefficients1[country];
        const coefficient2 = coefficients2[country];
        const beforeDiscount = calcBeforeDiscount(volume, coefficient1, coefficient2);
        const discount = calcDiscount(beforeDiscount);

        return {
            volume,
            beforeDiscount,
            discount
        };
    };

    const outputAnswers = (answers) => {
        outputs.volume.innerText = answers.volume;
        outputs.beforeDiscount.innerText = '£' + answers.beforeDiscount;
        outputs.discount.innerText = '£' + answers.discount;
    }

    const updateOuput = () => {
        const { country, height, length, depth } = inputs;
        // check to see if drop down is selected
        if (country.value === 'please_select') {
            return;
        }
        // check to see if all inputs contain values
        for (const key in inputs) {
            if (inputs[key].value === "") {
                return;
            }
        }

        // set country, Isle of man & Channel Islands & Scilly Islands are grouped
        let countryValue = country.value;
        if (country.value === 'isle_of_man' || country.value === 'channel_islands' || country.value === 'scilly_islands') {
            countryValue = 'coast_islands';
        } else if (country.value === 'england' || country.value === 'wales') {
            countryValue = 'eng_wales';
        }

        const answers = calcAnswers(height.value, length.value, depth.value, countryValue);
        outputAnswers(answers);
        outputs.container.classList.add('active');
    }

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateOuput();
    });

    for (const key in inputs) {
        inputs[key].addEventListener('input', updateOuput);
    }
}
