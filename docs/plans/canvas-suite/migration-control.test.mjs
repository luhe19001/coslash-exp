import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const read = (name) => readFileSync(new URL(name, import.meta.url), "utf8");
const html = read("./migration-control.html");

function loadSidecar(id) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(read(`./task-status/${id}.js`), context);
  return context.window.COSLASH_CANVAS_TASK_STATUS[id];
}

test("every inline dashboard script parses", () => {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1].trim())
    .filter(Boolean);
  assert.ok(scripts.length > 0);
  for (const script of scripts) new vm.Script(script);
});

test("monitor exposes sidecar-backed task tickets and completed Task 12 truth", () => {
  assert.match(html, /id="ticketList"/);
  assert.match(html, /function openTickets\(\)/);
  assert.match(html, /function renderTickets\(\)/);
  assert.match(html, /renderTickets\(\);/);
  assert.match(html, /issues: Array\.isArray\(file && file\.issues\)/);

  const task12 = loadSidecar("12");
  assert.equal(task12.state, "complete");
  assert.equal(task12.sha, "780f4bd6f1a1d62ba724850fdd704bf0c4506f11");
  assert.deepEqual(
    JSON.parse(JSON.stringify(task12.issues)),
    [
      {
        id: "I-007",
        severity: "P1",
        status: "resolved",
        summary:
          "465eccf supplies the tracked native-tmux lifecycle; c1b6aa6 hardens its evidence capture; 43e2923 integrates the concrete controller driver; 780f4bd resolves shutdown and cross-product review findings.",
        owner: "master review / integration",
      },
    ],
  );
});

test("central Markdown records mirror resolved I-007 and completed Task 12", () => {
  assert.match(read("./ISSUES.md"), /\| I-007 \| high\s+\| 12[\s\S]*\| resolved \|/);
  assert.match(read("./STATUS.md"), /\| 12 DaGama controller\s+\| complete .*780f4bd/);
  assert.match(
    read("./REPORTS.md"),
    /## Task 12 — DaGama controller and run lifecycle — 2026-08-09[\s\S]*I-007/,
  );
});
