export type WeightLevel = 1 | 2 | 3 | 4 | 5;

export interface Argument {
  id: string;
  text: string;
  weight: WeightLevel;
}

export interface Decision {
  id: string;
  title: string;
  pros: Argument[];
  cons: Argument[];
  createdAt: Date;
  updatedAt: Date;
}

export type QuizResult = {
  title: string;
  description: string;
  action: string;
  color: string;
  emoji: string;
};

export type SadQuizHistory = {
  id: string;
  date: string;
  answers: boolean[];
  result: string;
  resultEmoji: string;
  resultColor: string;
};
