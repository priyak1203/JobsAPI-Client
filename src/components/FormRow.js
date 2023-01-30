function FormRow({ type, value, name, placeholder, handleChange, horizontal }) {
  return (
    <div className="form-row">
      {!horizontal && (
        <label htmlFor={name} className="form-label">
          {name}
        </label>
      )}

      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}

export default FormRow;
