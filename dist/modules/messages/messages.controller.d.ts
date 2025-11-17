import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { User } from '../users/schemas/user.schema';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getConversations(user: User): Promise<import("./schemas/conversation.schema").ConversationDocument[]>;
    getOrCreateConversation(user: User, createConversationDto: CreateConversationDto): Promise<import("./schemas/conversation.schema").ConversationDocument>;
    getMessages(id: string, user: User): Promise<import("./schemas/message.schema").MessageDocument[]>;
    markAsRead(id: string, user: User): Promise<{
        message: string;
    }>;
    sendMessage(user: User, createMessageDto: CreateMessageDto, audioFile?: Express.Multer.File): Promise<import("./schemas/message.schema").MessageDocument>;
    updateMessage(id: string, user: User, updateMessageDto: UpdateMessageDto): Promise<import("./schemas/message.schema").MessageDocument>;
    deleteMessage(id: string, user: User): Promise<import("./schemas/message.schema").MessageDocument>;
    deleteConversation(id: string, user: User): Promise<void>;
}
