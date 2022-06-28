export default class Storage {

    constructor() {

        // ローカルストレージを取得
        this.data = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE.KEY) || JSON.stringify(CONFIG.LOCAL_STORAGE.DATA));

    }

    set(prop, val) {

        if (prop && typeof val != 'undefined') {
            this.data[prop] = val;
        }

        // ローカルストレージを保存
        localStorage.setItem(CONFIG.LOCAL_STORAGE.KEY, JSON.stringify(this.data));

    }

}