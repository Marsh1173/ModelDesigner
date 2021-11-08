import React from "react";
import { ImageCache } from "../DataAccessors/ImageCache";

export class ImportPresenter {
    public static clearImportField(ref: React.RefObject<HTMLTextAreaElement>) {
        if (ref.current) ref.current.value = "";
    }

    public static processImportText(ref: React.RefObject<HTMLTextAreaElement>) {
        if (ref.current) {
            let value: string = ref.current.value;
            if (value === "") {
                window.alert("Make sure you put valid data in the import field.");
            } else {
                window.alert("You imported!");
            }
        }
    }

    public static importPhoto(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.item(0) != null && e.target.files.item(0) != undefined) {
            let reader: FileReader = new FileReader();
            reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
                let newImg: HTMLImageElement = new Image();

                if (loadEvent.target && !(loadEvent.target.result instanceof ArrayBuffer) && loadEvent.target.result != null) {
                    newImg.src = loadEvent.target.result;
                    let name: string = e.target.files!.item(0)!.name;
                    ImageCache.uploadImageToCache(newImg, name);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }
}
