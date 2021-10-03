import React, { Component } from "react";
import { OptionsCache } from "../../../DataAccessors/OptionsCache";
import { Slider } from "../../GenericComponents/Slider/Slider";

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
                            OptionsCache.frameSpeed = value;
                            this.percentDisplay.current!.innerHTML = this.getPercentDisplay();
                        }}
                        initValue={OptionsCache.frameSpeed}
                        min={0}
                        max={200}
                        step={10}
                    ></Slider>
                    <p>200%</p>
                </div>
                <p ref={this.percentDisplay}>{this.getPercentDisplay()}</p>
            </div>
        );
    }

    private getPercentDisplay() {
        return "Speed: " + OptionsCache.frameSpeed + "%";
    }
}
