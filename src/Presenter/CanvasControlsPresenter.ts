import { OptionsCache } from "../DataAccessors/OptionsCache";
import { Looper } from "../Model/Looper/Looper";
import { RootJoint } from "../Model/Rig/RootJoint/RootJoint";

export class CanvasControlsPresenter {
    public static onSpeedSliderChange(value: number, textElem: HTMLParagraphElement) {
        OptionsCache.frameSpeed = value;
        textElem.innerHTML = this.getPercentText();
    }

    public static getPercentText(): string {
        return "Speed: " + OptionsCache.frameSpeed + "%";
    }

    public static togglePause(pauseElem: HTMLButtonElement) {
        OptionsCache.paused = !OptionsCache.paused;
        if (OptionsCache.paused) {
            pauseElem.innerText = ">";
        } else {
            pauseElem.innerText = "| |";
        }
    }

    public static skipFrameBackward() {
        Looper.update(-1 / 20);
    }

    public static skipFrameForward() {
        Looper.update(1 / 20);
    }

    public static restartAnimationButtonPress() {
        RootJoint.resetAnimation();
    }

    public static updateShowJoints(value: boolean) {
        OptionsCache.showJoints = value;
    }
    public static updateShowBones(value: boolean) {
        OptionsCache.showBones = value;
    }
}
