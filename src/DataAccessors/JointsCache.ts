import { Joint } from "../Model/Rig/Joint/Joint";
import { RootJoint } from "../Model/Rig/RootJoint/RootJoint";

export class JointsCache {
    private static jointsListObservers: JointsListObserver[] = [];
    private static jointsSelectObservers: JointsSelectObserver[] = [];

    public static selectedJoint: Joint | undefined = undefined;

    public static getJointsHierarchy(): { name: string; depth: number }[] {
        function recursiveGetJointHierarchy(joint: Joint, resultArray: { name: string; depth: number }[], depth: number) {
            resultArray.push({ name: joint.name, depth });
            joint.joints.forEach((childJoint) => {
                recursiveGetJointHierarchy(childJoint, resultArray, depth + 1);
            });
        }

        let results: { name: string; depth: number }[] = [];
        RootJoint.joints.forEach((joint) => {
            recursiveGetJointHierarchy(joint, results, 0);
        });
        return results;
    }

    public static getJointByName(name: string): Joint | undefined {
        function recursiveGetJoint(joint: Joint, name: string): Joint | undefined {
            if (joint.name == name) return joint;
            for (let j: number = 0; j < joint.joints.length; j++) {
                let result: Joint | undefined = recursiveGetJoint(joint.joints[j], name);
                if (result) {
                    return result;
                }
            }
            return undefined;
        }

        for (let i: number = 0; i < RootJoint.joints.length; i++) {
            let result: Joint | undefined = recursiveGetJoint(RootJoint.joints[i], name);
            if (result) {
                return result;
            }
        }

        return undefined;
    }

    public static appendJointsListObservers(observer: JointsListObserver) {
        this.jointsListObservers.push(observer);
    }
    public static processJointsListChange() {
        this.jointsListObservers.forEach((observer) => {
            observer.onJointsListChange();
        });
    }

    public static appendJointsSelectObservers(observer: JointsSelectObserver) {
        this.jointsSelectObservers.push(observer);
    }

    public static attemptChangeSelectedJointName(newName: string): boolean {
        if (newName == "") {
            window.alert("Must input a valid name");
            return false;
        }
        return true;

        // for (let i: number = 0; i < this.animations.length; i++) {
        //     if (this.animations[i].animationName === newName && i != this.selectedAnimationIndex) {
        //         window.alert("You can't have to animations with the same name!");
        //         return false;
        //     }
        // }
        // this.animations[this.selectedAnimationIndex].animationName = newName;
        // return true;
    }

    public static processJointSelectChange() {
        if (this.selectedJoint && !this.getJointByName(this.selectedJoint.name)) {
            this.selectedJoint = undefined;
        }

        this.jointsSelectObservers.forEach((observer) => {
            observer.onJointsSelectChange();
        });
    }
}

export interface JointsListObserver {
    onJointsListChange: () => void;
}
export interface JointsSelectObserver {
    onJointsSelectChange: () => void;
}
