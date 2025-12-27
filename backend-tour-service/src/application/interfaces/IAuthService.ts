export interface IAuthService {
    getCurrentUserId(): string;
    verifyToken(token: string): any;
}