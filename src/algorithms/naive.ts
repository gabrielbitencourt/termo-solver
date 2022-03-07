import { Game } from "../game";
import { Correctness } from "../models/correctness";
import { IGuess } from "../models/guess";
import { IGuesser } from "../models/guesser";
import { dictionary } from "../static/dictionary";
import { frequencies } from "../static/frequencies";

type Candidate = { word: string; count: number; };

export class Naive implements IGuesser
{
    reamaining: Candidate[];
    constructor()
    {
        this.reamaining = dictionary.map(word => ({ word, count: frequencies[word] ?? 0 }))
    }

    guess(history: IGuess[]): string
    {
        if (history.length)
        {
            const last = history[history.length - 1];
            this.reamaining = this.reamaining.filter(candidate => Naive.allows(last, candidate.word))
        }

        let best: Candidate | undefined;
        for (const remaining of this.reamaining) {
            if (!best || remaining.count > best.count)
            {
                best = remaining;
                continue;
            }
        }
        return (best as Candidate).word;
    }

    reset()
    {
        this.reamaining = dictionary.map(word => ({ word, count: frequencies[word] ?? 0 }))
    }

    static allows(last: { word: string, correctness: Correctness[] }, candidate: string): boolean
    {
        return Game.check(last.word, candidate).toString() === last.correctness.toString()
    }
}