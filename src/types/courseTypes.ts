
export interface TocItem {
  id: string;
  title: string;
  est_minutes: number;
  content: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizContent {
  question_text: string;
  options: QuizOption[];
  correct_answer_value: string;
}

export interface ScenarioContent {
  scenario_text: string;
  prompt_question: string;
}

export interface SimulationContent {
  description: string;
}

export interface ImageContent {
  image_url: string;
  alt_text: string;
  caption: string;
}

export interface VideoContent {
  video_id: string;
  thumbnail_url: string;
  video_title_api: string;
  description: string;
  source_info?: string;
}

export interface EngagementCard {
  id: string;
  type: 'quiz' | 'scenario' | 'simulation';
  title: string;
  content: QuizContent | ScenarioContent | SimulationContent;
}

export interface ResourceCard {
  id: string;
  type: 'image_illustration' | 'youtube_video';
  title: string;
  content: ImageContent | VideoContent;
}

export interface ModuleData {
  module_id: string;
  title: string;
  rationale: string;
  est_minutes: number;
  toc_items: TocItem[];
  engagement_cards: EngagementCard[];
  resource_cards: ResourceCard[];
}
