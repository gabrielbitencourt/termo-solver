const answers = [];

const correspondecies = {};

const keys = Object.keys(correspondecies);
const c = Object.values(correspondecies).reduce((acc, prev, index) => { acc[prev] = keys[index]; return acc; }, {});
require('fs').writeFile('./answers.ts', 'export const answers = \n' + JSON.stringify(answers.map(w => c[w] ?? w)), console.log);
