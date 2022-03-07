const fs = require('fs');

const dictionary = [];

const file = fs.readFileSync('./b.txt', { encoding: 'utf-8' });

const filtered = file.split('\n').filter(line => line.split(' ')[0].length === 5 && dictionary.indexOf(line.split(' ')[0]) > -1);
console.log(filtered);
fs.writeFile('./frequencies.ts', 'export const frequencies = \n' + JSON.stringify(filtered.reduce((acc, prev) =>
{
    const splitted = prev.split(' ');
    acc[splitted[0]] = (acc[splitted[0]] ?? 0) + parseInt(splitted[1]);
    return acc;
}, {})), console.log);