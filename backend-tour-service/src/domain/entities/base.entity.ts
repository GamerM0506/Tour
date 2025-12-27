export abstract class BaseEntity {
    public readonly id: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public deletedAt: Date | null;

    constructor(id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date | null) {
        this.id = id || crypto.randomUUID();
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
        this.deletedAt = deletedAt || null;
    }

    public softDelete(): void {
        if (this.deletedAt === null) {
            this.deletedAt = new Date();
        }
    }

    get isDeleted(): boolean {
        return this.deletedAt !== null;
    }
}