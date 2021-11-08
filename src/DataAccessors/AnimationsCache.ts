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

    /*public static checkIfAnimationNameAlreadyExists(name: string, ifNewAnimation: boolean = false): boolean {
        for (let i: number = 0; i < this.animations.length; i++) {
            if (this.animations[i].animationName === name && ((i != this.selectedAnimationIndex) == ifNewAnimation)) {
                return false;
            }
        }
        return true;
    }*/

    public static processJointRename(oldName: string, newName: string) {
        this.animations.forEach((animation) => {
            animation.jointAnimations.forEach((jointAnimation) => {
                if (jointAnimation.jointName == oldName) {
                    jointAnimation.jointName = newName;
                }
            });
        });

        AnimationsCache.processAnimationSelectChange();
    }
    public static processJointDelete(name: string) {
        this.animations.forEach((animation) => {
            for (let i: number = 0; i < animation.jointAnimations.length; i++) {
                if (animation.jointAnimations[i].jointName == name) {
                    animation.jointAnimations.splice(i, 1);
                    i--;
                }
            }
        });

        AnimationsCache.processAnimationSelectChange();
    }
}

export interface AnimationListObserver {
    onAnimationListChange: () => void;
}
export interface AnimationSelectObserver {
    onAnimationSelectChange: () => void;
}
