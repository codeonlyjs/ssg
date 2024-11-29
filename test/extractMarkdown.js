import fs from "node:fs/promises";
import { test } from "node:test";
import { strict as assert } from "node:assert";
import { extractMarkdown } from "../src/extractMarkdown.js";

test("simple", async () => {

    let md = extractMarkdown(`

# Title

paragraph
`);

    assert.equal(md.title, "Title");
    assert.equal(md.synopsis, "paragraph");
});


test("title with code", async () => {

    let md = extractMarkdown(`# Title \`with code\``);
    assert.equal(md.title, "Title with code");
});


test("para with code", async () => {

    let md = extractMarkdown(`Paragraph \`with\` code`);
    assert.equal(md.synopsis, "Paragraph with code");
});


test("para with link", async () => {

    let md = extractMarkdown(`Paragraph with [a link](#)`);
    assert.equal(md.synopsis, "Paragraph with a link");
});
