import { AnimationInterface } from "../Model/Animation/AnimationInterface";
import { getNextKey } from "../ts/main";

export const StartAnimations: AnimationInterface[] = [
    {
        animationName: "Stand",
        endAnimationName: "",
        duration: 5,
        jointAnimations: [
            {
                jointName: "torso",
                keyFrames: {
                    imgRotation: [{ time: 0, value: 0 }],
                    rotation: [{ time: 0, value: 0 }],
                    posX: [
                        { time: 0, value: 0 },
                        { time: 0.2, value: 80 },
                        { time: 1, value: 0 },
                    ],
                    posY: [{ time: 0, value: 0 }],
                },
            },
        ],
    },
];

export function getNewAnimation(): AnimationInterface {
    return {
        animationName: "Animation" + getNextKey(),
        endAnimationName: "",
        duration: 1,
        jointAnimations: [
            {
                jointName: "torso",
                keyFrames: {
                    imgRotation: [{ time: 0, value: 0 }],
                    rotation: [{ time: 0, value: 0 }],
                    posX: [
                        { time: 0, value: 0 },
                        { time: 0.2, value: 80 },
                        { time: 1, value: 0 },
                    ],
                    posY: [{ time: 0, value: 0 }],
                },
            },
        ],
    };
}
