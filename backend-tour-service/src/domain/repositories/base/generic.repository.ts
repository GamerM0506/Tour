export interface IGenericRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    softDelete(id: string): Promise<void>;
}