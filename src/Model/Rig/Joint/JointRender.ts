import { Joint } from "./Joint";

export function renderJoint(joint: Joint, ctx: CanvasRenderingContext2D, animationPercent: number) {
    ctx.rotate(joint.jointDynamData.rotation);
    ctx.translate(joint.basePos.x + joint.jointDynamData.posX, joint.basePos.y + joint.jointDynamData.posY);
    ctx.rotate(joint.jointDynamData.imgRotation);

    joint.joints.forEach((childJoint) => {
        if (childJoint.renderOnTopOfParent) childJoint.updateAndRender(ctx, animationPercent);
    });
    renderJointImage(joint, ctx);
    joint.joints.forEach((childJoint) => {
        if (!childJoint.renderOnTopOfParent) childJoint.updateAndRender(ctx, animationPercent);
    });

    ctx.rotate(joint.jointDynamData.imgRotation);
    ctx.translate(-joint.basePos.x - joint.jointDynamData.posX, -joint.basePos.y - joint.jointDynamData.posY);
    ctx.rotate(joint.jointDynamData.rotation);
}

export function renderJointImage(joint: Joint, ctx: CanvasRenderingContext2D) {
    joint;
    ctx;
}

export function renderJointLine(joint: Joint, ctx: CanvasRenderingContext2D) {
    joint.joints.forEach((childJoint) => {
        ctx.moveTo(joint.basePos.x, joint.basePos.y);
        ctx.lineTo(childJoint.basePos.x + joint.jointDynamData.posX, childJoint.basePos.y + joint.jointDynamData.posY);
        renderJointLine(childJoint, ctx);
    });
}

export function renderJointPoint(joint: Joint, ctx: CanvasRenderingContext2D) {
    ctx.fillRect(joint.basePos.x - 4 + joint.jointDynamData.posX, joint.basePos.y - 4 + joint.jointDynamData.posY, 8, 8);
    joint.joints.forEach((childJoint) => {
        renderJointLine(childJoint, ctx);
    });
}
