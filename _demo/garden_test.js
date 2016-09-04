var examples = [
    'add given 3 to 1',
    'add 3 to 1',
    'add 3 to 1 ; this is a comment',
    'set a to 1\nlog a',
    'set a to \'abcd\'\nlog a',
    'add 1 to ( add 2 to 1 )',
    'add 1 to (add 2 to 1)',
    'add (add 2 to 1) to 1',
];



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

///////////////////////////////////////////////////////////////////////////////

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
        if(i % 2 === 0) { key = v; }
        if(i % 2 === 1) { params[key] = valueify(v); }
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

examples.forEach(function(example, exampleIndex) {
    console.log('=== Example ' + exampleIndex + ' ===');
    var lines = example.split(tokens.lineBreak);
    lines.forEach(function(line, lineIndex) {
        var input = line;
        input = removeComment(input);
        input = tokenize(input)
        var result = runCall(input);
        if(lineIndex === lines.length - 1) {
            console.log(result);
        }
    });
});
