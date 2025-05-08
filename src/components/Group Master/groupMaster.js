import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // <-- Added
import "./groupMaster.css";

const GroupMaster = () => {
  const [groupCode, setGroupCode] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("code");

  const searchInputRef = useRef(null);
  const navigate = useNavigate(); // <-- Added

  const handleSave = useCallback(() => {
    console.log("Saved:", { groupCode, groupDescription });
    alert("Group saved successfully!");
    setGroupCode("");
    setGroupDescription("");
  }, [groupCode, groupDescription]);

  const handleNew = useCallback(() => {
    setGroupCode("");
    setGroupDescription("");
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
        navigate("/"); // <-- Navigate instead of closing
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, handleNew, navigate]);

  return (
    <div className="group-master-container">
      <div className="title">Group Master</div>

      <div className="group-master-section">
        <h3>Group Master Details</h3>
        <div className="form-row">
          <label>Group Code</label>
          <input
            type="text"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Group Description</label>
          <textarea
            rows="3"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            style={{ resize: "vertical", width: "75%" }}
          ></textarea>
        </div>
        <div className="button-row">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleNew}>New</button>
        </div>
      </div>

      <div className="group-master-section">
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
                <th>Group Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Sample Group</td>
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

export default GroupMaster;
