import { JointAnimationInterface, KeyFrame } from "../../Animation/JointAnimation";
import { Joint } from "./Joint";

export function jointReadAnimationData(joint: Joint, animation: JointAnimationInterface, animationPercent: number) {
    joint.jointDynamData.imgRotation = readKeyFrame(animation.keyFrames.imgRotation, animationPercent);
    joint.jointDynamData.rotation = readKeyFrame(animation.keyFrames.rotation, animationPercent);
    joint.jointDynamData.posX = readKeyFrame(animation.keyFrames.posX, animationPercent);
    joint.jointDynamData.posY = readKeyFrame(animation.keyFrames.posY, animationPercent);
}

function readKeyFrame(frames: KeyFrame[] | undefined, animationPercent: number): number {
    if (frames == undefined) return 0;
    let index: number = 0;
    let arrayLength: number = frames.length - 1;
    while (true) {
        if (index === arrayLength) return frames[index].value;
        else if (frames[index + 1].time >= animationPercent) break;
        index++;
    }
    let percent: number = (animationPercent - frames[index].time) / (frames[index + 1].time - frames[index].time);
    let keyDifference: number = frames[index + 1].value - frames[index].value;
    return frames[index].value + percent * keyDifference;
}
