export class ImageCache {
    public static images: Map<string, HTMLImageElement> = new Map();

    public static uploadImageToCache(img: HTMLImageElement, imgName: string) {
        this.images.set(imgName, img);
        console.log(this.images);
    }

    public static removeImage(imgName: string) {
        this.images.delete(imgName);
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
        return returnArray;
    }
}
