export enum Correctness {
    CORRECT,
    MISPLACED,
    WRONG
}

export class CorrectnessHelper {
    static fromStr(pattern: string): Correctness[] {
        const result: Correctness[] = [];
        for (const c of pattern) {
            switch (c) {
                case "C":
                    result.push(Correctness.CORRECT);
                    break;

                case "M":
                    result.push(Correctness.MISPLACED);
                    break;

                case "W":
                    result.push(Correctness.WRONG);
                    break;
                
                case " ":
                    break;

                default:
                    throw new Error("Invalid pattern");
            }
        }
        return result;
    }
}