export default class Minben {
    constructor() {}

    send(state) {
        const map = {
            image: [
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day1.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day2.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day3.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day4.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day5.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day6.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day7.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day8.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day9.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/day10.png",
                "https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/complete.png",
            ],
            image_mini: ["https://townak.benesse.ne.jp/rel/A/sp_338/com_kikaku/chu2/summer_camp_2208/mini.png"],
        };

        //送信するオブジェクトのインターフェイスはこちらに沿ってください
        const kv = {
            start_date: "2022/7/18",
            end_date: "2022/7/21",
            image: map.image[state],
            image_mini: map.image_mini[0],
        };

        const onError = () => {
            //任意のエラー処理
        };

        if (window.kvsClient) {
            window.kvsClient.post(kv, onError);
        }
    }
}
