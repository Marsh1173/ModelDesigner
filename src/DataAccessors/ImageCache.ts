export class ImageCache {
    private static imgListObservers: ImgListObserver[] = [];

    public static images: Map<string, HTMLImageElement> = new Map();

    public static uploadImageToCache(img: HTMLImageElement, imgName: string) {
        this.images.set(imgName, img);
        console.log(this.images);
        this.processImgListChange();
    }

    public static removeImage(imgName: string) {
        this.images.delete(imgName);
        this.processImgListChange();
    }

    public static getImage(imgName: string): HTMLImageElement | undefined {
        return this.images.get(imgName);
    }

    public static getImageNames(): string[] {
        let returnArray: string[] = [];
        this.images.forEach((value, key) => {
            value;
            returnArray.push(key);
        });
        this.images.entries;
        return returnArray;
    }

    public static getMap(): Map<string, HTMLImageElement> {
        return this.images;
    }

    public static addImgListObserver(observer: ImgListObserver) {
        this.imgListObservers.push(observer);
    }

    public static processImgListChange() {
        this.imgListObservers.forEach((observer) => {
            observer.onImageListChange();
        });
    }
}

export interface ImgListObserver {
    onImageListChange: () => void;
}
