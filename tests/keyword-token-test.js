import test from "ava";
import { KeywordToken, makeKeywordTokens } from "../src/keyword-token";
import { StringChunk } from "../src/string-chunk";

test.only("keyword token", t => {
  const tokens = makeKeywordTokens(["function"]);

  t.is(tokens.length, 1);

  const kw = tokens[0];

  console.log(kw);
  //const kwi = new kw();
  //t.is(kw.type, 'keyword');
  t.is(kw.value, "function");
  t.is(kw.length, 7);
});

test("keyword token parse", async t => {
  const KWToken = makeKeywordTokens(["function"])[0];
  const chunk = new StringChunk("function");
  const token = KWToken.parse(chunk);
  t.is(token.value, "function");
});

test("keyword token several chunks", async t => {
  const KWToken = makeKeywordTokens(["function"])[0];
  let token;

  const chunk = new StringChunk("funct");
  token = KWToken.parse(chunk);
  t.is(token, undefined);
  chunk.append("ion ");
  token = KWToken.parse(chunk);
  t.is(token.value, "function");
});
