var fs = require('fs');
var output = [];
var assert = /\=\>/g;

[
    '00_expressions',
    '01_comments'
].forEach(function(folder) {
    var files = fs.readdirSync(folder);
    files.forEach(function(file) {
        var data = fs.readFileSync('./' + folder + '/' + file, 'utf8');
        var test = data.split(assert);
        output.push({
            folder: folder,
            file: file,
            case: test[0].trim(),
            expect: test[1].trim(),
        });
    });
});

fs.writeFile('./tests.json', JSON.stringify(output, null, 4));
