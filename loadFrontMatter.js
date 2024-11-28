import path from "node:path/posix";
import fs from "node:fs/promises";
import fm from "front-matter";

export async function loadFrontMatter(f, options)
{
    // Load it
    let parsed = fm(await fs.readFile(f, "utf8"));
    let frontMatter = parsed.attributes;

    // Try to extract first <h1> title (unless title attribute already found in front matter)
    if (!frontMatter.title && f.endsWith(".md"))
    {
        let title = /^#\s+(.*)\s+#?$/gm.exec(parsed.body);
        if (title)
            frontMatter.title = title[1];
    }

    // Store path too
    if (!frontMatter.path)
        frontMatter.path = path.join(".", f.replace(/\\/g, "/"));

    // Keep the body too?
    if (options?.keepBody)
        frontMatter.body = parsed.body;
 
    return frontMatter;
}
