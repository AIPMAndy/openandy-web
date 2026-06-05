import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("fortune form submits birthDate as the API solarDate field", () => {
  const pageSource = readFileSync(new URL("../app/fortune/page.tsx", import.meta.url), "utf8");
  const apiSource = readFileSync(new URL("../app/api/fortune/route.ts", import.meta.url), "utf8");

  assert.match(apiSource, /const\s*\{[^}]*solarDate[^}]*\}\s*=\s*formData/s);
  assert.match(pageSource, /solarDate\s*:\s*formData\.birthDate/);
});
