import NetworkSettings from "../setting/NetworkSettings";

export default class ImageUtils {
    public static getOkToSendPath(imagePath: string): string {
        const baseUrl: string = NetworkSettings.getOpenNetworkIP() + "/image/";
        return baseUrl + this.getFileFrom(imagePath) + "/" + this.getNameFrom(imagePath);
    }

    private static getFileFrom(imagePath: string): string {
        const spilted: string[] = imagePath.split("/");
        return spilted[spilted.length - 2];
    }

    private static getNameFrom(imagePath: string): string {
        const spilted: string[] = imagePath.split("/");
        return spilted[spilted.length - 1];
    }
}