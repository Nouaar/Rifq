export interface IUser {
    _id?: string;
    phoneNumber: string;
    name: string;
    role: 'owner' | 'vet' | 'sitter';
    avatarUrl?: string;
    otpCode?: string;
    otpExpiresAt?: Date;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
