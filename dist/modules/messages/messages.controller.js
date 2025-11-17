"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const update_message_dto_1 = require("./dto/update-message.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async getConversations(user) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.getConversations(userId);
    }
    async getOrCreateConversation(user, createConversationDto) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.getOrCreateConversation(userId, createConversationDto.participantId);
    }
    async getMessages(id, user) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.getMessages(id, userId);
    }
    async markAsRead(id, user) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.markAsRead(id, userId);
    }
    async sendMessage(user, createMessageDto, audioFile) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.sendMessage(userId, createMessageDto, audioFile);
    }
    async updateMessage(id, user, updateMessageDto) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.updateMessage(id, userId, updateMessageDto.content);
    }
    async deleteMessage(id, user) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.deleteMessage(id, userId);
    }
    async deleteConversation(id, user) {
        const userId = String(user._id ?? user.id);
        return this.messagesService.deleteConversation(id, userId);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)('conversations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all conversations for the current user',
        description: 'Returns a list of all conversations the user is part of',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Post)('conversations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Get or create a conversation',
        description: 'Gets an existing conversation with a participant or creates a new one if it does not exist',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getOrCreateConversation", null);
__decorate([
    (0, common_1.Get)('conversations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get messages for a conversation',
        description: 'Returns all messages in a specific conversation',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('conversations/:id/read'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Mark messages as read',
        description: 'Marks all messages in a conversation as read for the current user',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio')),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a message',
        description: 'Sends a message to a recipient. Creates a new conversation if conversationId is not provided. Can include an audio file.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a message',
        description: 'Updates the content of a message. Only the sender can update their own messages.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User,
        update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a message',
        description: 'Soft deletes a message. Only the sender can delete their own messages.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "deleteMessage", null);
__decorate([
    (0, common_1.Delete)('conversations/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a conversation',
        description: 'Deletes a conversation. Only participants can delete their conversations.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "deleteConversation", null);
exports.MessagesController = MessagesController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map