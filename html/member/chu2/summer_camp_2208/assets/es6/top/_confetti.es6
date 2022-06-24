import * as PIXI from 'pixi.js';

export default class Confetti {

    constructor() {

        this.init();

    }

    init() {

        this.$target = document.getElementById('main');
        this.cw = 1280;
        this.ch = 830;
        this.createNum = 40;
        this.color = [0xffffff, 0xff2a5c, 0xe4ff2a, 0xa62aff, 0x3df2da, 0xff2a9c, 0x2aff9f];
        this.xAdd = [];
        this.graphics = [];
        this.scale = [];

        this.createPixi();
        this.render();

    }

    createPixi() {

        this.app = new PIXI.Application({ width: this.cw, height: this.ch, transparent: true });
        this.$target.insertBefore(this.app.view, this.$target.firstChild);

        for (let i = 0; i < this.createNum; i++) {

            const colornum = i % this.color.length,
                x = Math.floor(Math.random() * this.cw) + 10,
                y = Math.floor(Math.random() * this.ch);

            this.scale.push(((Math.floor(Math.random() * 4) + 8) / 10));
            this.xAdd.push(i % 2 === 0 ? 1 : -1);
            this.graphics.push(new PIXI.Graphics().beginFill(this.color[colornum], 1).drawRect(-5, -5, 15, 10));
            this.graphics[i].position.x = x;
            this.graphics[i].position.y = y;
            this.graphics[i].scale.x = this.scale[i];
            this.graphics[i].scale.y = this.scale[i];
            this.graphics[i].skew.y = i % 10 * 0.1;
            this.graphics[i].rotation = 0.1 + ((i % 5) * 0.1);
            this.app.stage.addChild(this.graphics[i]);

        }

    }

    render() {

        this.app.ticker.add(delta => this.update(delta));

    }

    update(delta) {

        const skew = [0.02, 0.04, 0.06, 0.08, 0.1],
            xPlus = [0.5, 0.75, 1, 1.2, 1.5];

        for (let i = 0; i < this.createNum; i++) {

            let x, y, colornum = i % this.color.length;

            this.graphics[i].clear();
            this.graphics[i].beginFill(this.color[colornum], 1).drawRect(-5, -5, 15, 10);

            if (this.graphics[i].y > this.ch) {
                x = Math.floor(Math.random() * this.cw) + 10;
                y = -10;
            } else {
                y = this.graphics[i].y + 4 + ((i % 5) * 0.1);
            }

            if (this.graphics[i].x > this.cw - 10) {
                this.xAdd[i] = -1;
            } else if (this.graphics[i].x < 10) {
                this.xAdd[i] = 1;
            }

            if (this.xAdd[i] === -1) {
                x = this.graphics[i].x - xPlus[i % 5];
            } else {
                x = this.graphics[i].x + xPlus[i % 5];
            }

            this.graphics[i].scale.x = this.scale[i];
            this.graphics[i].scale.y = this.scale[i];
            this.graphics[i].position.x = x;
            this.graphics[i].position.y = y;
            this.graphics[i].skew.y += i % 2 === 0 ? skew[i % 5] : skew[i % 5] * -1;
            this.graphics[i].rotation += i % 2 === 0 ? (0.01 + ((i % 5) * 0.01)) : (0.01 + ((i % 5) * -0.01));

        }

    }

}