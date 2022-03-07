import { IGuess } from "./guess";

export interface IGuesser
{
    guess: (history: IGuess[]) => string;
    reset: () => void;
}