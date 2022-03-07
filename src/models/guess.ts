import { Correctness } from "./correctness";

export interface IGuess
{
    word: string;
    correctness: Correctness[]
}