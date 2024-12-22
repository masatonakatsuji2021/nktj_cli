# Nktj CLI

Console control package for TypeScript (Node.js).

- [Install](#install)
- [Output](#out)
- [Output (With line breaks)](#outn)
- [Specifying indentation](#indent)
- [Colored text output](#outcolor)
- [Input](#in)
- [Output of newline](#newline)
- [Command Aregments](#getArgs)
- [Command Aregments on Option](#getArgsoption)

<a id="install"></a>

## # install

```
npm i nktj_cli
```

<a id="out"></a>

## # Output

```typescript
CLI.out("Hallo World.");
```

The output result is as follows.

```
Hallo World.
```

Code with method chaining.

```typescript
CLI.out("Hallo World.").out("....OK");
```

The output result is as follows.

```
Hallo World.....OK
```

<a id="outn"></a>

## # Output (With line breaks)

```typescript
CLI.outn("Hallo World.");
```

The output result is as follows.

```
Hallo World.
```

Code with method chaining.

```typescript
CLI.outn("Hallo World.").outn("....OK");;
```
The output result is as follows.

```
Hallo World.
....OK
```

<a id="indent"></a>

## # Specifying indentation

```typescript
CLI.outn("Hallo World.");
CLI.setIndent(5).outn("....OK");
```

The output result is as follows.

```
Hallo World.
     ....OK
```

Indentation continues until the next ``setIndent`` command is encountered.

```typescript
CLI.outn("Hallo World.");
CLI.setIndent(5).outn("....OK");
CLI.outn("....description");
```

The output result is as follows.

```
Hallo World.
     ....OK
     ....description
```

<a id="outcolor"></a>

## # Colored text output

To specify colored text, use the Color enumeration as the second argument to the out or outn method.

The following will be output in red:

```typescript
import { CLI, Color } from "nktj_cli";

...

CLI.outn("Red Text Sample...", Color.Red);
```

To specify a color origin that is not specified in the Color enumeration, use the ``setColorOrigin`` method.  
(Specify RGB with Array)

```typescript
CLI.outn(CLI.setColorOrigin("Original Color TExt...", [100,200,300]));
```

To use colored text for intermediate weather, use ``setColor``.  
For example, to make only the "#" part green, write it as follows:

```typescript
CLI.out(CLI.setColor("#", Color.Green) + " Text Text Text...");
```

<a id="in"></a>

## # Input

To get the input value from standard input,   
specify the ``in`` method and use async/await to get the return value.  

```typescript
CLI.outn("please keyword :");
const value = await CLI.in();
```

By adding arguments, you can specify the output before the input.

```typescript
const value = await CLI.in("please keyword");
```

<a id="newline"></a>

## # Output of newline

The ``br`` method creates a new line.  
When this method is used, if an indent is specified,   
a space of the specified indent is output after the line break.  
[Indentation settings are described here](#indent)


```typescript
CLI.outn("Hallo World.");
CLI.br();
CLI.outn("....OK");
```

The same can be done with method chaining as shown below.

```typescript
CLI
    .outn("Hallo World.")
    .br()
    .outn("....OK")
;
```

<a id="getArgs"></a>

## # Command Aregments

To get the arguments when a command is executed, use the ``getArgs`` method.  
This method only gets simple argument values, excluding option values ​​with ``--``.

```typescript
const args = CLI.getArgs();
```

For example, if you run the following command:

```
$ node . aaa bbb cccc
```

The results obtained by ``getArgs`` are as follows.

```
["aaa", "bbb", "cccc"]
```

<a id="getArgsoption"></a>

## # Command Aregments on Option

To get option values ​​from arguments when executing a command, use the ``getArgsOption`` method.

```typescript
const argsOption = CLI.getArgsOption();
```

For example, if you run the following command:

```
$ node . aaaa --name abcdefg --mode 1
```

The results obtained by ``getArgsOption`` are as follows.  
In this case, "aaaa" is not retrieved, so to retrieve it, use ``getArgs``

```
{
    name: "abcdefg",
    mode: 1,
}
```
