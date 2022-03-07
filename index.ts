import { Naive } from "./src/algorithms/naive";
import { Game } from "./src/game";
import { answers } from "./src/static/answers";

const MAX_GAMES = answers.length - 1;
const MAX_TRIES = 32;
const ALGORITHM = 'naive';
const ALGO_MAP  = {
    'naive': Naive
}

function main(args: string[])
{
    const game = new Game();
    const guesser = new ALGO_MAP[ALGORITHM]();

    let sum = 0;
    for (const answer of answers.slice(0, MAX_GAMES))
    {
        console.log(`starting game with '${answer}'`);
        const solved = game.play(answer, guesser, MAX_TRIES);
        console.log(`solved '${answer}' in ${solved} tries`);
        sum = sum + solved;
        guesser.reset();
    }
    console.log(`played ${MAX_GAMES} games with average score of ${sum / MAX_GAMES}`);
}

main(process.argv);
