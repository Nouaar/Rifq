export declare class RecommendationItemDto {
    title: string;
    detail: string;
    type: string;
    suggestedDate?: string;
}
export declare class AiRecommendationsResponseDto {
    recommendations: RecommendationItemDto[];
}
