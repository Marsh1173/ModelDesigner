import { Joint } from "../Joint/Joint";
import { RootJoint } from "../RootJoint/RootJoint";

export class JointsSetter {
    public static setJoints(joint: Joint) {
        RootJoint.joint = joint;
    }
}
