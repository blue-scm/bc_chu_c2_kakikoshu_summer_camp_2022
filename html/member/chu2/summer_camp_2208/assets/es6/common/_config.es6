export const Config = {
    COUNTER: {
        ADDITION: 1,
        BTN_ID: 1,
        DIGIT: 5,
        TEST: 'assets/json/test.json',
        THM_ID: 'count_c',
        URL: 'https://library.benesse.ne.jp/bbsui/uiservice/',
    },

    LOCAL_STORAGE: {
        DATA: {
            settingDate: [],
            state: {
                welcome: false,
                guideTap: false,
                calendar: null,
                month: 'july',
                done: 0,
                day1: false,
                day2: false,
                day3: false,
                day4: false,
                day5: false,
                day6: false,
                day7: false,
                day8: false,
                day9: false,
                day10: false,
            },
            trump: { date: new Date(), count: 0 },
            number: { date: new Date(), count: 0 },
        },
        KEY: 'member/chu2/summer_camp_2208/index',
    },

    RECOMMEND_DATE: {
        july: ['2022/7/18', '2022/7/19', '2022/7/22', '2022/7/24', '2022/7/25', '2022/7/26', '2022/7/28', '2022/7/29', '2022/8/7', '2022/8/8'],
        august: ['2022/8/1', '2022/8/2', '2022/8/3', '2022/8/4', '2022/8/5', '2022/8/6', '2022/8/8', '2022/8/9', '2022/8/20', '2022/8/21'],
    },

    USE_PARAM: true,
};
