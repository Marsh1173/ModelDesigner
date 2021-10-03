import React, { Component, RefObject } from "react";
import "./MainCanvasViewStyles.less";
import { MainCanvasHandler } from "../../Model/MainCanvas/MainCanvas";
import { Looper } from "../../Model/Looper/Looper";

export class MainCanvasView extends Component<{}, {}> {
    private canvasRef: RefObject<HTMLCanvasElement> = React.createRef();
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className="MainCanvasView">
                <canvas ref={this.canvasRef} className="mainCanvas"></canvas>
            </div>
        );
    }

    componentDidMount() {
        MainCanvasHandler.setCanvas(this.canvasRef.current!);
        Looper.start();
    }
}
