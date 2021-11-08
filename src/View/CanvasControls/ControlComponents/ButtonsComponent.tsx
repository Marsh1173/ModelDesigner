import React, { Component } from "react";
import { OptionsCache } from "../../../DataAccessors/OptionsCache";
import { Slider } from "../../GenericComponents/Slider/Slider";
import { CanvasControlsPresenter } from "../../../Presenter/CanvasControlsPresenter";

export class ButtonsComponent extends Component<{}, {}> {
    private readonly percentDisplay: React.RefObject<HTMLParagraphElement>;
    constructor(props: any) {
        super(props);

        this.percentDisplay = React.createRef();
    }
    render() {
        return (
            <div className="ButtonsComponent">
                <div className="sliderContainer">
                    <p>0%</p>
                    <Slider
                        externalSliderFunc={(value) => {
                            if (this.percentDisplay.current) {
                                CanvasControlsPresenter.onSpeedSliderChange(value, this.percentDisplay.current);
                            }
                        }}
                        initValue={OptionsCache.frameSpeed}
                        min={0}
                        max={200}
                        step={10}
                    ></Slider>
                    <p>200%</p>
                </div>
                <p ref={this.percentDisplay}>{CanvasControlsPresenter.getPercentText()}</p>
            </div>
        );
    }
}
