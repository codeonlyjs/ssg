import fm from "front-matter";
import { extractMarkdown } from "./extractMarkdown.js";

export function loadFrontMatter(content, options)
{
    if (!options)
        options = {};

    // Load it
    let parsed = fm(content);
    let frontMatter = parsed.attributes;

    // Normalize tags
    if (options.tags)
    {
        // .tag => .tags []
        if (frontMatter.tag && !frontMatter.tags)
        {
            frontMatter.tags = [ frontMatter.tag ];
            delete frontMatter.tag;
        }

        // Split tags string into an array
        if (typeof(frontMatter.tags) === "string")
            frontMatter.tags = frontMatter.tags.split(/[ ,]/).filter(x => x.length > 0)
    }

    // Normlize categories
    if (options.categories)
    {
        // .tag => .tags []
        if (frontMatter.category && !frontMatter.categories)
        {
            frontMatter.categories = [ frontMatter.categories ];
            delete frontMatter.category;
        }

        // Split tags string into an array
        if (typeof(frontMatter.categories) === "string")
            frontMatter.categories = frontMatter.categories.split(/[ ,]/).filter(x => x.length > 0)
    }
    

    // Try to extract first <h1> title (unless title attribute already found in front matter)
    if ((options.title && !frontMatter.title) || 
        (options.synopsis && !frontMatter.synopsis))
    {
        let md = extractMarkdown(parsed.body);

        if (options.title && !frontMatter.title)
            frontMatter.title = md.title;
        if (options.synopsis && !frontMatter.synopsis)
            frontMatter.synopsis = md.synopsis;
    }

    // Keep the body too?
    if (options?.keepBody)
        frontMatter.body = parsed.body;
 
    return frontMatter;
}
