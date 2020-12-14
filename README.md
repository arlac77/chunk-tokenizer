[![npm](https://img.shields.io/npm/v/chunk-tokenizer.svg)](https://www.npmjs.com/package/chunk-tokenizer)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/chunk-tokenizer)](https://bundlephobia.com/result?p=chunk-tokenizer)
[![downloads](http://img.shields.io/npm/dm/chunk-tokenizer.svg?style=flat-square)](https://npmjs.org/package/chunk-tokenizer)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/chunk-tokenizer.svg?style=flat-square)](https://github.com/arlac77/chunk-tokenizer/issues)
[![Build Action Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fchunk-tokenizer%2Fbadge&style=flat)](https://actions-badge.atrox.dev/arlac77/chunk-tokenizer/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/chunk-tokenizer/badge.svg)](https://snyk.io/test/github/arlac77/chunk-tokenizer)
[![Coverage Status](https://coveralls.io/repos/arlac77/chunk-tokenizer/badge.svg)](https://coveralls.io/github/arlac77/chunk-tokenizer)

# chunk-tokenizer

Transform stream that emits tokens

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Token](#token)
    -   [possibleFirstChars](#possiblefirstchars)
    -   [register](#register)
        -   [Parameters](#parameters)
-   [characterSetFromString](#charactersetfromstring)
    -   [Parameters](#parameters-1)
-   [KeywordToken](#keywordtoken)
-   [makeKeywordTokens](#makekeywordtokens)
    -   [Parameters](#parameters-2)
-   [parse](#parse)
    -   [Parameters](#parameters-2)
-   [characterSetFromString](#charactersetfromstring)
    -   [Parameters](#parameters-3)
-   [makeOperatorTokens](#makeoperatortokens)
    -   [Parameters](#parameters-4)
-   [TokenMatcher](#tokenmatcher)
    -   [Parameters](#parameters-5)
    -   [Properties](#properties)

## Token

Abstract base token

### possibleFirstChars

Possible first chars

Returns **any** Set(<Number>) all possible first chars for the token

### register

register the token in the TokenMatcher

#### Parameters

-   `tokenMatcher` **[TokenMatcher](#tokenmatcher)** 

## characterSetFromString

Abstract base token

### possibleFirstChars

Possible first chars

Returns **any** Set(<Number>) all possible first chars for the token

### register

register the token in the TokenMatcher

#### Parameters

-   `tokenMatcher` **[TokenMatcher](#tokenmatcher)** 

## KeywordToken

**Extends Token**

## makeKeywordTokens

Creates a new token class for each token definition.

### Parameters

-   `tokenDefinitions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** keys are the operator names
-   `baseToken` **[KeywordToken](#keywordtoken)**  (optional, default `KeywordToken`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[KeywordToken](#keywordtoken)>** newly created KeywordToken classes

## parse

0 -> skip leading "
1 -> copy chars
2 -> escape

### Parameters

-   `chunk`  

## characterSetFromString

### Parameters

-   `str` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** all characters from the string

## makeOperatorTokens

Creates a new token class for each token definition.

### Parameters

-   `tokenDefinitions`  {Object} keys are the operator names
-   `baseToken`  {OperatorToken} (optional, default `OperatorToken`)

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;OpearatorToken>** newly created OperatorToken classes

## TokenMatcher

Holds a Set of tokens and identifies them based on the longest matching character string

### Parameters

-   `tokens` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Token](#token)>** 

### Properties

-   `tokens` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Token](#token)>** 
-   `registeredTokens` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Token](#token)>** 
-   `maxTokenLengthForFirstChar` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;Char, [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** 

# install

With [npm](http://npmjs.org) do:

```shell
npm install chunk-tokenizer
```

# license

BSD-2-Clause
