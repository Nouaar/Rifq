import { Document, Types } from 'mongoose';
export type MessageDocument = Message & Document;
export declare class Message extends Document {
    _id: Types.ObjectId;
    conversation: Types.ObjectId;
    sender: Types.ObjectId;
    recipient: Types.ObjectId;
    content: string;
    read: boolean;
    readAt?: Date;
    isDeleted: boolean;
    editedAt?: Date;
    audioURL?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message, any, {}> & Message & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
