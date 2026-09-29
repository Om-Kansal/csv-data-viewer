import { useState } from "react";

function FilterSection({
  columns,
  activeFilters,
  onAddFilter,
  onRemoveFilter, 
  onClearAllFilters,
}) {
  
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);
  const [filterValue, setFilterValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); 
    const trimmedValue = filterValue.trim();

    if (trimmedValue === "") {
      onRemoveFilter(selectedColumn); // empty value removes this column's filter
      return;
    }

    onAddFilter({ column: selectedColumn, value: trimmedValue });
    setFilterValue(""); 
  }

  return (
    <section className="card">
      <h2>Filter</h2>

      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="filter-field">
          <label htmlFor="filter-column" className="field-label">
            Column
          </label>
          <select
            id="filter-column"
            value={selectedColumn}
            onChange={(event) => setSelectedColumn(event.target.value)}
          >
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-value" className="field-label">
            Value
          </label>
          <input
            id="filter-value"
            type="text"
            placeholder="e.g. Delhi"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button type="submit" className="button-primary">
            Add filter
          </button>
          <button
            type="button"
            className="button-secondary"
            onClick={onClearAllFilters}
          >
            Clear all
          </button>
        </div>
      </form>

      {activeFilters.length > 0 && (
        <ul className="active-filters">
          {activeFilters.map((filter) => (
            <li key={filter.column} className="filter-tag">
              {filter.column}: <strong>{filter.value}</strong>
              <button
                type="button"
                className="remove-filter"
                aria-label={`Remove filter on ${filter.column}`}
                onClick={() => onRemoveFilter(filter.column)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FilterSection;
