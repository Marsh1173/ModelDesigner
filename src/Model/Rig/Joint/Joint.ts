import { JointAnimateFactor, JointAnimationInterface } from "../../Animation/JointAnimation";
import { Vector } from "../../Utils/Vector";
import { renderJoint } from "./JointRender";
import { jointReadAnimationData } from "./JointReadAnimation";

export class Joint {
    public currentAnimation?: JointAnimationInterface;
    public jointDynamData: Record<JointAnimateFactor, number> = {
        posX: 0,
        posY: 0,
        rotation: 0,
        imgRotation: 0,
    };

    public imgStaticData: JointImgData = {
        imgName: undefined,
        img: undefined,
        localPos: { x: 0, y: 0 },
        scale: 1,
        rotation: 0,
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
    imgName: string | undefined;
    img: HTMLImageElement | undefined;
    localPos: Vector;
    scale: number;
    rotation: number;
}
