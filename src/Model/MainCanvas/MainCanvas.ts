import { RootJoint } from "../Rig/RootJoint/RootJoint";
import { Rectangle } from "../Utils/Rectangle";
import { Vector } from "../Utils/Vector";
import { ScreenHandler } from "./ScreenHandler";

export class MainCanvasHandler {
    public static canvas: HTMLCanvasElement = document.createElement("canvas");
    public static ctx?: CanvasRenderingContext2D;

    public static setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;

        ScreenHandler.setScreen();

        this.canvas.width = ScreenHandler.screenSize.width;
        this.canvas.height = ScreenHandler.screenSize.height;
    }

    public static render(elapsedTime: number) {
        if (this.ctx) {
            this.clearCanvas(this.ctx);

            this.setTransform(this.ctx);

            RootJoint.updateAndRender(elapsedTime, this.ctx);

            this.drawFloor(this.ctx);
        }
    }

    private static setTransform(ctx: CanvasRenderingContext2D) {
        let screenPos: Vector = ScreenHandler.screenPos;

        ctx.resetTransform();
        ctx.translate(screenPos.x, screenPos.y);
    }

    private static clearCanvas(ctx: CanvasRenderingContext2D) {
        let screenPos: Vector = ScreenHandler.screenPos;
        let screenSize: Rectangle = ScreenHandler.screenSize;

        ctx.clearRect(-screenPos.x, -screenPos.y, screenSize.width, screenSize.height);
    }

    private static drawFloor(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#444444";
        ctx.fillRect(-100, 0, 200, 5);
        ctx.fillStyle = "#3a3a3a";
        ctx.fillRect(-2, -2, 4, 10);
    }
}
