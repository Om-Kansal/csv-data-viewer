# CSV Data Viewer

A small React app that lets you upload a CSV file, view it in a table, and filter the rows by any column. Everything runs in the browser — there is no backend.

## How to run

```bash
npm install
npm run dev
```

## How it works

- Papaparse is used to read the uploaded file and converted into javascript array containing objects, each onject refers to a perticular row.
- useState is used to maintain applied filters.
- filter out the data rows by apply all filters
- then DataTable.jsx is respinsible for showcase the filtered data
