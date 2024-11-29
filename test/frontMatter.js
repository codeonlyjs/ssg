import fs from "node:fs/promises";
import { test } from "node:test";
import { strict as assert } from "node:assert";
import { loadFrontMatter } from "../src/loadFrontMatter.js";
import { updateFrontMatter } from "../src/updateFrontMatter.js";
import { loadAllFrontMatter } from "../src/loadAllFrontMatter.js";

let markdown = `---
tag: test
date: "2024-04-27"
---

# Main Heading

This is the first paragraph.

## Second Heading

Second paragraph
`

test("load frontmatter", async () => {

    let fm = await loadFrontMatter(markdown, { title: true, synopsis: true });
    assert.equal(fm.tag, "test");
    assert.equal(fm.date, "2024-04-27");
    assert.equal(fm.title, "Main Heading");
    assert.equal(fm.synopsis, "This is the first paragraph.");
});

test("save frontmatter", async () => {

    await fs.copyFile("./test/test.md", "./test/temp.md");
    await updateFrontMatter("./test/temp.md", { 
        id: 1,
        date: undefined
    });

    let fm = await loadFrontMatter(await fs.readFile("./test/temp.md", "utf8"));
    assert.equal(fm.id, 1);
    assert.equal(fm.date, undefined);
});

test("load all frontmatter", async () => {

    let files = await loadAllFrontMatter("./test/test*.md");
    assert.equal(files.length, 1);
    assert.equal(files[0].tag, "test");

});

test("load all frontmatter with path", async () => {

    let files = await loadAllFrontMatter("./test/test*.md", { path: true });
    assert.equal(files.length, 1);
    assert.equal(files[0].tag, "test");
    assert.equal(files[0].path, "/test/test.md");
});

test("load all frontmatter no ext", async () => {

    let files = await loadAllFrontMatter("./test/test*.md", { path: true, noext: true });
    assert.equal(files.length, 1);
    assert.equal(files[0].tag, "test");
    assert.equal(files[0].path, "/test/test");
});