# expo-uri-to-pdf

Provides an API that can generate a PDF file from anything WebKit can render.

###### Example
```
import { uriToPdf } from "expo-uri-to-pdf";

const pdfFile = await uriToPdf("https://www.google.com/");

console.log(pdfFile.uri)

--> /Library/Caches/6f043888-556f-490d-a129-4bde29ef82e0.pdf

```
