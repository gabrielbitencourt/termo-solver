import { Game } from "../game";
import { IGuess } from "../models/guess";
import { IGuesser } from "../models/guesser";
import { dictionary } from "../static/dictionary";
import { frequencies, total } from "../static/frequencies";

type Candidate = { word: string; frequency: number; };

export class Naive implements IGuesser
{
    reamaining: Candidate[];
    constructor()
    {
        this.reamaining = dictionary.map(word => ({ word, frequency: (frequencies[word] ?? 0) / total }))
    }

    guess(history: IGuess[]): string
    {
        if (history.length)
        {
            const last = history[history.length - 1];
            this.reamaining = this.reamaining.filter(candidate => Game.check(last.word, candidate.word).toString() === last.correctness.toString())
        }
        // else
        // {
        //     return ""
        // }

        let best: Candidate | undefined;
        for (const remaining of this.reamaining) {
            if (!best || remaining.frequency > best.frequency)
            {
                best = remaining;
                continue;
            }
        }
        return (best as Candidate).word;
    }

    reset()
    {
        this.reamaining = dictionary.map(word => ({ word, frequency: (frequencies[word] ?? 0) / total }))
    }
}