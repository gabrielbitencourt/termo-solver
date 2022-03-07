import { Game } from '../src/game';
import { CorrectnessHelper } from '../src/models/correctness';

describe('testando check de tentativas do game', () => {
    test('resposta correta é correta', () => {
        expect(Game.check('abcde', 'abcde').toString())
            .toEqual(CorrectnessHelper.fromStr('CCCCC').toString());
    });

    test('resposta toda errada é toda errada', () => {
        expect(Game.check('abcde', 'fghij').toString())
            .toEqual(CorrectnessHelper.fromStr('WWWWW').toString());
    });

    test('resposta deslocada é toda amarela', () => {
        expect(Game.check('abcde', 'eabcd').toString())
            .toEqual(CorrectnessHelper.fromStr('MMMMM').toString());
    });

    test('aleatorio #1', () => {
        expect(Game.check('aaabb', 'bbaaa').toString())
            .toEqual(CorrectnessHelper.fromStr('MMCMM').toString());
    });

    test('aleatorio #2', () => {
        expect(Game.check('aabbb', 'bbaaa').toString())
            .toEqual(CorrectnessHelper.fromStr('MMMMW').toString());
    });

    test('aleatorio #3', () => {
        expect(Game.check('ababc', 'aabab').toString())
            .toEqual(CorrectnessHelper.fromStr('CMMMW').toString());
    });

    test('aleatorio #4', () => {
        expect(Game.check('ababb', 'aabab').toString())
            .toEqual(CorrectnessHelper.fromStr('CMMWC').toString());
    });

    test('jon #1', () => {
        expect(Game.check('aaccc', 'aabbb').toString())
            .toEqual(CorrectnessHelper.fromStr('CCWWW').toString());
    });

    test('jon #2', () => {
        expect(Game.check('ccaac', 'aabbb').toString())
            .toEqual(CorrectnessHelper.fromStr('W W M M W').toString());
    });

    test('jon #3', () => {
        expect(Game.check('caacc', 'aabbb').toString())
            .toEqual(CorrectnessHelper.fromStr('W C M W W').toString());
    });

    test('jon #4', () => {
        expect(Game.check('aaabb', 'azzaz').toString())
            .toEqual(CorrectnessHelper.fromStr('C M W W W').toString());
    });

    test('jon #5', () => {
        expect(Game.check('aaddd', 'baccc').toString())
            .toEqual(CorrectnessHelper.fromStr('W C W W W').toString());
    });

    test('jon #6', () => {
        expect(Game.check('aacde', 'abcde').toString())
            .toEqual(CorrectnessHelper.fromStr('C W C C C').toString());
    });
});
