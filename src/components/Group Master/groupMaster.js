// src/components/GroupMaster.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./groupMaster.css";

const GroupMaster = () => {
  const [groupCode, setGroupCode] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("code");
  const [groups, setGroups] = useState([]);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch Groups from API
  const fetchGroups = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/groupmaster/");
      setGroups(response.data);
      console.log("Groups fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching group data:", error);
      alert("Error fetching group data.");
    }
  }, []);

  // Save Group to API
  const handleSave = useCallback(async () => {
    if (!groupCode.trim() || !groupDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/groupmaster/", {
        GROUP_code: groupCode, // ✅ Match Django field name
        GROUP_description: groupDescription, // ✅ Match Django field name
      });

      if (response.status === 201 || response.status === 200) {
        alert("Group saved successfully!");
        setGroupCode("");
        setGroupDescription("");
        fetchGroups(); // Refresh the list
      }
    } catch (error) {
      console.error("Error saving group:", error);
      alert("Failed to save group. Please try again.");
    }
  }, [groupCode, groupDescription, fetchGroups]);

  // Clear form fields (New Group)
  const handleNew = useCallback(() => {
    setGroupCode("");
    setGroupDescription("");
  }, []);

  // Load Groups when Component Mounts
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  // Keyboard Shortcuts
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
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, handleNew, navigate]);

  // Filtered Groups for Display
  const filteredGroups = groups.filter((group) =>
    searchBy === "code"
      ? group.GROUP_code?.toLowerCase().includes(search.toLowerCase())
      : group.GROUP_description?.toLowerCase().includes(search.toLowerCase())
  );

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
            placeholder="Enter Group Code"
          />
        </div>
        <div className="form-row">
          <label>Group Description</label>
          <textarea
            rows="3"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            style={{ resize: "vertical", width: "75%" }}
            placeholder="Enter Group Description"
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
            placeholder="Search Groups"
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
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.GROUP_code}</td>
                    <td>{group.GROUP_description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No matching groups found.</td>
                </tr>
              )}
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
