import { ImageCache } from "../DataAccessors/ImageCache";
import { JointsCache } from "../DataAccessors/JointsCache";

export class JointInfoViewPresenter {
    public static changeJointName(value: string) {
        if (JointsCache.selectedJoint && JointsCache.attemptChangeSelectedJointName(value)) {
            JointsCache.processJointSelectChange();
            JointsCache.processJointsListChange();
        }
    }
    public static changeJointBaseX(value: number) {
        if (JointsCache.selectedJoint) {
            JointsCache.selectedJoint.basePos.x = value;
            JointsCache.processJointSelectChange();
        }
    }
    public static changeJointBaseY(value: number) {
        if (JointsCache.selectedJoint) {
            JointsCache.selectedJoint.basePos.y = value;
            JointsCache.processJointSelectChange();
        }
    }
    public static changeJointImg(value: string) {
        if (JointsCache.selectedJoint) {
            if (value == "" || value == "None") {
                JointsCache.selectedJoint.imgStaticData.img = undefined;
                JointsCache.selectedJoint.imgStaticData.imgName = undefined;
                JointsCache.processJointSelectChange();
            } else {
                let img: HTMLImageElement | undefined = ImageCache.getImage(value);
                if (img) {
                    JointsCache.selectedJoint.imgStaticData.img = ImageCache.getImage(value);
                    JointsCache.selectedJoint.imgStaticData.imgName = value;
                    JointsCache.processJointSelectChange();
                }
            }
        }
    }
    public static changeJointImgX(value: number) {
        if (JointsCache.selectedJoint) {
            JointsCache.selectedJoint.imgStaticData.localPos.x = value;
            JointsCache.processJointSelectChange();
        }
    }
    public static changeJointImgY(value: number) {
        if (JointsCache.selectedJoint) {
            JointsCache.selectedJoint.imgStaticData.localPos.y = value;
            JointsCache.processJointSelectChange();
        }
    }
    public static changeJointImgScale(value: number) {
        if (JointsCache.selectedJoint) {
            JointsCache.selectedJoint.imgStaticData.scale = value;
            JointsCache.processJointSelectChange();
        }
    }
    public static changeJointImgRotation(value: number) {
        if (JointsCache.selectedJoint) {
            JointsCache.selectedJoint.imgStaticData.rotation = value;
            JointsCache.processJointSelectChange();
        }
    }

    public static addChildJoint() {
        JointsCache.addJointToSelectedJoint();
        JointsCache.processJointsListChange();
    }
    public static deleteThisJoint() {
        JointsCache.deleteSelectedJoint();
        JointsCache.processJointSelectChange();
        JointsCache.processJointsListChange();
    }
}
