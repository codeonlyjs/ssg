#!/usr/bin/env node

import { register } from 'node:module';
import { generateStatic } from "./generateStatic.js";


// Options
let options = {
    entryFile: [ "main-ssg.js", "main-ssr.js", "Main.js", ],
    entryMain: [ "main-ssg", "main-ssr", "main" ],
    entryHtml: [ "dist/index.html", "index-ssg.html", "index.ssr.html", "index.html" ],
    entryUrls: [ ],
    ext: ".html",
    pretty: true,
    outDir: "./dist",
    baseUrl: "http://localhost/",
    verbose: false,
}

// Process command line
for (let a of process.argv.slice(2))
{
    let m = a.match(/^--(.*?)(?::(.*?))?$/);
    if (m)
    {
        switch (m[1].toLowerCase())
        {
            case "entry-file":
                options.entryFile = [ m[2] ];
                break;

            case "entry-main":
                options.entryMain = [ m[2] ];
                break;

            case "entry-html":
                options.entryHtml = [ m[2] ];
                break;

            case "entry-url":
                options.entryUrls.push(m[2]);
                break;
            
            case "ext":
                options.ext = m[2];
                if (!options.ext.startsWith("."))
                    options.ext = "." + options.ext;
                break;

            case "pretty":
                if (m[2] && m[2] == "no")
                    options.pretty = false;
                break;

            case "verbose":
                options.verbose = true;
                break;

            case "outdir":
                options.outDir = m[2];
                break;

            case "baseurl":
                options.baseUrl = m[2];
                break;
        }
    }
    else
    {
        throw new Error(`Unknown argument: '${a}'`);
    }
}

if (options.verbose)
    console.log(JSON.stringify(options, null, 4));

let result = await generateStatic(options);

// Done!
if (!options.quiet)
    console.log(`Rendered ${result.files.length} files in ${result.elapsed}ms.`);


