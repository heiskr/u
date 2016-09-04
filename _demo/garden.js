var tokens = {
    space: /\s+/gi,
    lineBreak: /\n+/g,
    semicolon: /;/g,
    variable: /\w+/gi,
    string: /\'\w+\'/gi,
    number: /\d+(\.\d+)?/g,
    openParen: /\(/g,
    closeParen: /\)/g,
};

var prepositions = [
    'to',
    'with',
    'as',
    'in',
    'by',
    'into',
    'about',
    'at',
    'before',
    'after',
    'above',
    'below',
    'between',
    'for',
    'from',
    'near',
    'beyond',
    'on',
    'off',
    'inside',
    'outside',
    'over',
    'under',
    'per',
    'since',
    'than',
    'through',
    'toward',
    'until',
    'within',
    'without',
];

///////////////////////////////////////////////////////////////////////////////

var env = {};

var globals = {
    add: function(params) {
        return params.given + params.to;
    },
    set: function(params) {
        env[params.given] = params.to;
    },
    log: function(params) {
        console.log(env[params.given]);
    }
};

function valueify(value) {
    if(value.match(tokens.number)) {
        return Number(value);
    }
    if(value.match(tokens.string)) {
        return value.slice(1, -1);
    }
    if(value.match(tokens.variable)) {
        return env[value];
    }
}

/*

add 1 to ( add 2 to 1 )

['add', {
    given: 1,
    to: ['add', {
        given: 2,
        to: 1
    }]
}]

*/

function runCall(input) {
    var fn = input[0];
    input = input.slice(1);
    var params = {};
    if(input[0] === 'given') { input = input.slice(1); }
    params.given = valueify(input[0]);
    input = input.slice(1);
    var key = null;
    for(var i = 0; i < input.length; i++) {
        var v = input[i];
        if(i % 2 === 0) {
            key = v;
        } else if (v === '(') {
            var closeIndex = input.findIndex(function(token) {
                return token.match(tokens.closeParen);
            });
            var subInput = input.slice(i + 1, closeIndex);
            params[key] = runCall(subInput);
            i = closeIndex + 1;
        } else {
            params[key] = valueify(v);
        }
    }
    var toCall = globals[fn];
    return toCall(params);
}

function removeComment(input) {
    if(input.match(tokens.semicolon)) {
        return input.split(tokens.semicolon)[0];
    }
    return input;
}

function tokenize(input) {
    input = input
        .replace(tokens.openParen, '( ')
        .replace(tokens.closeParen, ' )');
    return input.split(tokens.space);
}

///////////////////////////////////////////////////////////////////////////////

var fs = require('fs');
var examples = JSON.parse(fs.readFileSync('../tests/tests.json', 'utf8'));

examples.forEach(function(example) {
    console.log('=======\n' + example.file);
    console.log(example.case);
    try {
        var lines = example.case.split(tokens.lineBreak);
        var result;
        lines.forEach(function(line, lineIndex) {
            var input = removeComment(line);
            input = tokenize(input);
            result = runCall(input);
            if(lineIndex === lines.length - 1) {
                console.log('=> ' + result);
            }
        });
        var expect = valueify(example.expect);
        if(result === expect) {
            console.log('[√] Passed');
        } else {
            console.log('[x] Failed, expected ' + expect);
        }
    } catch (e) {
        console.log('[x] Failed, ' + e);
    }
});
