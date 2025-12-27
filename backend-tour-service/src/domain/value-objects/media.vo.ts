import { MediaType } from "../enums/mediatype.enum";

export class Media {
    constructor(
        public readonly url: string,
        public readonly type: MediaType,
        public readonly alt?: string,
        public readonly title?: string,
        public readonly isThumbnail: boolean = false
    ) { }
}