import { OptionsCache } from "../../DataAccessors/OptionsCache";
import { MainCanvasHandler } from "../MainCanvas/MainCanvas";

export class Looper {
    private static going: boolean = false;
    public static start() {
        this.going = true;
        window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    private static lastFrame: number = 0;
    private static loop(timestamp: number) {
        let elapsedTime = (timestamp - this.lastFrame) / 1000;
        if (elapsedTime > 2) {
            elapsedTime = 1 / 60;
        }
        elapsedTime = (elapsedTime / 100) * OptionsCache.frameSpeed;
        if (OptionsCache.paused) elapsedTime = 0;

        this.lastFrame = timestamp;
        this.update(elapsedTime);
        if (this.going) {
            window.requestAnimationFrame((timestamp) => this.loop(timestamp));
        }
    }

    public static update(elapsedTime: number) {
        MainCanvasHandler.render(elapsedTime);
    }
}
