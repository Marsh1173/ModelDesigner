import { JointAnimationInterface } from "./JointAnimation";

export interface AnimationInterface {
    animationName: string;
    endAnimationName: string;
    duration: number;
    jointAnimations: JointAnimationInterface[];
}
