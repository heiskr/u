The Garden Language Specification
===============================================================================

I release this document under the [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0).

Version 0.0.0

1. Foundation
--------------------------------------------------------------------------------

Garden may be a programming language. Or not. This document describes what Garden is, but does not describe what Garden is not. Garden may be implemented in whatever way you might dream. Anywhere you want Garden to be, make it.

### 1.1 Principles

- Read out-loud as is.
- Omit the obvious, but be explicit.
- Prefer one way to do things, and explain exceptions.
- Separate data, functions, and references.
- Flat, not abstracted.
- Isolate modules.

### 1.2 Influences

Lisp, Hypertalk, Python, Coffeescript, Go.

### 1.3 Definitions

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

TODO Universal UTF-8

### 2.2 Types

Garden only has three types of things: data, functions, and references.

**Data**. Data does not own functions. Immutable examples are boolean, numbers, strings, tuples, and maps. Mutable lists and objects are also available.

**Functions**. Functions are first-class.

**References**. References, or variables, are plain text in Garden. References may refer to data or functions. References always denote mutable types with a prefixed `$`.

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

#### 2.2.6 List

Lists are defined with `$[]`.
The falsy value of list is the empty list, `$[]`. Lists are like tuples, but mutable.
Lists can store immutable data, mutable data, and functions. Lists only store references.

```
  $[1 2 3]
```

#### 2.2.7 Map

Maps are defined with `{}`. The falsy form of map is an empty map, `{}`.
Maps are unordered. Maps support embedding.
Maps are immutable. Maps may only store immutable data types.

```
  {'a'=1 'b'=2 'c'=3}
```

Maps may be also written as:

```
  {
    'a'=1
    'b'=2
    'c'=3
  }
```

#### 2.2.8 Object

Objects are like maps, but mutable. They are defined with `${}`.
The falsy object is the empty object.
Objects can store immutable data, mutable data, and functions. Objects only store references.

```
  ${'a'=1 'b'=2 'c'=3}
```

### 2.3 Expressions, Functions, References, Scope

#### 2.3.1 Blocks and Termination

Statements are terminated with the new line character.

Garden is whitespace sensitive. Two spaces per indent is enforced.

#### 2.3.2 Calling and Defining Functions

Functions are called simply by having a reference to the function the first in the group.
The first argument is the _given_ argument.
After the first argument, prepositions are used before each argument as keywords.
After the first argument, arguments may take any order.

```
  add 1 to 2
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
    if equal (length col) with 0
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
    if equal a with b
      set a to 5  ; `a` still has module scope
      set c to 3  ; `c` is scoped to `if`
```

TODO add an example of Closures

Any references to mutable data types, such as list or object, *must* start with a `$`.

```
  set $a to $[1 2 3]
```

The `get` and `set` methods exist on all tuples, lists, maps, and objects, respecting the mutability characteristic. A `set` operation will always return the full value of the iterable.

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
  set c to (if equal a with b
    true
  else
    false)
```

Of course, the previous example could be written more simply.

```
  set c to (equal a with b)
```

Conditions do not convert type.

```
  if equal 0 with (toNumber '')
    true
```

`if` does not require parentheses around the first function call.

```
  ; these two lines are the same
  if lessThan a under 5  
    true
  if (lessThan a under 5)
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
  for lessThan a under 5
    set a to (add 1 to a)
```

Breaks and continues are allowed as well.

```
  for set [_ num] to (range myTuple)
    if lessThan num under 5
      break
    if greaterThan num above 5
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

3. Aliases
--------------------------------------------------------------------------------

Aliases are opt-in language features that can reduce some verbosity from the language, at the cost of some consistency.

#### 3.1 Set

The set alias allows the regular variable syntax instead of the `set ... to ...` syntax.

```
  a = 42
```

#### 3.2 Getters and Setters

Many languages allow using `object.key` and `object[key]` for getters and setters of iterables, and Garden's alias can allow for that as well. Using the dot notation, the key is a string.

```
  set a to myMap.key
  set b to myTuple[0]
  set $myObj.key to a
  set $myList[0] to b
```

#### 3.3 Comprehensions

A few languages offer comprehensions as an alternative iterate-to-generate interface.

