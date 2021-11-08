import React from "react";

export const AnimationCanvasContainer: React.FC<{}> = () => {
    let importPhotoInputElem: React.RefObject<HTMLCanvasElement> = React.createRef();

    return (
        <div className="AnimationCanvasContainer">
            <canvas ref={importPhotoInputElem}></canvas>
        </div>
    );
};
