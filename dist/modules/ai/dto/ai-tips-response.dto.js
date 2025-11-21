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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiTipsResponseDto = exports.TipItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TipItemDto {
}
exports.TipItemDto = TipItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '🥕', description: 'Emoji for the tip' }),
    __metadata("design:type", String)
], TipItemDto.prototype, "emoji", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nutrition Tip', description: 'Title of the tip' }),
    __metadata("design:type", String)
], TipItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rotate crunchy vegetables with high-protein treats to keep meals balanced.',
        description: 'Detail description of the tip',
    }),
    __metadata("design:type", String)
], TipItemDto.prototype, "detail", void 0);
class AiTipsResponseDto {
}
exports.AiTipsResponseDto = AiTipsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TipItemDto], description: 'List of tips for the pet' }),
    __metadata("design:type", Array)
], AiTipsResponseDto.prototype, "tips", void 0);
//# sourceMappingURL=ai-tips-response.dto.js.map