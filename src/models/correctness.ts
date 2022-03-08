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
    static allPatterns()
    {
        return this.cartesianProduct([
            [Correctness.CORRECT, Correctness.MISPLACED, Correctness.WRONG],
            [Correctness.CORRECT, Correctness.MISPLACED, Correctness.WRONG],
            [Correctness.CORRECT, Correctness.MISPLACED, Correctness.WRONG],
            [Correctness.CORRECT, Correctness.MISPLACED, Correctness.WRONG],
            [Correctness.CORRECT, Correctness.MISPLACED, Correctness.WRONG],
        ]);
    }
    private static cartesianProduct<T>(a: T[][]): T[][] { // a = array of array
        var i, j, l, m, a1, o = [];
        if (!a || a.length == 0) return a;
      
        a1 = a.splice(0, 1)[0]; // the first array of a
        a = CorrectnessHelper.cartesianProduct(a);
        for (i = 0, l = a1.length; i < l; i++) {
          if (a && a.length)
            for (j = 0, m = a.length; j < m; j++)
              o.push([a1[i]].concat(a[j]));
          else
            o.push([a1[i]]);
        }
        return o;
      }
}