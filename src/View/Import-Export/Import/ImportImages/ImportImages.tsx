import React, { useEffect, useState } from "react";
import { ImageCache } from "../../../../DataAccessors/ImageCache";
import { ImportPresenter } from "../../../../Presenter/ImportPresenter";
import { getNextKey } from "../../../../ts/main";
import { ImageListItem } from "./ImageListItem/ImageListItem";
import "./ImportImagesStyles.less";

export const ImportImages: React.FC<{}> = () => {
    const [state, changeImgList] = useState({});
    state;

    useEffect(() => {
        ImageCache.addImgListObserver({
            onImageListChange: changeImgListRefFunc,
        });
        return changeImgListRefFunc;
    }, []);

    const changeImgListRefFunc = () => {
        changeImgList({});
    };

    let importPhotoInputElem: React.RefObject<HTMLInputElement> = React.createRef();
    let imgData: Map<string, HTMLImageElement> = ImageCache.getMap();
    let imgComponents: JSX.Element[] = [];

    imgData.forEach((value, key) => {
        imgComponents.push(<ImageListItem key={getNextKey()} name={key} img={value}></ImageListItem>);
    });

    return (
        <div className="ImportImages">
            <div className="importImagesButtonDiv">
                <input
                    ref={importPhotoInputElem}
                    className="importPhotoInput"
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => {
                        ImportPresenter.importPhoto(e);
                    }}
                ></input>
                <button
                    className="importPhotoButton button"
                    onClick={() => {
                        importPhotoInputElem.current?.click();
                    }}
                >
                    Import Image
                </button>
            </div>
            <div className="imageListContainer">
                <div className="imageList">{imgComponents}</div>
            </div>
        </div>
    );
};
