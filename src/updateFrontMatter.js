import fs from "node:fs/promises";
import fm from "front-matter";
import { stringify } from "yaml";

export async function updateFrontMatter(f, newAttributes)
{
    // Load it
    let parsed = fm(await fs.readFile(f, "utf8"));

    // Clean attributes, removing those that we probably added ourself
    newAttributes = Object.assign({}, newAttributes);
    delete newAttributes.body;
    delete newAttributes.path;
    if (!parsed.title)
        delete newAttributes.title;

    // Merge old + new attributes
    let attributes = Object.assign(parsed.attributes, newAttributes);

    // Format new content
    let content = `---\n`;
    content += stringify(attributes);
    content += `---\n`;
    content += parsed.body

    // Write it
    fs.writeFile(f, content, "utf8");
}
