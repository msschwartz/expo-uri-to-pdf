# expo-uri-to-pdf

Provides an API that can generate a PDF file from anything WebKit can render.

###### Example
```
import { uriToPdf } from "expo-uri-to-pdf";

const pdfFile = await uriToPdf("https://www.google.com/");

console.log(pdfFile.uri)

--> /Library/Caches/6f043888-556f-490d-a129-4bde29ef82e0.pdf

```

<img width="720" alt="image" src="https://github.com/user-attachments/assets/c3bfc260-21c2-431a-aec2-6fa788bf8ce3" />