```
  [(divide num by 3) for set [_ num] in (range myTuple)]
```

TODO Add an example of Map / Object comprehensions

#### 3.4 Destructuring

`for set [...] to (range ...)` statements already provide a most basic destructuring. This alias will turn on destructuring across the board.

```
  set [a b] to [1 2]
  set {a b} to {'a'=1 'b'=2}
```

#### 3.5 Inline-Block

Sometimes, having to hit return just for a single-line block doesn't feel right. This alias enables a work-around. The colon character here replaces the newline plus indent.

```
  map lis by (do value: divide value by 3)
```

#### 3.6 Ternary operation

Sometimes, having a single line set a value conditionally is convenient.

```
  set a to (if equal a with b then a else b)
```

#### 3.7 Pipe

Sometimes, we can lose the "step-by-step" feel, and the pipe alias can help restore this feeling by letting us chain functions. The previous value is passed to the succeeding function as the given (first) argument. Pipes may be used on the same line or on succeeding indented lines.

```
  set b to a
    | filter by filteringTest
    | map by updater
    | sort by conditionalTest
    | reduce by reducer after 0
```

#### 3.8 Comparison Operators

Comparison operators add back in the typical syntax, as well as the typical order of operations. Options include full function names, symbols, or both.

- not, !
- notEqual, !=
- equal, ==
- lessThan, <
- greaterThan, >
- lessThanOrEqual, <=
- greaterThanOrEqual, >=
- in
- and, &&
- or, ||

TODO Operator precedence with symbols

#### 3.9 Mathematical Operators

Mathematical operators add back in the typical syntax, as well as the typical order of operations. Function names, symbols, or both are options.

- multiply, times, *
- divide, dividedBy, /
- modulus, remainder, %
- add, plus, +
- subtract, minus, -
- power, toPower, ^

TODO Operator precedence with symbols

TODO add an alias for Module import alias (see golang)

4. Systems
--------------------------------------------------------------------------------

### 4.1 Universal Functions

### 4.2 Concurrency

### 4.3 Execution Rules: Build and Run

- Each indent should be two spaces per indent.
- Functions must contain less than ten statements.
- Blocks must not go more than four levels deep.
- One empty line should be after each block.
- Two spaces should be before starting an inline comment.
- Variable names should use camelCase.
- All imports should be used.
- All variables should be used.
- No lines should have trailing whitespace.
- Lines should be no longer than eighty characters.
- Types must match to do a comparison.
- Any compiler or linter for Garden should statically check primitive types (none, boolean, number, string, tuple, list, map, object, module) to ensure the types match correctly. This static type check must be done without the use of type annotations. Static type checking should allow that variables can change type, essentially creating a union type.
- A linter should check to ensure that the map keys as used are defined, and if not a condition statement is used to prevent key undefined.
- A reference to a mutable data type should be prefixed with `$`.
  - `~` prefix indicates the referenced data _may_ be mutable or immutable, in the case of a function argument.
- Check for any unused code.
- Check for duplicated code.

### 4.4 Standard Library

### 4.5 Implementation Checklist

### 4.6 Best Practices

### 4.7 Examples

#### Quicksort, no Aliases

A mutable quicksort implementation.

```
  set quicksort to do given ~a
    set $less to $[]
    set $equal to $[]
    set $greater to $[]
    if greaterThan (length ~a) over 1
      set pivot to (random (length ~a))
      for set [_ x] to (range ~a)
        if lessThan x under pivot
          append x to $less
        if equal x with pivot
          append x to $equal
        if greaterThan x over pivot
          append x to $greater
      return (
        concat (quicksort $less)
          with $equal
          with (quicksort $greater)
      )
    else
      return ~a
```

#### Quicksort, with Aliases

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

### 4.8 TODO

To noodle on
- Complex Numbers
- Global functions
  - Sets operations instead of loops
- Standard library
  - Vector / Matrix operations
  - Handling dates/times
- Default arguments
- Functions should use full words, not abbreviations or acronyms.
- Asynchronous / concurrent code
  - Event based programming (when/then) and constraints (unless)
  - channels / coroutines / generators etc
- Safety by observation
- Receiving blocks
- Adjectives as function arguments
- switch/match alias (?)
- main function
