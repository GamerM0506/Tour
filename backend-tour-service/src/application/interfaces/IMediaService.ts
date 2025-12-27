export interface IMediaService {
    uploadImage(file: any): Promise<string>;
    uploadVideo(file: any): Promise<string>;
    deleteMedia(url: string): Promise<void>;
}