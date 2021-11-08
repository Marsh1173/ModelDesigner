import { ScreenHandler } from "../MainCanvas/ScreenHandler";
import { JointsSetter } from "../Rig/SetJoints/SetJoints";
import { StartJoint } from "../../DataAccessors/StartJoints";
import { RootJoint } from "../Rig/RootJoint/RootJoint";
import { StartAnimations } from "../../DataAccessors/StartAnimations";

export class Initializer {
    public static InitializeEverything() {
        ScreenHandler.startScreenResizeEventListener();

        JointsSetter.setJoints(StartJoint);

        RootJoint.setAnimation(StartAnimations[0]);
    }
}
