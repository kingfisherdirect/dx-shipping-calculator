'use strict';

window.onload = function() {
    const submitBtn = document.querySelector('.submit-btn');
    const inputs = {
        height: document.querySelector('input.height'),
        length: document.querySelector('input.length'),
        depth: document.querySelector('input.depth'),
    }
    const outputs = {
        volume: document.querySelector('.volume-output'),
        beforeDiscount: document.querySelector('.before-discount-output'),
        discount: document.querySelector('.discount-output'),
        container: document.querySelector('.answer-output')
    }

    const calcVolume = (height = 0, length = 0, depth = 0) => height * length * depth / 5000;

    const calcBeforeDiscount = (volume) => {
        let beforeDiscount = 0;
        if (volume <= 20) {
            beforeDiscount = 10.50;
        } else {
            let answer1, answer2;
            answer1 = volume - 20;
            answer2 = answer1 * .37;
            beforeDiscount = answer2 + 10.50;
        }
        return beforeDiscount;
    }

    const calcDiscount = (beforeDiscount) => beforeDiscount * .55;

    const calcAnswers = (height, length, depth) => {
        const volume = calcVolume(height, length, depth);
        const beforeDiscount = calcBeforeDiscount(volume);
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
        // check to see if all inputs are not empty
        for (const key in inputs) {
            if (inputs[key].value === "") {
                return;
            }
        }

        const answers = calcAnswers(inputs.height.value, inputs.length.value, inputs.depth.value);
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
