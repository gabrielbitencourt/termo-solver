const fs = require('fs');
const { readFile } = require('fs/promises');

const files = ['todos', 'todos-br']
const streams = [];
for (const file of files) {
    // streams.push(new Promise(resolve =>
    // {
    //     const result = [];
    //     const stream = fs.createReadStream(`./${file}.txt`);
    //     let current = '';
    //     stream.on('data', (chunk) => 
    //     {
    //         current += chunk.toString(`ascii`);
    //         const splitted = current.split('\n');
    //         if (splitted.length)
    //         {
    //             current = splitted.splice(0, -1).join('');
    //             result.push(...processLine(splitted));
    //         }
    //     });
    //     stream.on('end', () => resolve(result))
    // }));
    streams.push(new Promise(async resolve =>
        {
            const processed = await readFile(`./${file}.txt`, { encoding: 'ascii' }).then(text => processLines(text.split('\n')));
            resolve(processed)
        }))
}

Promise.all(streams).then((values) => {
    fs.writeFile(`./b-${Date.now()}.txt`, values[0].concat(values[1]).join('\n'), (err) => console.log(err));
});


/**
 * 
 * @param {string[]} lines
 */
function processLines(lines) {
    return lines.filter(line => line.length > 4 && /^[a-zA-Z]{3,}$/.test(line.split('\t')[1])).map((line, index) => {
        const splitted = line.split('\t');
        return `${splitted[1].toLowerCase()} ${splitted[0]}`
    });
}
