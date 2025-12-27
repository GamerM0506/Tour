import { BaseEntity } from './base.entity';

export class Blog extends BaseEntity {
    constructor(
        public readonly title: string,
        public readonly slug: string,
        public readonly content: string,
        public readonly tags: string[],
        public readonly authorId: string,
        id?: string
    ) {
        super(id);
    }
}