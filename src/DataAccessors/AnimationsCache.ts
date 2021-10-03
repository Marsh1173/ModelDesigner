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

    public static attemptChangeSelectedAnimationName(newName: string): boolean {
        if (newName == "") {
            window.alert("Must input a valid name");
            return false;
        }

        for (let i: number = 0; i < this.animations.length; i++) {
            if (this.animations[i].animationName === newName && i != this.selectedAnimationIndex) {
                window.alert("You can't have to animations with the same name!");
                return false;
            }
        }
        this.animations[this.selectedAnimationIndex].animationName = newName;
        return true;
    }

    public static processAnimationSelectChange() {
        while (this.selectedAnimationIndex >= this.animations.length) {
            this.selectedAnimationIndex--;
        }
        if (this.animations.length <= 0) {
            this.animations = StartAnimations;
            this.selectedAnimationIndex = 0;
        }

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
