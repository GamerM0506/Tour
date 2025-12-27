import { BaseEntity } from './base.entity';
import { Role } from '../enums/role.enum';

export class User extends BaseEntity {
    constructor(
        public readonly email: string,
        public readonly fullName: string,
        public readonly role: Role = Role.CUSTOMER,
        private _passwordHash: string,
        id?: string,
        createdAt?: Date
    ) {
        super(id, createdAt);
    }

    public isAdmin(): boolean {
        return this.role === Role.ADMIN;
    }

    public canCreateContent(): boolean {
        return [Role.ADMIN, Role.CHEF].includes(this.role);
    }

    get passwordHash(): string {
        return this._passwordHash;
    }
}