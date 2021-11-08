import { Joint } from "./Joint";

export function renderJoint(joint: Joint, ctx: CanvasRenderingContext2D, animationPercent: number) {
    ctx.rotate(joint.jointDynamData.rotation);
    ctx.translate(joint.basePos.x + joint.jointDynamData.posX, joint.basePos.y + joint.jointDynamData.posY);
    ctx.rotate(joint.jointDynamData.imgRotation);

    joint.joints.forEach((childJoint) => {
        if (childJoint.renderOnTopOfParent) childJoint.updateAndRender(ctx, animationPercent);
    });
    if (joint.imgStaticData.img) renderJointImage(joint, ctx);
    joint.joints.forEach((childJoint) => {
        if (!childJoint.renderOnTopOfParent) childJoint.updateAndRender(ctx, animationPercent);
    });

    ctx.rotate(-joint.jointDynamData.imgRotation);
    ctx.translate(-joint.basePos.x - joint.jointDynamData.posX, -joint.basePos.y - joint.jointDynamData.posY);
    ctx.rotate(-joint.jointDynamData.rotation);
}

export function renderJointImage(joint: Joint, ctx: CanvasRenderingContext2D) {
    //MISSING IMAGE LOC ETC
    let img: HTMLImageElement = joint.imgStaticData.img!;

    ctx.scale(joint.imgStaticData.scale, joint.imgStaticData.scale);
    ctx.rotate(joint.imgStaticData.rotation);

    ctx.drawImage(img, joint.imgStaticData.localPos.x, joint.imgStaticData.localPos.y);

    ctx.rotate(-joint.imgStaticData.rotation);
    ctx.scale(1 / joint.imgStaticData.scale, 1 / joint.imgStaticData.scale);
}

export function renderJointLine(joint: Joint, ctx: CanvasRenderingContext2D) {
    ctx.translate(joint.basePos.x + joint.jointDynamData.posX, joint.basePos.y + joint.jointDynamData.posY);
    joint.joints.forEach((childJoint) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(childJoint.basePos.x + childJoint.jointDynamData.posX, childJoint.basePos.y + childJoint.jointDynamData.posY);
        ctx.stroke();
        renderJointLine(childJoint, ctx);
    });
    ctx.translate(-joint.basePos.x - joint.jointDynamData.posX, -joint.basePos.y - joint.jointDynamData.posY);
}

export function renderJointPoint(joint: Joint, ctx: CanvasRenderingContext2D) {
    ctx.translate(joint.basePos.x + joint.jointDynamData.posX, joint.basePos.y + joint.jointDynamData.posY);

    ctx.fillRect(-4, -4, 8, 8);
    joint.joints.forEach((childJoint) => {
        renderJointPoint(childJoint, ctx);
    });

    ctx.translate(-joint.basePos.x - joint.jointDynamData.posX, -joint.basePos.y - joint.jointDynamData.posY);
}
