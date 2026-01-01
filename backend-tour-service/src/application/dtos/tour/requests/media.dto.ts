import { MediaType } from "src/domain/enums/mediatype.enum";

export class MediaDto {
    url: string;
    type: MediaType;
    alt?: string;
    isThumbnail?: boolean;
}