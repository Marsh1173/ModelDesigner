import { Rectangle } from "../Utils/Rectangle";
import { Vector } from "../Utils/Vector";

export class ScreenHandler {
    public static screenPos: Vector = { x: 0, y: 0 };
    public static screenSize: Rectangle = { width: 0, height: 0 };

    public static setScreen() {
        this.screenSize.width = 1000;
        this.screenSize.height = 1000;

        this.setScreenSize();
    }

    public static startScreenResizeEventListener() {
        window.onresize = () => {
            this.setScreenSize();
        };
    }

    public static setScreenSize() {
        this.screenPos.x = window.innerWidth / 4 - 20;
        this.screenPos.y = window.innerHeight / 2 - 40;
    }
}
