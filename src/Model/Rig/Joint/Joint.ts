import { JointAnimation } from "../../Animation/JointAnimation";
import { Vector } from "../../Utils/Vector";

export class Joint {
    public;

    constructor(public name: string, public pos: Vector) {}

    public update(elapsedTime: number) {}

    public assignAnimation(animation: JointAnimation) {}
}
