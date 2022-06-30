export default class Utility {

    static getOption(obj) {

        const json = { json: JSON.stringify(obj) },
            option = { data: json, dataType: 'json', type: 'POST', url: STATE.counterUrl };

        return option;

    }

    static setDisplay() {

        let tag = '';

        // ゼロパディングのカウンタータグを生成
        const zeroNumArray = [...UT.zero(CONFIG.COUNTER.DIGIT, LOWER.counter.num)];
        zeroNumArray.forEach(val => tag += `<span>${val}</span>`);

        LOWER.counter.$display.innerHTML = tag;

    }

}