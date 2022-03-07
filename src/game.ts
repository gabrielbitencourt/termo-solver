import { Correctness, CorrectnessHelper } from "./models/correctness";
import { IGuess } from "./models/guess";
import { IGuesser } from "./models/guesser";

const emojis: { [c: number]: string } = {
    0: '\uD83D\uDFE9',
    1: '\uD83D\uDFE8',
    2: '\uD83D\uDFE5'
};

export class Game
{
    play(answer: string, guesser: IGuesser, max: number = 32): number
    {
        const history: IGuess[] = [];
        for (const tried of Array(max).fill(0).map((_, i) => (i + 1))) {
            const word = guesser.guess(history);
            const guess = {
                word,
                correctness: Game.check(word, answer)
            }
            history.push(guess);
            console.log(`#${tried} tried '${word}' ${guess.correctness.map(c => emojis[c]).join('')}`)
            if (word === answer) return tried;
        }
        return max + 1;
    }

    static check(guess: string, correct: string): Correctness[]
    {
        let answer = correct.slice();
        if (guess.length != 5) throw new Error("Guess should have 5 characters.");
        if (guess == answer) return CorrectnessHelper.fromStr("CCCCC");

        const result: Correctness[] = [];
        let misplaced  = -1;

        for (let index = 0; index < answer.length; index++) {
            if (result[index] != undefined) continue;
            const char = correct[index];
            if (guess[index] === char)
            {
                result[index] = Correctness.CORRECT;
                answer = Game.used(answer, index);
            }
            else if ((misplaced = answer.indexOf(guess[index])) > -1)
            {
                do {
                    if (answer[misplaced] != guess[misplaced])
                    {
                        result[index] = Correctness.MISPLACED;
                        answer = Game.used(answer, misplaced);
                        break;
                    }
                    else if (result[misplaced] === undefined && answer[misplaced] === guess[misplaced])
                    {
                        result[misplaced] = Correctness.CORRECT;
                        answer = Game.used(answer, misplaced);
                    }

                    if (answer.indexOf(guess[index]) === -1)
                    {
                        result[index] = Correctness.WRONG;
                        break;
                    }
                } while ((misplaced = answer.slice(misplaced + 1).indexOf(guess[index]) + misplaced + 1) <= answer.lastIndexOf(guess[index]));
            }
            else
            {
                result[index] = Correctness.WRONG;
            }
        }
        return result;
    }

    private static used(answer: string, used: number): string
    {
        const toArr = answer.split('');
        toArr[used] = '.';
        return toArr.join('');
    }
    
}