import { AnimationInterface } from "../Model/Animation/AnimationInterface";
import { StartAnimations } from "./StartAnimations";

export class AnimationsCache {
    public static animations: AnimationInterface[] = StartAnimations;
    public static selectedAnimationIndex: number = 0;

    private static animationListObservers: AnimationListObserver[] = [];
    private static animationSelectObservers: AnimationSelectObserver[] = [];

    public static appendAnimationListObservers(observer: AnimationListObserver) {
        this.animationListObservers.push(observer);
    }
    public static appendAnimationSelectObservers(observer: AnimationSelectObserver) {
        this.animationSelectObservers.push(observer);
    }

    public static processAnimationListChange() {
        this.animationListObservers.forEach((observer) => {
            observer.onAnimationListChange();
        });
    }

    public static processAnimationSelectChange() {
        this.animationSelectObservers.forEach((observer) => {
            observer.onAnimationSelectChange();
        });
    }
}

export interface AnimationListObserver {
    onAnimationListChange: () => void;
}
export interface AnimationSelectObserver {
    onAnimationSelectChange: () => void;
}
