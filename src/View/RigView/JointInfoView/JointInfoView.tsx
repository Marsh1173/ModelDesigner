import React, { useEffect, useState } from "react";
import { JointsCache } from "../../../DataAccessors/JointsCache";
import { Joint } from "../../../Model/Rig/Joint/Joint";
import { NumberInput } from "../../GenericComponents/TextInput/NumberInput/NumberInput";
import { TextInput } from "../../GenericComponents/TextInput/TextInput/TextInput";
import { JointInfoViewPresenter } from "../../../Presenter/JointInfoViewPresenter";
import { ImgSelectComponent } from "./ImgSelectComponent/ImgSelectComponent";
import "./JointInfoViewStyles.less";

export const JointInfoView: React.FC<{}> = () => {
    const getSelectedJoint: () => Joint | undefined = () => {
        return JointsCache.selectedJoint;
    };

    const [joint, changeStateJointSelect] = useState(getSelectedJoint());

    useEffect(() => {
        JointsCache.appendJointsSelectObservers({
            onJointsSelectChange: () => {
                changeSelectedStateRef();
            },
        });
    }, []);

    const changeSelectedStateRef = () => {
        changeStateJointSelect(getSelectedJoint());
    };

    let nameRef: React.RefObject<TextInput> = React.createRef();
    let basePosXRef: React.RefObject<NumberInput> = React.createRef();
    let basePosYRef: React.RefObject<NumberInput> = React.createRef();
    let imgPosXRef: React.RefObject<NumberInput> = React.createRef();
    let imgPosYRef: React.RefObject<NumberInput> = React.createRef();
    let imgScaleRef: React.RefObject<NumberInput> = React.createRef();
    let imgRotationRef: React.RefObject<NumberInput> = React.createRef();
    //let renderInFrontOfParentRef: React.RefObject<NumberInput> = React.createRef();

    useEffect(() => {
        if (joint) {
            nameRef.current?.setValue(joint.name);
            basePosXRef.current?.setValue(joint.basePos.x);
            basePosYRef.current?.setValue(joint.basePos.y);
            imgPosXRef.current?.setValue(joint.imgStaticData.localPos.x);
            imgPosYRef.current?.setValue(joint.imgStaticData.localPos.y);
            imgScaleRef.current?.setValue(joint.imgStaticData.scale);
            imgRotationRef.current?.setValue(joint.imgStaticData.rotation);
            //renderInFrontOfParentRef.current?.setValue(joint.endAnimationName);
        }
    });

    //const [selectingImage, changeSelectingImage] = useState(false);

    return (
        <div className="JointInfoView container">
            <h3>Joint</h3>
            {joint !== undefined && (
                <div className="jointDataInputContainer">
                    <div className="jointDataInputField">
                        <p>Name: </p>
                        <TextInput ref={nameRef} initValue={joint.name} onChange={JointInfoViewPresenter.changeJointName}></TextInput>
                    </div>
                    <div className="jointDataInputField">
                        <p>Base Position: </p>
                        <p className="NumberInputLabel">X: </p>
                        <NumberInput ref={basePosXRef} initValue={joint.basePos.x} onChange={JointInfoViewPresenter.changeJointBaseX}></NumberInput>
                        <p className="NumberInputLabel">Y: </p>
                        <NumberInput ref={basePosYRef} initValue={joint.basePos.y} onChange={JointInfoViewPresenter.changeJointBaseY}></NumberInput>
                    </div>
                    <div className="jointDataInputField">
                        <p>Image: </p>
                        <ImgSelectComponent></ImgSelectComponent>
                    </div>
                    <div className="jointDataInputField">
                        <p>Image Position: </p>
                        <p className="NumberInputLabel">X: </p>
                        <NumberInput
                            ref={imgPosXRef}
                            initValue={joint.imgStaticData.localPos.x}
                            onChange={JointInfoViewPresenter.changeJointImgX}
                        ></NumberInput>
                        <p className="NumberInputLabel">Y: </p>
                        <NumberInput
                            ref={imgPosYRef}
                            initValue={joint.imgStaticData.localPos.y}
                            onChange={JointInfoViewPresenter.changeJointImgY}
                        ></NumberInput>
                    </div>
                    <div className="jointDataInputField">
                        <p>Image Scale: </p>
                        <NumberInput
                            ref={imgScaleRef}
                            initValue={joint.imgStaticData.scale}
                            onChange={JointInfoViewPresenter.changeJointImgScale}
                        ></NumberInput>
                    </div>
                    <div className="jointDataInputField">
                        <p>Image Rotation: </p>
                        <NumberInput
                            ref={imgRotationRef}
                            initValue={joint.imgStaticData.rotation}
                            onChange={JointInfoViewPresenter.changeJointImgRotation}
                        ></NumberInput>
                    </div>
                    {/* <div className="jointDataInputField">
                        <p>Render Above Parent: </p>
                        <ToggleButton
                            startValue={joint ? joint.renderOnTopOfParent : false}
                            onChangeFunc={(value: boolean) => {
                                if (JointsCache.selectedJoint) {
                                    JointsCache.selectedJoint.renderOnTopOfParent = value;
                                    JointsCache.processJointSelectChange();
                                }
                            }}
                        ></ToggleButton>
                    </div> */}
                    <div className="jointButtonsDiv">
                        <button className="button" onClick={JointInfoViewPresenter.addChildJoint}>
                            Add Child Joint
                        </button>
                        {JointsCache.selectedJoint && !JointsCache.isSelectingFirstJoint() && (
                            <button className="button" onClick={JointInfoViewPresenter.deleteThisJoint}>
                                Delete This Joint
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
