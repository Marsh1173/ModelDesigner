import { AnimationsCache } from "../../../DataAccessors/AnimationsCache";
import { OptionsCache } from "../../../DataAccessors/OptionsCache";
import { AnimationInterface } from "../../Animation/AnimationInterface";
import { Joint } from "../Joint/Joint";
import { renderJointLine, renderJointPoint } from "../Joint/JointRender";

export class RootJoint {
    public static joints: Joint[] = [];

    private static animationState: number = 0;
    private static animationPercent: number = 0;
    private static animation: AnimationInterface | undefined = undefined;
    private static lastAnimation: AnimationInterface | undefined = undefined;

    public static updateAndRender(elapsedTime: number, ctx: CanvasRenderingContext2D) {
        if (this.animation) {
            this.animationState += elapsedTime;
            this.animationPercent = this.animationState / this.animation.duration;
            if (this.animationState >= this.animation.duration) this.endAnimation();
            else if (this.animationState < 0) this.animationState += this.animation.duration;
        }
        this.joints.forEach((joint) => {
            joint.updateAndRender(ctx, this.animationPercent);
        });

        this.renderRig(ctx);
    }

    private static renderRig(ctx: CanvasRenderingContext2D) {
        if (OptionsCache.showBones) {
            ctx.beginPath();
            ctx.strokeStyle = "#ff6600";
            ctx.lineWidth = 4;
            ctx.globalAlpha = 0.5;

            this.joints.forEach((joint) => {
                renderJointLine(joint, ctx);
            });

            ctx.closePath();
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        if (OptionsCache.showJoints) {
            ctx.fillStyle = "red";
            this.joints.forEach((joint) => {
                renderJointPoint(joint, ctx);
            });
        }
    }

    public static setAnimation(animation: AnimationInterface | undefined) {
        this.animationPercent = 0;
        this.animationState = 0;
        this.lastAnimation = this.animation;
        this.animation = animation;

        if (animation != undefined) {
            this.joints.forEach((joint) => {
                this.recursiveAssignAnimation(joint, animation);
            });
        }
    }

    public static resetAnimation() {
        if (this.animation !== undefined) {
            this.animationPercent = 0;
            this.animationState = 0;
        } else if (this.lastAnimation !== undefined) {
            this.setAnimation(this.lastAnimation);
        }
    }

    private static recursiveAssignAnimation(joint: Joint, animation: AnimationInterface) {
        animation.jointAnimations.forEach((jointAnimation) => {
            if (jointAnimation.jointName === joint.name) {
                joint.assignAnimation(jointAnimation);
            }
        });

        joint.joints.forEach((childJoint) => {
            this.recursiveAssignAnimation(childJoint, animation);
        });
    }

    private static endAnimation() {
        let endAnimationName: string = this.animation!.endAnimationName;
        this.setAnimation(undefined);
        AnimationsCache.animations.forEach((animation) => {
            if (animation.animationName == endAnimationName) {
                this.setAnimation(animation);
            }
        });
    }
}
