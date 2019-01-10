# The U Language Specification

I release this document under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0) and [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Version 0

## Table of Contents

- [The U Language Specification](#)
  - [1. Foundation](#)
    - [1.1 Principles](#)
    - [1.2 Influences](#)
    - [1.3 Major Features](#)
    - [1.4 Definitions](#)
  - [2. Core Language](#)
    - [2.1 Tokens](#)
    - [2.2 Basic Types](#)
      - [2.2.1 None](#)
      - [2.2.2 Boolean](#)
      - [2.2.3 Number](#)
      - [2.2.4 Text](#)
      - [2.2.5 Comments](#)
    - [2.3 Collection Types](#)
      - [2.3.1 Set](#)
      - [2.3.2 Group](#)
      - [2.3.3 Tuple](#)
      - [2.3.4 List](#)
      - [2.3.5 Map](#)
      - [2.3.6 Object](#)
      - [2.3.7 Table](#)
      - [2.3.8 Dictionary](#)
    - [2.4 Expressions, Functions, References, Scope](#)
      - [2.4.1 Blocks and Termination](#)
      - [2.4.2 Calling and Defining Functions](#)
      - [2.4.3 References, Get and set](#)
    - [2.5 Control Structures](#)
      - [2.5.1 Conditions](#)
      - [2.5.2 Loops](#)
      - [2.5.3 Exceptions](#)
    - [2.6 Additional Syntax](#)
      - [2.6.1 Inline-Indent](#)
      - [2.6.2 Then](#)
      - [2.6.3 Destructuring](#)
    - [2.5 Modules](#)
    - [2.6 Concurrency](#)
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
- **Static typed.** U is statically-typed, but U looks and writes like its dynamic.
- U has a small number of built-in types. There are no secondary or user defined types. No class-based object-oriented programming. Instead, use of indexes and keys are statically checked.
- **Explicit** type conversion required.
- Memory managed. (Question... see F76E03F7)
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
- **Text**:
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

U assumes UTF-8 across the board. Any change from that must explicitly override UTF-8.

**Symbols**

- `Space`: Separator between tokens.
- `Newline`: Ends a statement. A new line within parenthesis or literal definition does not end a statement. Newlines must use the Unix character.
- `Two Spaces` at the beginning of a line: Indents. Tabs or other cadences of spaces cannot be used.
- `()`: Call a function. This is often optional.
- `'`: Text definition. Two must be used within a single line. One by itself indicates multiline text.
- `;`: Begins a comment. On a line by itself, indicates a multiline comment.
- `{}`: Defines an immutable set.
- `${}`: Defines a mutable group.
- `[]`: Defines an immutable tuple.
- `$[]`: Defines a mutable list.
- `{:}`: Defines an immutable map.
- `${:}`: Defines a mutable object.
- `[:]`: Defines an immutable table.
- `$[:]`: Defines a mutable dictionary.
- `,`: Provides inlining of function or block body.

**Allowed Reference Names**

Reference names may start with `$` or any letter `a-z` or `A-Z` as well as any unicode letter from any spoken language or mathematics; reference names cannot start with a digit. The remainder of the reference name may use any letters `a-z` or `A-Z` as well as any unicode letter from any spoken language or mathematics, or any digit; the remainder of the reference name cannot use punctuation including `$`. When using Latin languages, use camelCase. You may only use `_` to ignore references when destructuring.

**Keywords**

- `none`
- `true`
- `false`
- `to`
- `return`
- `if`
- `else`
- `for`
- `catch`
- `raise`
- `branch`
- `then`

Also, the `send` and `receive` functions have special execution properties.

### 2.2 Basic Types

U only has three types of things: data, functions, and references.

**Data**. Immutable examples are boolean, numbers, texts, sets, tuples, maps, and tables. Mutable groups, lists, objects, and dictionaries are also available. There are no secondary or user-defined types.

**Functions**. Functions are first-class. Data does not own functions. Methods do not exist.

**References**. References, or variables, are plain text in U. References may refer to data or functions. If a reference may refer to mutable data, you must prefix with `$`.

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

#### 2.2.4 Text

Texts use only the single-quote `'` character. Regular expressions are just texts.
`\'` is the escaped version of the single quote character.
 `''`, empty text, is the falsy value. Texts are always immutable.

```
'abcd'
```

You can define texts in multiple lines with indentation just like comments. U strips indentation.

```
'
  abcd
  1234
```

#### 2.2.5 Comments

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

### 2.3 Collection Types

For collection types...

- Immutable or mutable: immutable is plain, mutable starts with `$`
- Unordered or ordered: unordered uses `{}`, ordered uses `[]`
- Unkeyed or keyed: unkeyed does not use `:`, keyed uses `:`

|                   | Immutable   | Mutable           |
| ----------------- | ----------- | ----------------- |
| Unordered Unkeyed | Set `{}`    | Group `${}`       |
| Ordered Unkeyed   | Tuple `[]`  | List `$[]`        |
| Unordered Keyed   | Map `{:}`   | Object `${:}`     |
| Ordered Keyed     | Table `[:]` | Dictionary `$[:]` |

#### 2.3.1 Set

Sets are defined with `{}`. The falsy form of set is an empty set, `{}`.
Sets are unordered. Sets support embedding.
Sets are immutable. Sets may only store immutable data types.
Because sets have no keys, duplicate values are not possible.

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


#### 2.3.2 Group

Groups are like sets, but mutable. They are defined with `${}`.
The falsy group is the empty group.
Groups can store immutable data, mutable data, and functions. Groups only store references.

```
${1 2 3}
```

#### 2.3.3 Tuple

Tuples are defined with `[]`. Tuples are zero-indexed.
The falsy value of tuple is the empty tuple, `[]`. Tuples are immutable.
Tuples can only store other immutable data types, such as boolean, number, text, tuple, and map.

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

#### 2.3.4 List

Lists are defined with `$[]`.
The falsy value of list is the empty list, `$[]`. Lists are like tuples, but mutable.
Lists can store immutable data, mutable data, and functions. Lists only store references.

```
$[1 2 3]
```

#### 2.3.5 Map

Maps are defined with `{}`. The falsy form of map is an empty map, `{:}`.
Maps are unordered. Maps support embedding.
Maps are immutable. Maps may only store immutable data types.

```
{'a':1 'b':2 'c':3}
```

The pattern is always:

```
{key:value key:value key:value ...}
```

Maps may be also written as:

```
{
  'a':1
  'b':2
  'c':3
}
```

The read out-loud equilavent would be `set myMap to (map where 'a' is 1, 'b' is 2, 'c' is 3)`. The read out-loud version breaks the syntax rules. Either way we are creating new syntax. The `{}` for is common, known, easy to learn, and only 'one-level' from the principle of read out-loud as is. `U` uses `:` because it's right under your pinky, instead of `=` which avoids the shift key but is a stretch.

You may use reference names as map keys.

```
set a 1
set b 2
set myMap {a b 'c':3}
```

A map must have an `:` to be a map and not a set. A map can start with `:` to indicate its a map.

```
set a 1
set b 2
set c 3
set mySet {a b c}
set myMap {: a b c}
```

#### 2.3.6 Object

Objects are like maps, but mutable. They are defined with `${}`.
The falsy object is the empty object.
Objects can store immutable data, mutable data, and functions. Objects only store references.

```
${'a':1 'b':2 'c':3}
```

### 2.3.7 Table

Tables are defined with `[:]`. Tables are like maps but also ordered. Tables are zero-indexed.
The falsy value of table is the empty table, `[:]`. Tables are immutable.
Tables can only store other immutable data types, such as boolean, number, text, tuple, and map.

```
['a':1 'b':2 'c':3]
```

Tables do not differentiate between the kind of whitespace, so we can just as easily write:

```
[
  'a':1
  'b':2
  'c':3
]
```

### 2.3.8 Dictionary

Dictionaries are like maps, but mutable. They are defined with `$[:]`.
The falsy dictionary is the empty dictionary.
Objects can store immutable data, mutable data, and functions. Dictionaries only store references.

```
$['a':1 'b':2 'c':3]
```

### 2.4 Expressions, Functions, References, Scope

#### 2.4.1 Blocks and Termination

Statements are terminated with the new line character.

U is whitespace sensitive. Two spaces per indent is enforced.

#### 2.4.2 Calling and Defining Functions

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
handleHttp method:'GET' path:'/keys' function:listKeys
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
divide divisor dividend:36

; Good: Use explicit keys instead.
divide dividend:divisor divisor:36
```

The anonymous function is defined as: `to arg1 arg2 ... \n <indent> block`

```
to col
  divide (sum col) (length col)
```

Define functions using the following formation. `to` has special powers: you do not need to use parantheses around `to`.

```
set average to col
  divide (sum col) (length col)
```

Every statement is an expression, so returns are only needed when wanting to return early.

```
set average to col
  if equal (length col) 0
    return 0
  divide (sum col) (length col)
```

Functions may be passed by reference as arguments to other functions. If a function reference is not the first it its group, the function is passed as reference.

```
set col [1 2 3]
set addThree to num
  add num 3
map col addThree
```

You must call functions with the exact set of available arguments. However, functions may define defaults for some arguments. When calling functions, arguments with defined defaults can be skipped.

```
set divideAndAdd to a b c
  add (divide a b) c

set divideAndAddWithDefaults to a b:1 c:0
  add (divide a b) c

; ERROR: You must use the exact set of arguments.
divideAndAdd 1 2
divideAndAdd a:1 b:2 c:3 d:4

; Good: Using the exact set of arguments.
divideAndAdd a:1 b:2 c:3

; Good: You may skip arguments with defaults.
divideAndAddWithDefaults 1
divideAndAddWithDefaults 1 2
divideAndAddWithDefaults a:1 b:2 c:3
divideAndAddWithDefaults a:1 c:3
```

Immutable type default arguments (none, boolean, number, text, set, tuple, map, table) are created only once. Mutable type default arguments (group, list, object, dictionary) are created each time the function is called.

#### 2.4.3 References, Get and set

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
set f to   ;  function declaration with `to`
  set b 2  ; `b` is scoped to the function `f`
  if equal a b
    set a 5  ; `a` still has module scope
    set c 3  ; `c` is scoped to `if`
```

Closures.

```
set outer to num
  set sum num
  set inner to num2
    set sum (add sum num2)

(outer 3) 2  ; > 5

set fn (outer 0)
fn 2  ; > 2
fn 3  ; > 5

set fn (outer 1)
fn 1  ; > 2
```

You may also call the `scope` function to set the scope of a reference without defining its value. `scope ref` is essentially identical to `set ref none`.

```
scope num

set myAdd to num2
  set num (add num num2)

set mySubtract to num2
  set num (subtract num num2)

set num 0
myAdd 3  ; num is now 3
mySubtract 2  ; num is now 1
```

Any references to mutable data types, such as list or object, *must* start with a `$`.

```
set $a $[1 2 3]
```

The `get` and `set` methods exist on all tuples, lists, sets, groups, maps, objects, tables, and dictionaries, respecting the mutability characteristic. A `set` operation will always return the full value of the iterable.

```
set a (get myMap 'key')
```

### 2.5 Control Structures

#### 2.5.1 Conditions

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

#### 2.5.2 Loops

`for` loops act as functions, that take an iterable and a function that receives key and value arguments.

```
set myTuple [1 2 3]
set myMap {'a':1 'b':2 'c':3}

for myTuple to _ num
  log num

for myTuple to index num
  log (concat index num)

for myMap to key value
  log (concat key value)
```

You can use `_` to ignore parts you don't need.

```
set myTuple [1 2 3]
for myTuple to _ num
  log num
```

`for` loops can also act like `while` loops. If there's no `to` in the boolean calculation, parenthesis is not needed.

```
set a 0
for lessThan a 5
  set a (add 1 a)
```

To "continue", use `return`. To stop the execution in the loop, you can `raise` -- effectively, `raise none`. If you raise data other than `none`, U will bubble the error as normal.

```
for myTuple to _ num
  if lessThan num 5
    raise
  if greaterThan num 5
    return
  doSomething num
```

#### 2.5.3 Exceptions

If you add a `catch` block to your function, all the lines above act as a _try_ in other languages. This changes the model from permission to forgiveness.

```
to
  divide 1 0
  catch exception
    log exception
```

There is no error or exception type. Instead, any immutable value will work. Generally speaking, U will use non-falsy maps for errors.

```
to
  raise 'You just found an error!'
  catch exception
    log exception
```

An unhandled exception will stop the execution of the program. The compiler will warn about any possible unhandled exceptions at lint or build time.

### 2.6 Additional Syntax

#### 2.6.1 Inline-Indent

Having to hit return just for a single-line block doesn't feel right. The comma character here replaces the newline plus indent.

```
map lis (to value, divide value 3)
```

You can also use `,` to tighten up `if` as well.

```
set a (
  if equal a b, a
  else, b
)
```

#### 2.6.2 Then

Sometimes, we can lose the "step-by-step" feel, and `then` can help restore this feeling by letting us chain functions. The previous value is passed to the succeeding function as the given (first) argument. `then` may be used on the same line or on succeeding indented lines.

```
set myTuple [0 1 2 3 4 5 6 7 8 9]
set result myTuple
  then filter isOddNumber
  then map addThree
  then sort getLargerNumber
  then reduce fn:sum start:0
```

#### 2.6.3 Destructuring

Set multiple references at the same time by pulling values out of tuples, lists, maps, objects, tables, and dictionaries. There's no way to destructure sets or groups.

```
set [a b] [1 2]
set [a b] $[1 2]
set {a b} {'a':1 'b':2}
set {a b} ${'a':1 'b':2}
```

### 2.7 Modules

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

Everything in the module is made available. U has no concept of `public` or `private` references or data. However, module outputs are read-only.

Some modes of execution will default to look for a `main` function. This function will be the entry point to the program.

```
set main to
  add 1 2
```

### 2.8 Concurrency

U has a similar concurrency model to Go. You can `branch` a call to run at the same time. Like `if` and `for`, `branch` does not require parenthesis around the first function call.

```
for x to _ i
  branch log i
```

You can create a channel to pass values between branches.

```
set ch (createChannel)
branch myFunc ch
```

U will pause in any branch when it arrives at `receive`.

```
receive channel value
```

U will resume in any branch when the computer tells the channel to `send`.

```
send channel value
```

- TODO example sync
  ```
  set fn to
    1
  set value (fn)
  log value
  ```
- TODO example one async
  ```
  set asyncFn to ch
    send ch 1
  set ch (createChannel)
  branch asyncFn ch
  receive ch value
  log value
  ```
- TODO example multi async - sequence
  ```
  set asyncFn to ch
    send ch 1
  set ch (createChannel)
  branch asyncFn ch
  receive ch value
  ; then I can decide/arg using `value` here
  if value
    branch asyncFn ch
    receive ch value2
    log value2
  else
    log 'Nothing to see here'
  ```
- TODO example multi async - parallel
  ```
  set asyncFn to ch
    send ch 1
  set asyncFn2 to ch
    send ch 2
  set ch (createChannel)
  set ch2 (createChannel)
  branch asyncFn ch
  branch asyncFn2 ch
  receive ch value
  receive ch2 value2
  log [value value2]
  ```
- TODO example multi async - graph
  ```
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
  - (map/object) (none|boolean|number|text|tuple) _T_ -> _T_
- `get`:
  - (tuple|list) number -> _T_
  - (map/object) (none|boolean|number|text|tuple) -> _T_
- `match`:
  - (none|boolean|number|text|tuple) (map/object) -> _T_
- `import`: text -> module
- `send`: channel _T_ -> _T_
- `receive`: channel reference -> reference

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
- `equal`: _A_ _A_ -> boolean; where _A_ is none|boolean|text|number
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
- `toNumber`: none|boolean|text -> number
- `toText`: any -> text
- `toTuple`: list|set|group -> tuple
- `toList`: tuple|set|group -> list
- `toSet`: tuple|list|group -> set
- `toGroup`: tuple|list|set -> group
- `toMap`: object -> map
- `toObject`: map -> object
- `getType`: any -> text

TODO to consider... format, slice; tuple/list/set/group/map/object operations

## 4. Execution Rules: Lint, Build, and Run

- TODO Autoformat
- TODO Autoupgrade lang version
- TODO stand alone / repl (?)

TODO Question F76E03F7 on memory management:
- Would it be possible to determine how to manage memory at compile time? For example, a C developer has to allocate memory, use memory, then figure out when to deallocate memory. Most languages without "deallocate" commands manage this at run-time with a garbage collector / reference counter. Would it be possible to automatically figure out when to "deallocate" at compile (build)? Avoids the memory and CPU overhead of a run-time memory management system...

### 4.1 Error Messages

The relationship between the compiler and human is a conversation. Write error messages in affirmative, active, polite, concise, and casual language. Avoid jargon or "lower-level" terminology. The compiler refers to itself in first-person. Error messages must meet the following format. Use of appropriate Emojis is encouraged.

1. **What**: Briefly describe what went wrong. Use direct, plain language to describe the issue. Be direct and as specific as possible.
2. **Why**: If possible describe why the error happened.
3. **How**: Finally, show one or more examples of how to fix the issue. For example, "did you mean...?". Use the actual code in question when possible.
4. **Where**: Provide the file and line number of the error.
5. Provide a look up code if the user wants more technical explanation. The code should be a Base58 UUID.
6. Stack traces are an opt-in command line argument.

```
I can't (add) with a text.
To (add), I need number number, then I return a number.
Try this instead:
    add 3 (toNumber '3')
helloWorld.u line 20 fSVIHwQ1SnO53gAAzrEu0g
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
- Any compiler or linter for U should statically check primitive types (none, boolean, number, text, tuple, list, map, object, table, dictionary, module) to ensure the types match correctly. This static type check must be done without the use of type annotations. Static type checking should allow that references can change type, essentially creating a union type.
- A linter should check to ensure that the tuple and list indexes and map and object keys as used are defined and within range, and return the expected, and if not a condition statement is used to prevent the use of an unexpected index or key.
- A reference to a mutable data type should be prefixed with `$`. `$` may reference mutable or immutable data. If the reference never references mutable data, do not use `$`.
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

#### TODO Texts and Regular Expressions

- Formatting
- Matching

#### TODO Numbers and Mathematics

- TODO Infinity (?)
- TODO Vector and Matrix operations
- TODO complex numbers
- TODO fractions
- TODO statistics
- TODO geometry / trig

#### TODO Collections (Tuples, Lists, Maps, Objects, Tables, Dictionaries)

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

TODO what basic type should represent datetimes? Number, Text, or Map?

#### TODO Streams, Files and Directories

#### TODO Network

- TODO HTTP, SSL, sockets
    - CGI
    - URL: Formatting, parsing texts for IP, domain, path, query text etc
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
- TODO Base64 / Base58
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

When you run `u install packageName`, it will by default pick the latest specific version currently tagged with `stable` or `stable-.*` (where .* is anything), or the specific version currently tagged as `latest`, or finally the actual latest version.

TODO

### TODO Command Line Interface

- `u install`
- `u install packageName@latest`
- `u remove packageName`
- `u lint ...`
- `u format ...` ; autoformat all u code in directory
- `u build ...`
- `u run ...`
- `u test ...`
- `u repl ...` ; Run U REPL, optionally with environment

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
set quicksort to $a
  set [$less $equal $greater] [$[] $[] $[]]
  if greaterThan (length $a) 1
    set pivot (random (length $a))
    for $a to _ x
      if lessThan x pivot
        append $less x
      if equal x pivot
        append $equal x
      if greaterThan x pivot
        append $greater x
    return concat [(quicksort $less) $equal (quicksort $greater)]
  return $a
```

#### 6.3.2 REST-ful service

```
set {handleHttp listenAndServe} (import 'http')
set {runQuery} (import 'database')

set listKeys to request
  set query '
    SELECT *
    FROM keys;
  set rows (runQuery query)
  if not rows
    return [404 {'message':'Not Found'}]
  return [200 rows]

set getKey to request id
  set query '
    SELECT *
    FROM keys
    WHERE id = {id};
  set rows (runQuery query {id})
  set row (get rows 0)
  if not row
    return [404 {'message':'Not Found'}]
  return [200 rows]

set createKey to request
  set query '
    INSERT INTO keys (value)
    VALUES ({value});
  set value (get request 'value')
  set row (runQuery query {value})
  if not row
    return [400 {'message':'Bad Parameters'}]
  return [200 row]

set updateKey to request id
  set query '
    UPDATE keys
    SET value = {value}
    WHERE id = {id};
  set row (runQuery query {id value})
  if not row
    return [400 {'message':'Bad Parameters'}]
  return [200 row]

set main to
  set port 8573
  handleHttp method:'GET' path:'/keys' handler:listKeys
  handleHttp method:'GET' path:'/keys/{id}' handler:getKey
  handleHttp method:'POST' path:'/keys' handler:createKey
  handleHttp method:'PUT' path:'/keys/{id}' handler:updateKey
  log (format 'Server started on {port}' {port})
  listenAndServe port
```

- TODO Statistics / ML example with graph
- TODO Web UI example
- TODO Native application example
- TODO Audio / graphics example
- TODO Test example
- TODO vet document for casual and active voice.
