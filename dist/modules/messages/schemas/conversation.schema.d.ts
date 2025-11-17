import { Document, Types } from 'mongoose';
export type ConversationDocument = Conversation & Document;
export declare class Conversation extends Document {
    _id: Types.ObjectId;
    participants: Types.ObjectId[];
    lastMessage?: Types.ObjectId;
    lastMessageAt?: Date;
    unreadCounts?: Map<string, number>;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ConversationSchema: import("mongoose").Schema<Conversation, import("mongoose").Model<Conversation, any, any, any, Document<unknown, any, Conversation, any, {}> & Conversation & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Conversation, Document<unknown, {}, import("mongoose").FlatRecord<Conversation>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Conversation> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
