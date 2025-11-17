export declare class UpdateBookingDto {
    status?: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
    rejectionReason?: string;
    cancellationReason?: string;
}
