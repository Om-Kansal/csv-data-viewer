function DataTable({ columns, rows }) {
  if (rows.length === 0) {
    return (
      <p className="empty-message">
        No rows match your filter. Try a different value or clear the filter.
      </p>
    );
  }

  return (
    
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
