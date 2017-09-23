The Grove Language Specification
===============================================================================

I release this document under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) and [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Version 0.0.0

Table of Contents
--------------------------------------------------------------------------------

- [The Grove Language Specification](#)
  - [1. Foundation](#)
    - [1.1 Principles](#)
    - [1.2 Influences](#)
    - [1.3 Definitions](#)
  - [2. Core Language](#)
    - [2.1 Tokens](#)
    - [2.2 Types](#)
      - [2.2.1 None](#)
      - [2.2.2 Boolean](#)
      - [2.2.3 Number](#)
      - [2.2.4 String](#)
      - [2.2.5 Tuple](#)
      - [2.2.6 List](#)
      - [2.2.7 Set](#)
      - [2.2.8 Group](#)
      - [2.2.9 Map](#)
      - [2.2.10 Object](#)
    - [2.3 Expressions, Functions, References, Scope](#)
      - [2.3.1 Blocks and Termination](#)
      - [2.3.2 Calling and Defining Functions](#)
      - [2.3.3 References, Get and set](#)
      - [2.3.4 Comments](#)
    - [2.4 Control Structures](#)
      - [2.4.1 Conditions](#)
      - [2.4.2 Loops](#)
      - [2.4.3 Exceptions](#)
    - [2.5 Modules](#)
    - [2.6 Concurrency](#)
  - [3. Environment](#)
    - [3.1 Universal Functions](#)
    - [3.2 Execution Rules: Build and Run](#)
    - [3.3 Standard Library](#)
  - [4. Aliases](#)
    - [4.3 Comprehensions](#)
    - [4.4 Destructuring](#)
    - [4.5 Inline-Block](#)
    - [4.6 Ternary operation](#)
    - [4.7 Pipe](#)
  - [5. Extras](#)
    - [5.1 Implementation Checklist](#)
    - [5.2 Best Practices](#)
    - [5.3 Examples](#)
      - [5.3.1 Quicksort](#)

1. Foundation
--------------------------------------------------------------------------------

Grove may be a programming language. Or not. This document describes what Grove is, but does not describe what Grove is not. Grove may be implemented in whatever way you might dream. Anywhere you want Grove to be, make it.

TODO vet document for casual and active voice.

### 1.1 Principles

- Read out-loud as is.
- Omit the obvious, but be explicit.
- Prefer one way to do things, and explain exceptions.
- Separate data, functions, and references.
- Flat, not abstracted.
- Isolate modules.
- Safety by observation.

### 1.2 Influences

Lisp, Hypertalk, Python, JavaScript/Coffeescript, Go.

### 1.3 Definitions

TODO write out definitions

- **Type**:
- **Value**:
- **Token**:
- **Symbol**:
- **Expression**:
- **Variable**:
- **Block**:
- **Scope**:
- **Boolean**:
- **Character**:
- **String**:
- **Number**:
- **Infinity**:
- **Function**:
- **Parameter**:
- **Key**:
- **Control Structure**:
- **Module**:
- **Concurrency**:
- **Standard Library**:

2. Core Language
--------------------------------------------------------------------------------

### 2.1 Tokens

TODO Write tokens section

TODO Universal UTF-8

**Symbols**

- `Space`: Separator between tokens.
- `Newline`: Ends a statement. A new line within parenthesis or literal definition does not end a statement. Newlines must use the Unix character.
- `Two Spaces` at the beginning of a line: Indents. Tabs or other cadences of spaces cannot be used.
- `()`: Call a function. This is often optional.
- `'`: String definition. Two must be used within a single line. One by itself indicates a multiline string.
- `;`: Begins a comment. On a line by itself, indicates a multiline comment.
- `[]`: Defines an immutable tuple.
- `$[]`: Defines a mutable list.
- `{}`: Defines an immutable set.
- `${}`: Defines a mutable group.
- `{=}`: Defines an immutable map.
- `${=}`: Defines a mutable object.

**Allowed Reference Names**

`[$~]?[a-zA-Z0-9unicode]+` TODO how to represent unicode?

**Keywords**

- `none`
- `true`
- `false`
- `do`
- `return`
- `if`
- `else`
- `for`
- `break`
- `continue`
- `try`
- `catch`
- `raise`
- `branch`

### 2.2 Types

Grove only has three types of things: data, functions, and references.

**Data**. Immutable examples are boolean, numbers, strings, tuples, and maps. Mutable lists and objects are also available. There are no secondary or user-defined types.

**Functions**. Functions are first-class. Data does not own functions. Methods do not exist.

**References**. References, or variables, are plain text in Grove. References may refer to data or functions. References always denote mutable types with a prefixed `$`. References that may be mutable or immutable are prefixed with `~`.

#### 2.2.1 None

The most basic data type is none. It is always falsy. It is always immutable.

```
  none
```

#### 2.2.2 Boolean

Booleans. Always immutable.

```
  true
```

#### 2.2.3 Number

Only one type of number. Numbers are always immutable.
Each data type has one falsy value: for numbers, its 0.

```
  42
```

TODO Complex Numbers

#### 2.2.4 String

Strings use only the single-quote `'` character. Regular expressions are just strings.
`\'` is the escaped version of the single quote character.
 `''`, empty string, is the falsy value. Strings are always immutable.

```
  'abcd'
```

Strings can be defined in multiple lines with indentation just like comments. The indentation is stripped.

```
  '
    abcd
    1234
```

#### 2.2.5 Tuple

Tuples are defined with `[]`. Tuples are zero-indexed.
The falsy value of tuple is the empty tuple, `[]`. Tuples are immutable.
Tuples can only store other immutable data types, such as boolean, number, string, tuple, and map.

```
  [1 2 3]
```

Tuples do not differentiate between the kind of whitespace, so we can just as easily write:

```
  [
    1
    2
    3
  ]
```

A tuple statement would be like

```
  set column [1 2 3]
```

The read out-loud equilavent would be `set column to (tuple of 1 2 3)`. The read out-loud version breaks the syntax rules. Either way we are creating new syntax. The `[]` for is common, known, easy to learn, and only 'one-level' from the principle of read out-loud as is.

#### 2.2.6 List

Lists are defined with `$[]`.
The falsy value of list is the empty list, `$[]`. Lists are like tuples, but mutable.
Lists can store immutable data, mutable data, and functions. Lists only store references.

```
  $[1 2 3]
```

#### 2.2.7 Set

Sets are defined with `{}`. The falsy form of set is an empty set, `{}`.
Sets are unordered. Sets support embedding.
Sets are immutable. Sets may only store immutable data types.

```
  {1 2 3}
```

Sets may be also written as:

```
  {
    1
    2
    3
  }
```

The read out-loud equilavent would be `set column to (set of 1 2 3)`. The read out-loud version breaks the syntax rules. Either way we are creating new syntax. The `{}` for is common, known, easy to learn, and only 'one-level' from the principle of read out-loud as is.

#### 2.2.8 Group

Groups are like sets, but mutable. They are defined with `${}`.
The falsy group is the empty group.
Groups can store immutable data, mutable data, and functions. Groups only store references.

```
  ${1 2 3}
```

#### 2.2.9 Map

Maps are defined with `{}`. The falsy form of map is an empty map, `{=}`.
Maps are unordered. Maps support embedding.
Maps are immutable. Maps may only store immutable data types.

```
  {'a'=1 'b'=2 'c'=3}
```

The pattern is always:

```
  {key=value key=value key=value ...}
```

Maps may be also written as:

```
  {
    'a'=1
    'b'=2
    'c'=3
  }
```

The read out-loud equilavent would be `set myMap to (map where 'a' is 1, 'b' is 2, 'c' is 3)`. The read out-loud version breaks the syntax rules. Either way we are creating new syntax. The `{}` for is common, known, easy to learn, and only 'one-level' from the principle of read out-loud as is.

#### 2.2.10 Object

Objects are like maps, but mutable. They are defined with `${}`.
The falsy object is the empty object.
Objects can store immutable data, mutable data, and functions. Objects only store references.

```
  ${'a'=1 'b'=2 'c'=3}
```

### 2.3 Expressions, Functions, References, Scope

#### 2.3.1 Blocks and Termination

Statements are terminated with the new line character.

Grove is whitespace sensitive. Two spaces per indent is enforced.

#### 2.3.2 Calling and Defining Functions

Functions are called simply by having a reference to the function the first in the group.

```
  add 1 2
```

Function calls always take the following format. The first set of parens per line is optional. As many keys and values may be used as desired.

```
  (functionName arg1 arg2 arg3 ...)
```

Parentheses can be used to have multiple function calls in a single line.

```
  add 1 (divide 3 4)
```

When you call a function with zero, one, or two arguments, omit the argument keys.

```
  add 1 2
```

For three or more arguments, you must use the argument keys.

```
  handleHttp method='GET' path='/keys' function=listKeys
```

You may also use the reference names as argument keys.

```
  set method 'GET'
  set path '/keys'
  set function listKeys
  handleHttp method path function
```

The anonymous function is defined as: `do arg1 arg2 ... \n block`

```
  do col
    divide (sum col) (length col)
```

Define functions using the following formation. `do` has special powers: you do not need to use parantheses around `do`.

```
  set average do col
    divide (sum col) (length col)
```

Every statement is an expression, so returns are only needed when wanting to return early.

```
  set average do col
    if equal (length col) 0
      return 0
    divide (sum col) (length col)
```

Functions may be passed by reference as arguments to other functions. If a function reference is not the first it its group, the function is passed as reference.

```
  set col [1 2 3]
  set addThree do num
    add num 3
  map col addThree
```

#### 2.3.3 References, Get and set

References are set using the `set` function. The first argument is the reference, the second argument is the value.

```
  set a 1
```

References are dynamic, so they can change type.

```
  set a 1
  set a 'abcd'
```

References are always lexically scoped.

```
  set a 0  ; `a` is scoped to the module
  set f do   ;  function declaration with `do`
    set b 2  ; `b` is scoped to the function `f`
    if equal a b
      set a 5  ; `a` still has module scope
      set c 3  ; `c` is scoped to `if`
```

TODO add an example of Closures

Any references to mutable data types, such as list or object, *must* start with a `$`.

```
  set $a $[1 2 3]
```

The `get` and `set` methods exist on all tuples, lists, sets, groups, maps, and objects, respecting the mutability characteristic. A `set` operation will always return the full value of the iterable.

```
  set a (get myMap 'key')
```

#### 2.3.4 Comments

Comments start with a semicolon.

```
  ; This is a comment.
```

Semicolons are the comment character because semicolons:
  a) require only one key,
  b) are easy to reach, and
  c) aren't mistaken for another operation.
Comments may be in block format.
Indentation is 2 spaces.

```
  ;
    This
    is a
    block comment.
```

### 2.4 Control Structures

#### 2.4.1 Conditions

Conditions use the keywords `if` and `else`. Conditions are also expressions.

```
  set c (if equal a b
    true
  else
    false)
```

Of course, the previous example could be written more simply.

```
  set c (equal a b)
```

Conditions do not convert type. Comparing two non-matching types results in an error.

```
  if equal 0 (toNumber '')
    true
```

`if` does not require parentheses around the first function call.

```
  ; these two lines are the same
  if lessThan a 5
    true
  if (lessThan a 5)
    true
```

#### 2.4.2 Loops

`for` loops also do not require parentheses around the first function call.

```
  set myTuple [1 2 3]
  for set [_ num] (range myTuple)
    log num
```

`for` loops are aware of the data type because the range function can handle multiple types.

```
  set myTuple [1 2 3]
  set myMap {'a'=1 'b'=2 'c'=3}

  for set [index num] (range myTuple)
    log (concat index num)

  for set [key value] (range myMap)
    log (concat key value)
```

You can use `_` to ignore parts you don't need.

```
  set myTuple [1 2 3]
  for set [_ num] (range myTuple)
    log num
```

`for` loops can also act like `while` loops.

```
  set a 0
  for lessThan a 5
    set a (add 1 a)
```

Breaks and continues are allowed as well.

```
  for set [_ num] (range myTuple)
    if lessThan num 5
      break
    if greaterThan num 5
      continue
    doSomething num
```

#### 2.4.3 Exceptions

Try and catch blocks work very similar to other languages.

```
  try
    divide 1 0
  catch exception
    log exception
```

TODO add an example for raise
TODO raise any immutable type (number, string, tuple, set, map etc) as an error

### 2.5 Modules

Files are treated as modules, with their own namespaces.
If a cycle is formed with `import`, the compiler will throw an error.
Everything in the module is made available.

```
  set myModule (import './path/to/module')
```

Access functions and other references in modules with the `get` function.

```
  set math (import './math')
  set average (get math 'average')
```

TODO main function

### 2.6 Concurrency

Grove has a similar concurrency model to Go. You can `branch` a call to run at the same time. Like `if` and `for`, branch does not require parenthesis around the first function call.

```
  for set [_ i] (range x)
    branch log i
```

You can create a channel to pass values between branches.

```
  set ch (createChannel)
  branch myFunc ch
```

Grove will pause in any branch when it arrives at `receive`.

```
  receive channel value
```

Grove will resume in any branch when the computer tells the channel to `send`.

```
  send channel value
```

3. Environment
--------------------------------------------------------------------------------

### 3.1 Universal Functions

When should a function be universal, as opposed to part of the standard library?

- When the function is absolutely critical to using the language. Basically every module would use it.
- When the function is so commonly used that it would make sense to alias, such as `add` => `+`. Examples are math and comparisons.
- When the function transcends types and modules. Examples are logging or type conversion.

Basic, universal functions.

- `set`:
  - reference _T_ -> reference
  - (tuple|list) number _T_ -> _T_
  - (map/object) (none|boolean|number|string|tuple) _T_ -> _T_
- `get`:
  - (tuple|list) number -> _T_
  - (map/object) (none|boolean|number|string|tuple) -> _T_
- `import`: string -> module
- `send`: channel _T_ -> _T_
- `receive`: channel reference -> reference
- `range`
  - (tuple|list|map|object) -> tuple (iterable)
  - set|group -> _T_ (iterable)

Math functions that get aliased.

- `add`: number number -> number
- `subtract`: number number -> number
- `multiply`: number number -> number
- `divide`: number number -> number
- `power`: number number -> number
- `modulus`: number number -> number

Comparison functions that get aliased.

- `not`: boolean -> boolean
- `all`: [_T_] -> boolean
- `any`: [_T_] -> boolean
- `equal`: _A_ _A_ -> boolean; where _A_ is none|boolean|string|number
- `is`: _A_ _A_ -> boolean
- `not`: _A_ _A_ -> boolean
- `lessThan`: _A_ _A_ -> boolean
- `greaterThan`: _A_ _A_ -> boolean
- `lessThanOrEqual`: _A_ _A_ -> boolean
- `greaterThanOrEqual`: _A_ _A_ -> boolean

Logging... because its the first thing people will do.

- `log`: _T_ -> _T_
- `warn`: _T_ -> _T_
- `error`: _T_ -> _T_

Type conversions transcend type.

- (can't convert to none)
- `toBoolean`: any -> boolean
- `toNumber`: none|boolean|string -> number
- `toString`: any -> string
- `toTuple`: list|set|group -> tuple
- `toList`: tuple|set|group -> list
- `toSet`: tuple|list|group -> set
- `toGroup`: tuple|list|set -> group
- `toMap`: object -> map
- `toObject`: map -> object
- `getType`: any -> string

- TODO to consider... format, slice

### 3.2 Execution Rules: Lint, Build, and Run

- TODO Autoformat
- TODO Autoupgrade lang version
- TODO stand alone / repl (?)
- TODO error outputs, stacks etc. Write error messages in affirmative, active, casual, and not overly technical, language. Demonstrate when possible (did you mean...?). The compiler may refer to itself as `I`.

* * *

- Each indent should be two spaces per indent.
- Functions must contain less than ten statements.
- Blocks must not go more than four levels deep.
- One empty line should be after each block.
- Two spaces should be before starting an inline comment.
- Variable names should use camelCase.
- All imports should be used.
- All variables should be used.
- No lines should have trailing whitespace.
- Lines should be no longer than 80 characters.
- Types must match to do a comparison.
- Any compiler or linter for Grove should statically check primitive types (none, boolean, number, string, tuple, list, map, object, module) to ensure the types match correctly. This static type check must be done without the use of type annotations. Static type checking should allow that variables can change type, essentially creating a union type.
- A linter should check to ensure that the tuple and list indexes and map and object keys as used are defined and within range, and return the expected, and if not a condition statement is used to prevent the use of an unexpected index or key.
- A reference to a mutable data type should be prefixed with `$`.
  - `~` prefix indicates the referenced data _may_ be mutable or immutable, in the case of a function argument.
- Check for any unused code.
- Check for duplicated code.

### 3.3 Standard Library

- TODO Note where something would be a browser specific library or a server/local specific library.
- Functions in modules in the standard library should not be nested past one level. (e.g. math.abs  instead of math.number.abs )
- Function names should always be verbs or start with verbs.
- Function name should be comprehensive (e.g. loadJson v load).

#### TODO Logging

The functions `log`, `warn`, and `error` are universal. The logging module helps figure out where the logging should go.

#### TODO Strings and Regular Expressions

- Formatting
- Matching

#### TODO Numbers and Mathematics

- TODO Infinity (?)
- TODO Vector and Matrix operations
- TODO complex numbers
- TODO fractions
- TODO statistics
- TODO geometry / trig

#### TODO Collections (Tuples, Lists, Maps, Objects)

- append
- concat
- slice
- filter
- sort
- map
- forEach
- reduce

- TODO Collection operations instead of loops -- functional programming
- TODO and others, such as Stacks, etc over the default types
- TODO iterators
- TODO sorting
- TODO Schema Helpers: Basically, utilities for ensuring schemas for maps and objects.

#### TODO Dates and Times

TODO what basic type should represent datetimes? Number, String, or Map?

#### TODO Streams, Files and Directories

#### TODO Network

- TODO HTTP, SSL, sockets
    - CGI
    - URL: Formatting, parsing strings for IP, domain, path, query string etc
    - Server
    - Headers / cookies
- TODO Email (pop, imap, smtp, etc)
- TODO HTML
- TODO FTP (?)
- TODO Telnet (?)

#### TODO Transformation (Encoding and Decoding)

- TODO JSON
- TODO YAML
- TODO CSV
- TODO SQL
- TODO XML (?)
- TODO markdown
- TODO Base64
- TODO hex
- TODO Compression and decompression algorithms (tar, zip, etc)
- TODO Hashing and Encryption
- TODO Generate IDs (UUID, others)

#### TODO Operating System

- TODO Execution (parsing command line, etc)
- TODO Signals
    - exit
- TODO Users and permissions
- TODO foreign function interface

#### TODO Concurrency Helpers

#### TODO Multimedia

- TODO Images
    - Fonts
- TODO Audio and sound generation/synthesis
- TODO Video
- TODO 2d/3d graphics
- TODO Graphing (from stats library)

#### TODO Localization

#### TODO Graphical User Interfaces (for native applications)

- TODO Accessibility

#### TODO Browser interaction

- TODO DOM

#### TODO Testing

- Unit testing
    - Structure
    - Assertions
    - Coverage
    - Spy/stub
- Debugging
- Performance
- Documentation

#### TODO Dependency Management

- Semver

4. Aliases
--------------------------------------------------------------------------------

Aliases are opt-in language features that can reduce some verbosity from the language, at the cost of some consistency.

_Grove runs without aliases by default._ A project may be configured to default to have aliases enabled.

### 4.3 Comprehensions

A few languages offer comprehensions as an alternative iterate-to-generate interface.

```
  [(divide num by 3) for set [_ num] in (range myTuple)]
```

TODO Add an example of Map / Object comprehensions

### 4.4 Destructuring

`for set [...] to (range ...)` statements already provide a most basic destructuring. This alias will turn on destructuring across the board.

```
  set [a b] to [1 2]
  set {a b} to {'a'=1 'b'=2}
```

TODO examples of list, set, group, object

### 4.5 Inline-Block

Sometimes, having to hit return just for a single-line block doesn't feel right. This alias enables a work-around. The colon character here replaces the newline plus indent.

```
  map lis by (do value: divide value by 3)
```

### 4.6 Ternary operation

Sometimes, having a single line set a value conditionally is convenient.

```
  set a to (if compare a as b then a else b)
```

### 4.7 Pipe

Sometimes, we can lose the "step-by-step" feel, and the pipe alias can help restore this feeling by letting us chain functions. The previous value is passed to the succeeding function as the given (first) argument. Pipes may be used on the same line or on succeeding indented lines.

```
  set b a
    | filter by filteringTest
    | map by updater
    | sort by conditionalTest
    | reduce by reducer after 0
```

TODO add an alias for Module import (see golang)

TODO default arg (?)

TODO switch/match (?)

5. Extras
--------------------------------------------------------------------------------

### 5.1 Implementation Checklist

TODO

### 5.2 Best Practices

TODO

### 5.3 Examples

#### 5.3.1 Quicksort

A mutable quicksort implementation.

```
set quicksort do ~a
  set [$less $equal $greater] [$[] $[] $[]]
  if greaterThan (length ~a) 1
    set pivot (random (length ~a))
    for set [_ x] (range ~a)
      if lessThan x pivot
        append $less x
      if equal x pivot
        append $equal x
      if greaterThan x pivot
        append $greater x
    return concat [(quicksort $less) $equal (quicksort $greater)]
  return ~a
```

#### 5.3.2 REST-ful service

```
set {handleHttp listenAndServe} (import 'http')
set {runQuery} (import 'database')

set main do
  set port 8573
  handleHttp method='GET' path='/keys' function=listKeys
  handleHttp method='GET' path='/keys/{id}' function=getKey
  handleHttp method='POST' path='/keys' function=createKey
  handleHttp method='PUT' path='/keys/{id}' function=updateKey
  log (format 'Server started on {port}' port)
  listenAndServe port

; Zero, one, two arguments -> call linearly or keys
; Three+ arguments -> use keys

set listKeys do request
  set query '
    SELECT *
    FROM keys;
  set rows (runQuery query) ; keys are var names
  if not rows
    return [404 {message='Not Found'}]
  return [200 rows]

set getKey do request id
  set query '
    SELECT *
    FROM keys
    WHERE id={id};
  set rows (runQuery query id) ; keys are var names
  set row (get rows 0)
  if not row
    return [404 {message='Not Found'}]
  return [200 rows]

set createKey do request
  set query '
    INSERT INTO keys (value)
    VALUES ({value});
  set value (get request 'value')
  set row (runQuery query value)
  if not row
    return [400 {message='Bad Parameters'}]
  return [200 row]

set updateKey do request id
  set query '
    UPDATE keys
    SET value = {value}
    WHERE id = {id};
  set row (runQuery id value) ; keys are var names
  if not row
    return [400 {message='Bad Parameters'}]
  return [200 row]
```

TODO add more examples
