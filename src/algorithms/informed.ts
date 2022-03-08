import { Game } from "../game";
import { CorrectnessHelper, Correctness } from "../models/correctness";
import { IGuess } from "../models/guess";
import { IGuesser } from "../models/guesser";
import { dictionary } from "../static/dictionary";
import { frequencies } from "../static/frequencies";

type Candidate = { word: string; count: number; score: number; };

export class Informed implements IGuesser
{
    reamaining: Candidate[];
    constructor()
    {
        this.reamaining = dictionary.map(word => ({ word, count: frequencies[word] ?? 0, score: 0 }))
    }

    guess(history: IGuess[]): string
    {
        if (history.length)
        {
            const last = history[history.length - 1];
            this.reamaining = this.reamaining.filter(candidate => Informed.allows(last, candidate.word))
        }
        else
        {
            return "estar";
        }

        const remainingCount = this.reamaining.reduce((acc, prev) => acc + prev.count, 0);
        let best: Candidate | undefined;
        for (const candidate of this.reamaining) {
            let sum = 0;
            for (const pattern of CorrectnessHelper.allPatterns()) {
                const sumInPattern = this.reamaining.reduce((sum, possibleCandidate) => sum + (Informed.allows({ word: candidate.word, correctness: pattern }, possibleCandidate.word) ? possibleCandidate.count : 0), 0);
                if (sumInPattern === 0) continue;
                const pOfThisPattern = sumInPattern / remainingCount;
                sum = sum + (pOfThisPattern * Math.log2(pOfThisPattern))
            }
            candidate.score = -sum;
            if (!best)
            {
                best = candidate;
                console.log(`starting with ${best.word} and ${best.score}`);
            }
            else if (candidate.score > best.score)
            {
                best = candidate;
                console.log(`${best.word} is better with ${best.score}`);
            }
        }
        return (best?.word) as string;
    }

    reset()
    {
        this.reamaining = dictionary.map(word => ({ word, count: frequencies[word] ?? 0, score: 0 }))
    }

    static allows(last: { word: string, correctness: Correctness[] }, candidate: string): boolean
    {
        return Game.check(last.word, candidate).toString() === last.correctness.toString();;
    }
    
}