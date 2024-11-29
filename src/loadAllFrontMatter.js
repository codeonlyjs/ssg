import fs from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";

import { loadFrontMatter } from "./loadFrontMatter.js";

// Load the front matter for a set of files
// Files can be an array of filenames, or a glob expression
// Returns a object with { filename: frontmatter }
export async function loadAllFrontMatter(files, options)
{
    if (!options)
        options = {};

    // Glob files?
    if (typeof(files) == 'string')
    {
        files = await glob(files);
    }

    // Load all
    let result = [];
    for (let f of files)
    {
        // read file content
        let content = await fs.readFile(f, "utf8")

        // Parse front matter
        let fm = loadFrontMatter(content, options)

        // Capture path?
        if (!fm.path && options.path)
        {
            fm.path = "/" + path.join(".", f).replace(/\\/g, "/");

            // Remove extension
            if (options.noext)
                fm.path = fm.path.replace(/\.[^/.]+$/, "")
        }

        result.push(fm);
    }

    return result;
}

