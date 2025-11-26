export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface Answer {
  questionId: number;
  selectedIdx: number | null;
}
