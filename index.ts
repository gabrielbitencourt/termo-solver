import arg from "arg";
import { Informed } from "./src/algorithms/informed";
import { Naive } from "./src/algorithms/naive";
import { Game } from "./src/game";
import { answers } from "./src/static/answers";
import { dictionary } from "./src/static/dictionary";

const args = arg({
    '--max-games': Number,
    '--max-tries': Number,
    '--algo': String,
    '--answers': String,
    '-g': '--max-games',
    '-t': '--max-tries',
    '-a': '--algo',
    '-s': '--answers'
});

const ANSWERSET = args['--answers'] === 'full' ? dictionary : answers;
const MAX_GAMES = args['--max-games'] ?? ANSWERSET.length;
const MAX_TRIES = args['--max-tries'] ?? 12;
const ALGORITHM = args['--algo'] ?? 'informed';
const ALGO_MAP: { [algo: string]: any }  = {
    'naive': Naive,
    'informed': Informed
};

function main()
{
    if (!Object.keys(ALGO_MAP).includes(ALGORITHM)) return -1;
    const game = new Game();
    const guesser = new ALGO_MAP[ALGORITHM]();

    let sum = 0;
    for (const answer of ANSWERSET.slice(0, MAX_GAMES <= ANSWERSET.length ? MAX_GAMES : ANSWERSET.length))
    {
        console.log(`starting game with '${answer}'`);
        const solved = game.play(answer, guesser, MAX_TRIES);
        console.log(`solved '${answer}' in ${solved} tries`);
        sum = sum + solved;
        guesser.reset();
    }
    console.log(`played ${MAX_GAMES} games with average score of ${sum / MAX_GAMES}`);
}



main();
