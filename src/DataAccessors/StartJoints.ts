import { Joint } from "../Model/Rig/Joint/Joint";

export const StartJoint: Joint = new Joint("torso", { x: 0, y: -100 }, false, [
    new Joint("shoulder1", { x: 0, y: -100 }, false, []),
    new Joint("shoulder2", { x: 0, y: -100 }, false, [new Joint("elbow2", { x: 0, y: -100 }, false, [])]),
]);
