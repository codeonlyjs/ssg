import { glob } from "glob";

import { loadFrontMatter } from "./loadFrontMatter.js";

// Load the front matter for a set of files
// Files can be an array of filenames, or a glob expression
// Returns a object with { filename: frontmatter }
export async function loadAllFrontMatter(files, options)
{
    // Glob files?
    if (typeof(files) == 'string')
    {
        files = await glob(files);
    }

    // Load all
    let result = [];
    for (let f of files)
    {
        result.push(await loadFrontMatter(f, options));
    }

    return result;
}

