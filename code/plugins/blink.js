// https://github.com/marklovers/kaboom-util/blob/master/source/plugins/blink.js
export function blinkComp() {
    return {
        blink(time) {
            return {
                id: "blink",
                require: [],
                add() {
                    if (this.loopBlink) this.loopBlink();

                    this.loopBlink = loop(time, (time) => {
                        if (!time) time = 0.3;

                        this.hidden = !this.hidden;
                    });
                }
            };
        }
    };
};

