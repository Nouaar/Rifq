import { AiService } from './ai.service';
import { AiTipsResponseDto } from './dto/ai-tips-response.dto';
import { AiRecommendationsResponseDto } from './dto/ai-recommendations-response.dto';
import { AiRemindersResponseDto } from './dto/ai-reminders-response.dto';
import { AiStatusResponseDto } from './dto/ai-status-response.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    getTips(petId: string): Promise<AiTipsResponseDto>;
    getRecommendations(petId: string): Promise<AiRecommendationsResponseDto>;
    getReminders(petId: string): Promise<AiRemindersResponseDto>;
    getStatus(petId: string): Promise<AiStatusResponseDto>;
}
