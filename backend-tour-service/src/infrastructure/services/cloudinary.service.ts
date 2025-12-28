import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { IMediaService } from 'src/application/interfaces/IMediaService';

@Injectable()
export class CloudinaryService implements IMediaService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadVideo(file: any): Promise<string> {
        if (!file) return '';

        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { resource_type: 'video' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url || '');
                }
            );
            upload.end(file.buffer);
        });
    }
    
    async deleteMedia(url: string): Promise<void> {
        if (!url) return;

        try {
            const parts = url.split('/');
            const fileNameWithExtension = parts[parts.length - 1];
            const publicId = fileNameWithExtension.split('.')[0];

            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error('Cloudinary Delete Error:', error);
        }
    }

    async uploadImage(file: any): Promise<string> {
        if (!file) return '';
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result?.secure_url || '');
            });
            upload.end(file.buffer);
        });
    }
}