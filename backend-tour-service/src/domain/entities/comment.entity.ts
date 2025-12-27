import { BaseEntity } from './base.entity';

export class Comment extends BaseEntity {
    constructor(
        public readonly content: string,
        public readonly authorId: string,
        public readonly blogId: string,
        id?: string
    ) {
        super(id);
        this.validate();
    }

    private validate(): void {
        if (this.content.length < 3) throw new Error("Comment is too short.");
        if (!this.authorId) throw new Error("You must be logged in to comment.");
    }
}