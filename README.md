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
    - [4.1 Set](#)
    - [4.2 Getters and Setters](#)
    - [4.3 Comprehensions](#)
    - [4.4 Destructuring](#)
    - [4.5 Inline-Block](#)
    - [4.6 Ternary operation](#)
    - [4.7 Pipe](#)
    - [4.8 Comparison Operators](#)
    - [4.9 Mathematical Operators](#)
    - [4.10 Operator Precedence](#)
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
- **Alias**:
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

**Prepositions**

This is the official list of prepositions. Do not use other prepositions. In parenthesis are unused alternatives.

- about
- after (since, beyond, past)
- against (versus)
- as (like)
- at
- before
- but (except, less, without, yet)
- by (via)
- from
- in (between, within, into, inside)
- near (around)
- of
- off
- on (onto)
- out (outside)
- over (above)
- per (for)
- to (until, toward, through)
- under (underneath, below, beneath)
- when (if, during, upon)
- with

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
  set column to [1 2 3]
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
The first argument is the _given_ argument.
After the first argument, prepositions are used before each argument as keywords.
After the first argument, arguments may take any order.

```
  add 1 to 2
```

Function calls always take the following format. The key `given` is always optional. The first set of parens per line is optional. As many keys and values may be used as desired.

```
  (functionName given givenArg key value key value ...)
```

Parentheses can be used to have multiple statements in a single line.

```
  add 1 to (divide 3 by 4)
```

The anonymous function is defined as: `do (given) arg1 (preposition) arg2 ... \n block`
Functions always have a _given_ first argument, and all following arguments are keyword by prepositions.

```
  do col
    divide (sum col) by (length col)
```

Define functions using the following formation:

```
  set average to do col
    divide (sum col) by (length col)
```

Every statement is an expression, so returns are only needed when wanting to return early.

```
  set average to do col
    if compare (length col) as 0
      return 0
    divide (sum col) by (length col)
```

Functions may be passed by reference as arguments to other functions. If a function reference is not the first it its group, the function is passed as reference.

```
  map col by add
```

#### 2.3.3 References, Get and set

References are set using the `set` function, where the `given` argument is the reference and accepts an argument `to`.

```
  set a to 1
```

References are dynamic, so they can change type.

```
  set a to 1
  set a to 'abcd'
```

References are always lexically scoped.

```
  set a to 0  ; `a` is scoped to the module
  set f to do   ;  function declaration with `do`
    set b to 2  ; `b` is scoped to the function `f`
    if compare a as b
      set a to 5  ; `a` still has module scope
      set c to 3  ; `c` is scoped to `if`
```

TODO add an example of Closures

Any references to mutable data types, such as list or object, *must* start with a `$`.

```
  set $a to $[1 2 3]
```

The `get` and `set` methods exist on all tuples, lists, sets, groups, maps, and objects, respecting the mutability characteristic. A `set` operation will always return the full value of the iterable.

```
  set a to (get 'key' in myMap)
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

Conditions are simply using the keywords `if` and `else`. Conditions are also expressions.

```
  set c to (if compare a as b
    true
  else
    false)
```

Of course, the previous example could be written more simply.

```
  set c to (compare a as b)
```

Conditions do not convert type.

```
  if compare 0 as (make '' as number)
    true
```

`if` does not require parentheses around the first function call.

```
  ; these two lines are the same
  if compare a under 5  
    true
  if (compare a under 5)
    true
```

#### 2.4.2 Loops

`for` loops also do not require parentheses around the first function call.

```
  set myTuple to [1 2 3]
  for set [_ num] to (range myTuple)
    log num
```

`for` loops are aware of the data type.

```
  set myTuple to [1 2 3]
  set myMap to {'a'=1 'b'=2 'c'=3}

  for set [index num] to (range myTuple)
    log (concat index with num)

  for set [key value] to (range myMap)
    log (concat key with value)

```

You can use `_` to ignore parts you don't need.

```
  set myTuple to [1 2 3]
  for set [_ num] to (range myTuple)
    log num
```

`for` loops can also act like `while` loops.

```
  set a to 0
  for compare a under 5
    set a to (add 1 to a)
```

Breaks and continues are allowed as well.

```
  for set [_ num] to (range myTuple)
    if compare num under 5
      break
    if compare num over 5
      continue
    doSomething num
```

#### 2.4.3 Exceptions

Try and catch blocks work very similar to other languages.

```
  try
    divide 1 by 0
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
  set myModule to (import './path/to/module')
```

Access functions and other references in modules with the `get` function.

```
  set math to (import './math')
  set average to (get 'average' in math)
```

TODO main function (?)

### 2.6 Concurrency

Grove has a similar concurrency model to Go. You can `branch` a call to run at the same time. Like `if` and `for`, branch does not require parenthesis around the first function call.

```
  for set [_ i] in (range x)
    branch log i
```

You can create a channel to pass values between branches.

```
  set ch to (createChannel)
  branch myFunc with ch
```

Grove will pause in any branch when it arrives at `receive`.

```
  receive value from channel
```

Grove will resume in any branch when the computer tells the channel to `send`.

```
  send value to channel
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
  - reference to _T_ -> reference
  - number in (tuple|list) to _T_ -> _T_
  - (none|boolean|number|string|tuple) in (map/object) to _T_ -> _T_
- `get`:
  - number in (tuple|list) -> _T_
  - (none|boolean|number|string|tuple) in (map/object) -> _T_
- `import`: string -> module
- `send`: _T_ to channel -> _T_
- `receive`: reference from channel -> reference
- `range`
  - (tuple|list|map|object) -> tuple (iterable)
  - set|group -> _T_ (iterable)

Math functions that get aliased.

- `add`: number with number -> number
- `subtract`: number with number -> number
- `multiply`: number by number -> number
- `divide`: number by number -> number
- `power`: number by number -> number
- `modulus`: number by number -> number

Comparison functions that get aliased.

- `not`: boolean -> boolean
- `all`: [_T_] -> boolean
- `any`: [_T_] -> boolean
- `compare`:
  - where _A_ is none|boolean|string|number
  - compare _A_ as _A_ -> boolean (equals)
  - compare _A_ against _A_ -> boolean (not equals)
  - compare _A_ under _A_ -> boolean (less than)
  - compare _A_ over _A_ -> boolean (greater than)
  - compare _A_ in _A_ -> boolean (less than or equal)
  - compare _A_ out _A_ -> boolean (greater than or equal)

Logging... because its the first thing people will do.

- `log`: _T_ -> _T_
- `warn`: _T_ -> _T_
- `error`: _T_ -> _T_

Type conversions transcend type.

- `make`:  _T1_ as string -> _T2_
  - (can't convert to none)
  - any as 'boolean' -> boolean
  - none|boolean|string as 'number' -> number
  - any as 'string' -> string
  - list|set|group as 'tuple' -> tuple
  - tuple|set|group as 'list' -> list
  - tuple|list|set as 'group' -> group
  - tuple|list|group as 'set' -> set
  - object as 'map' -> map
  - map as 'object' -> object
- `getType`: _T_ -> string

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
- A linter should check to ensure that the tuple and list indexes and map and object keys as used are defined and within range, and if not a condition statement is used to prevent the use of an undefined index or key.
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

### 4.1 Set

The set alias allows the regular variable syntax instead of the `set ... to ...` syntax.

```
  a = 42
```

### 4.2 Getters and Setters

Many languages allow using `object.key` and `object[key]` for getters and setters of iterables, and Grove's alias can allow for that as well. Using the dot notation, the key is a string.

```
  set a to myMap.key
  set b to myTuple[0]
  set $myObj.key to a
  set $myList[0] to b
```

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

TODO should this be moved to the core language?
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
  set b to a
    | filter by filteringTest
    | map by updater
    | sort by conditionalTest
    | reduce by reducer after 0
```

### 4.8 Comparison Operators

Comparison operators add back in the typical syntax, as well as the typical order of operations.

- not => `!`
- compare => `==` `!=` `<` `>` `<=` `>=`
- all => `&&`
- any => `||`  

### 4.9 Mathematical Operators

Mathematical operators add back in the typical syntax, as well as the typical order of operations.

- multiply => `*`
- divide => `/`
- modulus => `%`
- add => `+`
- subtract => `-`
- power => `^`

### 4.10 Operator Precedence

These precedences are when using aliases. Grouping with `()` will always override.

- `()`   (function calls/groupings)
- `. []` (getters/setters)
- `!`
- `^`
- `* / %`
- `+ -`
- `< <= > >=`
- `== !=`
- `&&`
- `||`

TODO add an alias for Module import alias (see golang)

TODO default arg alias (?)

TODO switch/match alias (?)

5. Extras
--------------------------------------------------------------------------------

### 5.1 Implementation Checklist

TODO

### 5.2 Best Practices

TODO

### 5.3 Examples

#### 5.3.1

*No aliases*. A mutable quicksort implementation.

```
  set quicksort to do given ~a
    set $less to $[]
    set $equal to $[]
    set $greater to $[]
    if compare (length ~a) over 1
      set pivot to (random (length ~a))
      for set [_ x] to (range ~a)
        if compare x under pivot
          append x to $less
        if compare x as pivot
          append x to $equal
        if compare x over pivot
          append x to $greater
      return (
        concat (quicksort $less)
          with $equal
          with (quicksort $greater)
      )
    else
      return ~a
```

A mutable quicksort implementation, including aliases.

```
  quicksort = do ~a
    [$less $equal $greater] = [$[] $[] $[]]
    if (length ~a) > 1
      pivot = ~a | length | random
      for [_ x] = range ~a
        if x < pivot
          append x to $less
        if x == pivot
          append x to $equal
        if x > pivot
          append x to $greater
      return (
        concat (quicksort $less)
          with $equal
          with (quicksort $greater)
      )
    else
      return ~a
```

TODO add more examples
