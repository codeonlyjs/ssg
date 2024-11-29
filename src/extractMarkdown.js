import * as commonmark from "commonmark";

// Extract title and synopsis from a markdown file
export function extractMarkdown(markdown)
{
    // Parse markdown
    let parser = new commonmark.Parser();
    let ast = parser.parse(markdown);
    let walker = ast.walker();
    let ev;
    let title = null;
    let synopsis = null;
    let inTitle = false;
    let inSynopsis = false;
    while (ev = walker.next())
    {
        // Entering first h1?
        if (ev.node.type === 'heading')
        {
            if (ev.entering &&  ev.node.level == 1 && title == null)
            {
                inTitle = true;
                title = "";
            }
            else
            {
                inTitle = false;
            }
        }

        // Entering first paragraph?
        if (ev.node.type === 'paragraph')
        {
            if (ev.entering && synopsis == null)
            {
                inSynopsis = true;
                synopsis = "";
            }
            else
            {
                inSynopsis = false;
            }
        }

        // Capture heading text
        if (ev.node.type === 'text' || ev.node.type === 'code')
        {
            if (inTitle)
                title += ev.node.literal;
            if (inSynopsis)
                synopsis += ev.node.literal;
        }
    }

    return { title, synopsis }

}