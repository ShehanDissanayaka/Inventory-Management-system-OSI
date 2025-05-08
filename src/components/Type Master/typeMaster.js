import React, { useEffect, useRef, useState, useCallback } from "react";
import "./typeMaster.css";

const TypeMaster = () => {
  const [typeCode, setTypeCode] = useState("");
  const [typeDescription, setTypeDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("code");

  const searchInputRef = useRef(null);

  const handleSave = useCallback(() => {
    console.log("Saved:", { typeCode, typeDescription });
    alert("Type saved successfully!");
    setTypeCode("");
    setTypeDescription("");
  }, [typeCode, typeDescription]);

  const handleNew = useCallback(() => {
    setTypeCode("");
    setTypeDescription("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      } else if (e.ctrlKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNew();
      } else if (e.key === "F2") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        window.close(); // Use a custom close handler if needed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, handleNew]);

  return (
    <div className="type-master-container">
      <div className="title">Type Master</div>

      <div className="type-master-section">
        <h3>Type Master Details</h3>
        <div className="form-row">
          <label>Type Code</label>
          <input
            type="text"
            value={typeCode}
            onChange={(e) => setTypeCode(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Type Description</label>
          <textarea
            rows="3"
            value={typeDescription}
            onChange={(e) => setTypeDescription(e.target.value)}
            style={{ resize: "vertical", width: "75%" }}
          ></textarea>
        </div>
        <div className="button-row">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleNew}>New</button>
        </div>
      </div>

      <div className="type-master-section">
        <h3>Search</h3>
        <div className="form-row-search">
          <label>Search</label>
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
            <option value="code">Code</option>
            <option value="description">Description</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={searchInputRef}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace this with dynamic rendering */}
              <tr>
                <td>001</td>
                <td>Sample Type</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="footer-hint">
        Save = Ctrl+S | New = Ctrl+N | Focus Search = F2 | Exit = Esc
      </div>
    </div>
  );
};

export default TypeMaster;
