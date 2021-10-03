import { JointAnimateFactor, JointAnimationInterface } from "../../Animation/JointAnimation";
import { Vector } from "../../Utils/Vector";
import { renderJoint } from "./JointRender";
import { jointReadAnimationData } from "./JointReadAnimation";

export class Joint {
    public depth: number = 0;
    public imgData: JointImgData | undefined = undefined;

    public currentAnimation?: JointAnimationInterface;
    public jointDynamData: Record<JointAnimateFactor, number> = {
        posX: 0,
        posY: 0,
        rotation: 0,
        imgRotation: 0,
    };

    constructor(public name: string, public basePos: Vector, public renderOnTopOfParent: boolean, public joints: Joint[]) {}

    public updateAndRender(ctx: CanvasRenderingContext2D, animationPercent: number) {
        if (this.currentAnimation !== undefined) jointReadAnimationData(this, this.currentAnimation, animationPercent);
        renderJoint(this, ctx, animationPercent);
    }

    public assignAnimation(animation?: JointAnimationInterface) {
        this.jointDynamData.posX = 0;
        this.jointDynamData.posY = 0;
        this.jointDynamData.rotation = 0;
        this.jointDynamData.imgRotation = 0;

        this.currentAnimation = animation;
    }
}

export interface JointImgData {
    img: HTMLCanvasElement;
    localPos: Vector;
    scale: Vector;
}
