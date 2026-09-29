# CSV Data Viewer

A small React app that lets you upload a CSV file, view it in a table, and filter the rows by any column. Everything runs in the browser — there is no backend.

## How to run

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

A sample file is included at `public/sample.csv` — you can upload it to try the app.

## How it works

- `App.jsx` holds the data (file name, columns, rows) and the list of applied filters. It parses the CSV with PapaParse and works out which rows to show.
- `FileUpload.jsx` shows the file input and the uploaded file name.
- `FilterSection.jsx` has the column dropdown, the value input, the Add filter / Clear all buttons, and the list of applied filters (each can be removed with ×).
- `DataTable.jsx` displays the rows in a table, or a message if nothing matches.

## Filtering

Filtering is case-insensitive and matches part of the cell text, so `del`, `delhi` and `DELHI` all match `Delhi`.

You can filter on several columns at once. For example, add `City: Delhi` and then `Department: IT` — only rows matching **both** are shown. Adding a filter on a column that already has one replaces it. Remove a single filter with its × button, or use **Clear all**.
