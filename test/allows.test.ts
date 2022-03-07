import { Naive } from "../src/algorithms/naive";
import { CorrectnessHelper } from "../src/models/correctness";

describe('testando check do game para permitir ou não próximas tentativas de palavras', () => {
    test('should allow #1', () => {
        expect(Naive.allows({ word: 'afago', correctness: CorrectnessHelper.fromStr('MMWMC') }, 'fogao')).toEqual(true);
    });

    test('should disallow #1', () => {
        expect(Naive.allows({ word: 'grafo', correctness: CorrectnessHelper.fromStr('MWMMC') }, 'afago')).toEqual(false);
    });
});