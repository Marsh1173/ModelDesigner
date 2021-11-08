import { Joint } from "../Model/Rig/Joint/Joint";
import { RootJoint } from "../Model/Rig/RootJoint/RootJoint";
import { AnimationsCache } from "./AnimationsCache";

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
        if (RootJoint.joint) recursiveGetJointHierarchy(RootJoint.joint, results, 0);
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

        if (RootJoint.joint) {
            let result: Joint | undefined = recursiveGetJoint(RootJoint.joint, name);
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

    public static processJointSelectChange() {
        this.jointsSelectObservers.forEach((observer) => {
            observer.onJointsSelectChange();
        });
    }

    public static attemptChangeSelectedJointName(newName: string): boolean {
        if (newName == "") {
            window.alert("Must input a valid name");
            return false;
        }

        if (this.checkIfJointNameAlreadyExists(newName)) {
            window.alert("You can't have to animations with the same name!");
            return false;
        }

        if (this.selectedJoint) {
            AnimationsCache.processJointRename(this.selectedJoint.name, newName);
            this.selectedJoint.name = newName;
        }

        return true;
    }

    public static checkIfJointNameAlreadyExists(name: string): boolean {
        if (RootJoint.joint && this.recursiveNameFind(name, RootJoint.joint)) return true;
        return false;
    }

    private static recursiveNameFind(name: string, joint: Joint): boolean {
        if (joint.name == name) return true;
        for (let i: number = 0; i < joint.joints.length; i++) {
            if (this.recursiveNameFind(name, joint.joints[i])) return true;
        }
        return false;
    }

    public static addJointToSelectedJoint() {
        let name: string = "joint";
        let jointId: number = 0;
        while (this.checkIfJointNameAlreadyExists(name + jointId)) {
            jointId++;
        }

        if (this.selectedJoint) {
            this.selectedJoint.joints.push(new Joint(name + jointId, { x: 0, y: -10 }, true, []));
        }
    }

    public static deleteSelectedJoint() {
        if (RootJoint.joint && this.selectedJoint && !this.isSelectingFirstJoint()) {
            let parentJoint: Joint | undefined = this.getParentOfSelectedJoint(RootJoint.joint);
            if (!parentJoint) return;

            let index: number = parentJoint.joints.findIndex((joint) => joint == this.selectedJoint);
            parentJoint.joints.splice(index, 1);

            for (let i: number = 0; i < this.selectedJoint.joints.length; i++) {
                parentJoint.joints.push(this.selectedJoint.joints[i]);
            }

            AnimationsCache.processJointDelete(this.selectedJoint.name);

            this.selectedJoint = RootJoint.joint;
        }
    }

    private static getParentOfSelectedJoint(joint: Joint): Joint | undefined {
        for (let i: number = 0; i < joint.joints.length; i++) {
            if (joint.joints[i] == this.selectedJoint) return joint;
        }
        for (let i: number = 0; i < joint.joints.length; i++) {
            let results: Joint | undefined = this.getParentOfSelectedJoint(joint.joints[i]);
            if (results) return results;
        }
        return undefined;
    }

    public static isSelectingFirstJoint(): boolean {
        if (this.selectedJoint && this.selectedJoint == RootJoint.joint) return true;
        return false;
    }
}

export interface JointsListObserver {
    onJointsListChange: () => void;
}
export interface JointsSelectObserver {
    onJointsSelectChange: () => void;
}
