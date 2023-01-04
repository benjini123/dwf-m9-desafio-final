import test from "ava";
import { decode, generate } from "./jwt";

test("generate token", (t) => {
  const token = generate({ mock: true });
  t.is(token, token);
});

test("decode token", (t) => {
  const token = decode({ mock: true });
  t.is(token, token);
});
