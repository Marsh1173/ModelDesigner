export interface JointAnimationInterface {
    jointName: string;
    keyFrames: Record<JointAnimateFactor, KeyFrame[] | undefined>;
}

export type JointAnimateFactor = "posX" | "posY" | "rotation" | "imgRotation";

export interface KeyFrame {
    time: number;
    value: number;
}
