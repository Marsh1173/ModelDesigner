import React from "react";
import { useEffect, useState } from "react";
import { ImageCache } from "../../../../DataAccessors/ImageCache";
import { JointsCache } from "../../../../DataAccessors/JointsCache";
import { JointInfoViewPresenter } from "../../../../Presenter/JointInfoViewPresenter";
import { NameList } from "../../../GenericComponents/NameList/NameList";
import "./ImgSelectComponentStyles.less";

export const ImgSelectComponent: React.FC<{}> = () => {
    const [selectedImageName, changeSelectedImageName] = useState("Select an Image");
    useEffect(() => {
        JointsCache.appendJointsSelectObservers({
            onJointsSelectChange: () => {
                let name: string = "Select an Image";
                if (JointsCache.selectedJoint && JointsCache.selectedJoint.imgStaticData.imgName) {
                    name = JointsCache.selectedJoint.imgStaticData.imgName;
                }
                changeSelectedImageName(name);
            },
        });
    }, []);

    const [selectingImage, changeSelectingImage] = useState(false);

    return (
        <div className="ImgSelectComponent">
            {selectingImage && (
                <NameList
                    onClose={() => {
                        changeSelectingImage(false);
                    }}
                    onSelectName={(value: string) => {
                        console.log(value);
                        JointInfoViewPresenter.changeJointImg(value);
                    }}
                    getItems={() => ImageCache.getImageNames()}
                    extraItems={["None"]}
                ></NameList>
            )}
            <button onClick={() => changeSelectingImage(true)}>{selectedImageName}</button>
        </div>
    );
};
