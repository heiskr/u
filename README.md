# The Grove Language Specification

I release this document under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) and [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Version 0

## Table of Contents

- [The Grove Language Specification](#)
  - [1. Foundation](#)
    - [1.1 Principles](#)
    - [1.2 Influences](#)
    - [1.3 Major Features](#)
    - [1.4 Definitions](#)
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
      - [2.4.2 Destructuring](#)
      - [2.4.2 Loops](#)
      - [2.4.3 Exceptions](#)
    - [2.5 Modules](#)
    - [2.6 Advanced Syntax](#)
      - [2.6.1 Concurrency](#)
      - [2.6.2 Comprehensions](#)
      - [2.6.3 Inline-Block](#)
      - [2.6.4 Ternary operation](#)
      - [2.6.5 Pipe](#)
      - [2.6.6 Match](#)
  - [3. Universal Functions](#)
  - [4. Execution Rules: Build and Run](#)
  - [5. Standard Library](#)
  - [6. Extras](#)
    - [6.1 Implementation Checklist](#)
    - [6.2 Best Practices](#)
    - [6.3 Examples](#)
      - [6.3.1 Quicksort](#)
      - [6.3.2 REST Endpoints](#)

## 1. Foundation

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

### 1.3 Major Features

- **Procedural** scripting, with functional features like immutable data and list processing functions.
- **Static typed.** Grove is statically-typed, but Grove looks and writes like its dynamic.
- Grove has a small number of built-in types. There are no secondary or user defined types. No class-based object-oriented programming. Instead, use of indexes and keys are statically checked.
- **Explicit** type conversion required.
- Memory managed.
- Whitespace significant.
- Immutable first, but mutable data is allowed.
- Team focused: standardized lint and format.
- Everything is an expression.
- Massive standard library. Complete toolset.
- Native concurrency pattern.
- Specification first, implementation second. Not environment specific.

### 1.4 Definitions

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

## 2. Core Language

### 2.1 Tokens

TODO Write tokens section

Grove assumes UTF-8 across the board. Any change from that must explicitly override UTF-8.

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

Reference names may start with `$` or `~`, any letter `a-z` or `A-Z` as well as any unicode letter from any spoken language or mathematics; reference names cannot start with a digit. The remainder of the reference name may use any letters `a-z` or `A-Z` as well as any unicode letter from any spoken language or mathematics, or any digit; the remainder of the reference name cannot use punctuation including `$` or `~`. When using Latin languages, use camelCase. You may only use `_` to ignore references when destructuring.

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

Also, the `send` and `receive` functions have special execution properties.

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

You may use reference names as map keys.

```
set a 1
set b 2
set myMap {a b 'c'=3}
```

A map must have an `=` to be a map and not a set. A map can start with `=` to indicate its a map.

```
set a 1
set b 2
set c 3
set mySet {a b c}
set myMap {= a b c}
```

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

For three or more arguments, you must use the argument keys.

```
handleHttp method='GET' path='/keys' function=listKeys
```

When you call a function with zero, one, or two arguments, you may omit the argument keys.

```
add 1 2
```

You may also use reference names as argument keys.

```
set method 'GET'
set path '/keys'
set function listKeys
handleHttp method path function
```

If you use at least one reference name as an argument key, you must meet one of the following criteria:

1. All of the arguments use argument keys, either explicitly or by reference names.
2. The named arguments are in order up to any unnamed arguments. This allows the computer to interpret the unnamed arguments.

```
set dividend 3
set divisor 12
set a dividend
set b divisor

; Good: This is a normal format.
divide 3 12

; Good: These are always fine, because no reference name is an argument key.
divide a b
divide b a

; Good: Both names match an are in order.
divide dividend divisor

; Good: One name matches and is in order.
divide dividend 12

; Good: One name matches and is in order.
divide 3 divisor

; ERROR: One of the reference names matches an argument name and its out of order.
divide divisor 36

; Good: Use explicit keys instead.
divide divisor dividend=36

; Good: Use explicit keys instead.
divide dividend=divisor divisor=36
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

You must call functions with the exact set of available arguments. However, functions may define defaults for some arguments. When calling functions, arguments with defined defaults can be skipped.

```
set divideAndAdd do a b c
  add (divide a b) c

set divideAndAddWithDefaults do a b=1 c=0
  add (divide a b) c

; ERROR: You must use the exact set of arguments.
divideAndAdd 1 2
divideAndAdd a=1 b=2 c=3 d=4

; Good: Using the exact set of arguments.
divideAndAdd a=1 b=2 c=3

; Good: You may skip arguments with defaults.
divideAndAddWithDefaults 1
divideAndAddWithDefaults 1 2
divideAndAddWithDefaults a=1 b=2 c=3
divideAndAddWithDefaults a=1 c=3
```

Immutable type default arguments (none, boolean, number, string, tuple, set, map) are created only once. Mutable type default arguments (list, group, object) are created each time the function is called.

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

Closures.

```
set outer do num
  set sum num
  set inner do num2
    set sum (add sum num2)

(outer 3) 2  ; => 5

set fn (outer 0)
fn 2  ; => 2
fn 3  ; => 5

set fn (outer 1)
fn 1  ; => 2
```

You may also call the `scope` function to set the scope of a reference without defining its value. `scope ref` is essentially identical to `set ref none`.

```
scope num

set myAdd do num2
  set num (add num num2)

set mySubtract do num2
  set num (subtract num num2)

set num 0
myAdd 3  ; num is now 3
mySubtract 2  ; num is now 1
```

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

#### 2.4.2 Destructuring

Set multiple references at the same time by pulling values out of tuples, lists, maps, and objects. There's no way to destructure sets or groups.

```
set [a b] [1 2]
set [a b] $[1 2]
set {a b} {'a'=1 'b'=2}
set {a b} ${'a'=1 'b'=2}
```

#### 2.4.3 Loops

`for` loops also do not require parentheses around the first function call.

```
set myTuple [1 2 3]
for range [_ num] myTuple
  log num
```

`for` loops are aware of the data type because the `range` function can handle multiple types. `range` returns `false` until its at the end, then returns `true`.

```
set myTuple [1 2 3]
set myMap {'a'=1 'b'=2 'c'=3}

for range [index num] myTuple
  log (concat index num)

for range [key value] myMap
  log (concat key value)
```

You can use `_` to ignore parts you don't need.

```
set myTuple [1 2 3]
for range [_ num] myTuple
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
for range [_ num] myTuple
  if lessThan num 5
    break
  if greaterThan num 5
    continue
  doSomething num
```

#### 2.4.4 Exceptions

Try and catch blocks work very similar to other languages.

```
try
  divide 1 0
catch exception
  log exception
```

There is no error or exception type. Instead, any non-falsy immutable value will work. You may use `true`, any number other than `0`, or any string, tuple, set, or map that is not empty.

```
try
  raise 'You just found an error!'
catch exception
  log exception
```

An unhandled exception will stop the execution of the program. The compiler will warn about any possible unhandled exceptions at lint or build time.

### 2.5 Modules

Files are treated as modules, with their own namespaces.
If a cycle is formed with `import`, the compiler will throw an error.

```
set myModule (import './path/to/module')
```

Access functions and other references in modules with the `get` function.

```
set math (import './math')
set mean (get math 'mean')
```

A more convenient way is to combine import with destructuring.

```
set {mean median mode} (import './math')
```

Everything in the module is made available. Grove has no concept of `public` or `private` references or data. However, module outputs are read-only.

Some modes of execution will default to look for a `main` function. This function will be the entry point to the program.

```
set main do
  add 1 2
```

### 2.6 Advanced Syntax

### 2.6.1 Concurrency

Grove has a similar concurrency model to Go. You can `branch` a call to run at the same time. Like `if` and `for`, `branch` does not require parenthesis around the first function call.

```
for range [_ i] x
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

### 2.6.2 Comprehensions

A few languages offer comprehensions as an alternative iterate-to-generate interface.

```
; A tuple comprehension.
[(divide num 3) for range [_ num] myTuple]

; A set comprehension.
{(divide num 3) for range num mySet}

; A map comprehension. Notice the `=`.
{key=(divide num 3) for range [key num] myMap}
```

### 2.6.3 Inline-Block

Sometimes, having to hit return just for a single-line block doesn't feel right. The colon character here replaces the newline plus indent.

```
map lis (do value: divide value 3)
```

### 2.6.4 Ternary operation

Sometimes, having a single line set a value conditionally is convenient.

```
set a (if equal a b then a else b)
```

### 2.6.5 Pipe

Sometimes, we can lose the "step-by-step" feel, and the pipe can help restore this feeling by letting us chain functions. The previous value is passed to the succeeding function as the given (first) argument. Pipes may be used on the same line or on succeeding indented lines.

```
set result [0 1 2 3 4 5 6 7 8 9]
  | filter isOddNumber
  | map addThree
  | sort getLargerNumber
  | reduce fn=sum start=0
```

### 2.6.6 Match

There's already a `get` function.

```
set val (get {
  'a'=4
  'b'=3
  'c'=2
} 'a')
```

The `match` function will also:
1. Call functions when they match, and return the value.
2. Allows a `'default'` option, that runs when others do not match.
3. When the value is not a set or group, and one of the keys is a set or group, then it will match any value in the set.

```
set val (match {
  'a'=do: 4
  'b'=do: 3
  {'c' 'd'}=do: 2
  'default'=do: 0
} 'a')
```

## 3. Universal Functions

When should a function be universal, as opposed to part of the standard library?

- When the function is absolutely critical to using the language. Basically every module would use it.
- When the function is so commonly used that most other languages have a symbol for it. Examples are math and comparisons.
- When the function transcends types and modules. Examples are logging or type conversion.

The compiler will throw an error at any attempt to override universal functions.

Basic, universal functions.

- `set`:
  - reference _T_ -> reference
  - (tuple|list) number _T_ -> _T_
  - (map/object) (none|boolean|number|string|tuple) _T_ -> _T_
- `get`:
  - (tuple|list) number -> _T_
  - (map/object) (none|boolean|number|string|tuple) -> _T_
- `match`:
  - (none|boolean|number|string|tuple) (map/object) -> _T_
- `import`: string -> module
- `send`: channel _T_ -> _T_
- `receive`: channel reference -> reference
- `range`
  - (tuple|list|map|object) -> tuple (iterable)
  - set|group -> _T_ (iterable)

Math functions.

- `add`: number number -> number
- `subtract`: number number -> number
- `multiply`: number number -> number
- `divide`: number number -> number
- `power`: number number -> number
- `modulus`: number number -> number

Comparison functions.

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

TODO to consider... format, slice; tuple/list/set/group/map/object operations

## 4. Execution Rules: Lint, Build, and Run

- TODO Autoformat
- TODO Autoupgrade lang version
- TODO stand alone / repl (?)

### 4.1 Error Messages

The relationship between the compiler and human is a conversation. Write error messages in affirmative, active, polite, concise, and casual language. Avoid jargon or "lower-level" terminology. The compiler refers to itself in first-person. Error messages must meet the following format. Use of appropriate Emojis is encouraged.

1. **What**: Briefly describe what went wrong. Use direct, plain language to describe the issue. Be direct and as specific as possible.
2. **Why**: If possible describe why the error happened.
3. **How**: Finally, show one or more examples of how to fix the issue. For example, "did you mean...?". Use the actual code in question when possible.
4. **Where**: Provide the file and line number of the error.
5. Provide a look up code if the user wants more technical explanation. The code should be a Base62 UUID.
6. Stack traces are an opt-in command line argument.

```
I can't (add) with a string.
To (add), I need number number, then I return a number.
Try this instead:
    add 3 (toString '3')
helloWorld.grove line 20 fSVIHwQ1SnO53gAAzrEu0g
```

At build time, the user should have the option of seeing the first error, or all errors. You may offer the fix the errors automatically for the user. You may enter into watch mode if there is a compile error until all errors are fixed.

* * *

- Each indent should be two spaces per indent.
- Functions must contain less than ten statements.
- Blocks must not go more than four levels deep.
- One empty line should be after each block.
- Two spaces should be before starting an inline comment.
- Reference names should use camelCase.
- All imports should be used.
- All references should be used.
- No lines should have trailing whitespace.
- Lines should be no longer than 80 characters.
- Types must match to do a comparison.
- Any compiler or linter for Grove should statically check primitive types (none, boolean, number, string, tuple, list, map, object, module) to ensure the types match correctly. This static type check must be done without the use of type annotations. Static type checking should allow that references can change type, essentially creating a union type.
- A linter should check to ensure that the tuple and list indexes and map and object keys as used are defined and within range, and return the expected, and if not a condition statement is used to prevent the use of an unexpected index or key.
- A reference to a mutable data type should be prefixed with `$`.
  - `~` prefix indicates the referenced data _may_ be mutable or immutable, in the case of a function argument.
- Check for any unused code.
- Check for duplicated code.

## 5. Standard Library

- TODO Note where something would be a browser specific library or a server/local specific library.
- Functions in modules in the standard library should not be nested past one level. (e.g. math.abs  instead of math.number.abs )
- Function names should always be verbs or start with verbs.
- Function name should be comprehensive (e.g. loadJson v load).

A few target areas:

- Web Dev
- Systems/DevOps/Security
- Network
- Databases
- Native applications (mobile/desktop)
- Data Science, Academic, Scientific
- Artistic Media
- Games

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

TODO

- Collection operations instead of loops -- functional programming
- and others, such as Stacks, etc over the default types
- iterators
- sorting
- Schema Helpers: Basically, utilities for ensuring schemas for maps and objects.

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
- TODO Base64 / Base62
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

Any dependency change should be treated as a breaking change.

Versions may be whole numbers or hashes. Versions are immutable. Version tags, such as 'latest', 'stable', or 'jazz hands' may be used. A version tag is a reference to version. The package author may change the version tag to a different version at another time. The dependency manager should default to use specific versions (ie number or hash, not the tag). The user may override to use a version tag instead.

When you run `grove install packageName`, it will by default pick the latest specific version currently tagged with `stable` or `stable-.*` (where .* is anything), or the specific version currently tagged as `latest`, or finally the actual latest version.

TODO

### TODO Command Line Interface

- `grove install`
- `grove install packageName@latest`
- `grove remove packageName`
- `grove lint ...`
- `grove format ...` ; autoformat all grove code in directory
- `grove build ...`
- `grove run ...`
- `grove test ...`
- `grove repl ...` ; Run Grove REPL, optionally with environment

TODO package author tools

## 6. Extras

### 6.1 Implementation Checklist

TODO

### 6.2 Best Practices

TODO

### 6.3 Examples

#### 6.3.1 Quicksort

A mutable quicksort implementation.

```
set quicksort do ~a
  set [$less $equal $greater] [$[] $[] $[]]
  if greaterThan (length ~a) 1
    set pivot (random (length ~a))
    for range [_ x] ~a
      if lessThan x pivot
        append $less x
      if equal x pivot
        append $equal x
      if greaterThan x pivot
        append $greater x
    return concat [(quicksort $less) $equal (quicksort $greater)]
  return ~a
```

#### 6.3.2 REST-ful service

```
set {handleHttp listenAndServe} (import 'http')
set {runQuery} (import 'database')

set listKeys do request
  set query '
    SELECT *
    FROM keys;
  set rows (runQuery query)
  if not rows
    return [404 {'message'='Not Found'}]
  return [200 rows]

set getKey do request id
  set query '
    SELECT *
    FROM keys
    WHERE id={id};
  set rows (runQuery query {id})
  set row (get rows 0)
  if not row
    return [404 {'message'='Not Found'}]
  return [200 rows]

set createKey do request
  set query '
    INSERT INTO keys (value)
    VALUES ({value});
  set value (get request 'value')
  set row (runQuery query {value})
  if not row
    return [400 {'message'='Bad Parameters'}]
  return [200 row]

set updateKey do request id
  set query '
    UPDATE keys
    SET value = {value}
    WHERE id = {id};
  set row (runQuery query {id value})
  if not row
    return [400 {'message'='Bad Parameters'}]
  return [200 row]

set main do
  set port 8573
  handleHttp method='GET' path='/keys' handler=listKeys
  handleHttp method='GET' path='/keys/{id}' handler=getKey
  handleHttp method='POST' path='/keys' handler=createKey
  handleHttp method='PUT' path='/keys/{id}' handler=updateKey
  log (format 'Server started on {port}' {port})
  listenAndServe port
```

- TODO Statistics / ML example with graph
- TODO Web UI example
- TODO Native application example
- TODO Audio / graphics example
- TODO Test example
