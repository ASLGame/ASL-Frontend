export interface Cell {
  letter?: string;
  position: number;
  isSubmitted: boolean;
  isCorrect?: boolean;
  isCorrectLocation?: boolean;
}
