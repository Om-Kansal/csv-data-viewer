import { useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload.jsx";
import FilterSection from "./components/FilterSection.jsx";
import DataTable from "./components/DataTable.jsx";
import "./App.css";

function parseDateValue(value) {
  const text = String(value).trim();
  const slashDate = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (slashDate) {
    let month = Number(slashDate[1]);
    let day = Number(slashDate[2]);
    const year = Number(slashDate[3]);

    if (month > 12) {
      [day, month] = [month, day];
    }

    const timestamp = Date.UTC(year, month - 1, day);
    const parsed = new Date(timestamp);
    if (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day
    ) {
      return timestamp;
    }
    return null;
  }

  const timestamp = Date.parse(text);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function App() {
  
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  
  const [activeFilters, setActiveFilters] = useState([]);

  // Called when the user picks a CSV file
  function handleFileSelected(file) {
    setErrorMessage("");

    Papa.parse(file, {
      header: true, 
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (result) => {
        if (result.meta.fields.length === 0 || result.data.length === 0) {
          setErrorMessage("This file has no data. Please choose another CSV file.");
          return;
        }

        setFileName(file.name);
        setColumns(result.meta.fields);
        setRows(result.data);
        setActiveFilters([]); 
      },
      error: () => {
        setErrorMessage("Sorry, this file could not be read. Please try another CSV file.");
      },
    });
  }

  // Add a filter. If that column already has a filter, replace it.
  function addFilter(newFilter) {
    const otherFilters = activeFilters.filter(
      (filter) => filter.column !== newFilter.column
    );
    setActiveFilters([...otherFilters, newFilter]);
  }

 
  function removeFilter(column) {
    setActiveFilters(activeFilters.filter((filter) => filter.column !== column));
  }

  
  // first iterate over all the rows and check wheather the row is applicable with each filter
  const visibleRows = rows.filter((row) => {
    return activeFilters.every((filter) => {

      const cellText = String(row[filter.column] ?? "").toLowerCase();

      if (filter.column.toLowerCase() === "date") {
        const cellDate = parseDateValue(row[filter.column]);
        const startDate = parseDateValue(filter.value[0]);
        let endDate = parseDateValue(filter.value[1]);

        if (cellDate === null || startDate === null || endDate === null) {
          return false;
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(filter.value[1])) {
          endDate += 24 * 60 * 60 * 1000 - 1;
        }

        return cellDate >= startDate && cellDate <= endDate;
      }
      return cellText.includes(filter.value.toLowerCase());
    });
  });

  const hasData = rows.length > 0;

  return (
    <main className="page">
      <header className="page-header">
        <h1>CSV Data Viewer</h1>
        <p>
          Upload a CSV file to see its data in a table. Then pick a column and
          type a value to filter the rows. You can filter on several columns at once.
        </p>
      </header>

      <FileUpload
        fileName={fileName}
        errorMessage={errorMessage}
        onFileSelected={handleFileSelected}
      />

      {hasData ? (
        <>
          
          <FilterSection
            key={columns.join(",")}
            columns={columns}
            activeFilters={activeFilters}
            onAddFilter={addFilter}
            onRemoveFilter={removeFilter}
            onClearAllFilters={() => setActiveFilters([])}
          />
          <p className="row-count">
            Showing {visibleRows.length} of {rows.length} rows
          </p>
          <DataTable columns={columns} rows={visibleRows} />
        </>
      ) : (
        <p className="empty-message">
          No file uploaded yet.
        </p>
      )}
    </main>
  );
}

export default App;
