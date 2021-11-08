import React from "react";
import { ImageCache } from "../../../../../DataAccessors/ImageCache";
import "./ImageListItemStyles.less";

export const ImageListItem: React.FC<ImageListItemProps> = (props) => {
    return (
        <div className="ImageListItem">
            <div>
                <button
                    className="button"
                    onClick={() => {
                        ImageCache.removeImage(props.name);
                    }}
                >
                    Delete
                </button>
            </div>
            <div className="imgInfo">
                <h1 className="imgTitle">{props.name}</h1>
                <div className="imgIconDiv">
                    <img src={props.img.src}></img>
                </div>
            </div>
        </div>
    );
};

export interface ImageListItemProps {
    name: string;
    img: HTMLImageElement;
}
