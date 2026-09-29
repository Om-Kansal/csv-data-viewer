function FileUpload({ fileName, errorMessage, onFileSelected }) {
  function handleChange(event) {
    const file = event.target.files[0];
    if (file) {
      onFileSelected(file);
    }
    
    event.target.value = "";
  }

  return (
    <section className="card">
      <label htmlFor="csv-file" className="field-label">
        Choose a CSV file
      </label>
      <input
        id="csv-file"
        type="file"
        accept=".csv,text/csv"
        onChange={handleChange}
      />

      {fileName && (
        <p className="file-name">
          Uploaded file: <strong>{fileName}</strong>
        </p>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </section>
  );
}

export default FileUpload;
