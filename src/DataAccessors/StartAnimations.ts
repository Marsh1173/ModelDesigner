import { AnimationInterface } from "../Model/Animation/AnimationInterface";
import { getNextKey } from "../ts/main";
import { AnimationsCache } from "./AnimationsCache";

export const StartAnimations: AnimationInterface[] = [
    {
        animationName: "Stand",
        endAnimationName: "Stand",
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
            {
                jointName: "shoulder2",
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
        animationName: getNextAnimationName(),
        endAnimationName: "",
        duration: 1,
        jointAnimations: [],
    };
}

function getNextAnimationName(): string {
    let key: number = getNextKey();
    let newName: string;
    while (true) {
        newName = "Animation" + key;

        let nameExists: boolean = false;
        AnimationsCache.animations.forEach((animation) => {
            if (animation.animationName == newName) {
                nameExists = true;
            }
        });

        if (!nameExists) {
            return newName;
        }

        key++;
    }
}
