import { Joint } from "../Joint/Joint";
import { RootJoint } from "../RootJoint/RootJoint";

export class JointsSetter {
    public static setJoints(joints: Joint[]) {
        RootJoint.joints = joints;
    }
}
