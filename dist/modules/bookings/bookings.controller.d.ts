import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { User } from '../users/schemas/user.schema';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(user: User, createBookingDto: CreateBookingDto): Promise<import("./schemas/booking.schema").BookingDocument>;
    findAll(user: User, role?: 'owner' | 'provider'): Promise<import("./schemas/booking.schema").BookingDocument[]>;
    findOne(id: string, user: User): Promise<import("./schemas/booking.schema").BookingDocument>;
    update(id: string, user: User, updateBookingDto: UpdateBookingDto): Promise<import("./schemas/booking.schema").BookingDocument>;
    remove(id: string, user: User): Promise<void>;
}
