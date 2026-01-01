import { IMediaService } from 'src/application/interfaces/IMediaService';
import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryMediaService implements IMediaService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        });
    }

    async uploadImage(file: any): Promise<string> {
        if (!file || !file.buffer) return '';
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { folder: 'luxury-tours/images' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || '');
                }
            );
            upload.end(file.buffer);
        });
    }

    async uploadVideo(file: any): Promise<string> {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'video',
            folder: 'medicare/tours/videos',
            chunk_size: 6000000,
        });
        return result.secure_url;
    }

    async deleteMedia(url: string): Promise<void> {
        try {
            const publicId = url.split('/').pop()?.split('.')[0];
            if (publicId) {
                const folderPath = url.includes('videos') ? 'medicare/tours/videos/' : 'medicare/tours/images/';
                await cloudinary.uploader.destroy(folderPath + publicId);
            }
        } catch (error) {
            console.error("Error deleting media on Cloudinary:", error);
        }
    }
}