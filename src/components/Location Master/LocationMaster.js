import React, { useEffect, useRef, useState, useCallback } from "react";
import "./LocationMaster.css";

const LocationMaster = () => {
  const [locationCode, setLocationCode] = useState("");
  const [description, setDescription] = useState("");
  const [invoicePrefix, setInvoicePrefix] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [haveMaintenance, setHaveMaintenance] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);

  const searchInputRef = useRef(null);

  const handleNew = useCallback(() => {
    setLocationCode("");
    setDescription("");
    setInvoicePrefix("");
    setAddress("");
    setIsActive(true);
    setHaveMaintenance(false);
    setInvoice(false);
  }, []);

  const handleSave = useCallback(() => {
    const newLocation = {
      id: Date.now(),
      locationCode,
      description,
      invoicePrefix,
      address,
      isActive,
      haveMaintenance,
      invoice,
    };
    setLocations((prev) => [...prev, newLocation]);
    handleNew();
  }, [
    locationCode,
    description,
    invoicePrefix,
    address,
    isActive,
    haveMaintenance,
    invoice,
    handleNew,
  ]);

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
        window.close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, handleNew]);

  const filteredLocations = locations.filter((loc) =>
    loc.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="location-master">
      <h2>Item Location Master</h2>

      <div className="form-section">
        <div className="form-group">
          <label>Location Code</label>
          <input
            type="text"
            value={locationCode}
            onChange={(e) => setLocationCode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Invoice Prefix</label>
          <input
            type="text"
            value={invoicePrefix}
            onChange={(e) => setInvoicePrefix(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>
          <label>
            <input
              type="checkbox"
              checked={haveMaintenance}
              onChange={(e) => setHaveMaintenance(e.target.checked)}
            />
            Have Maintenance
          </label>
          <label>
            <input
              type="checkbox"
              checked={invoice}
              onChange={(e) => setInvoice(e.target.checked)}
            />
            Invoice
          </label>
        </div>

        <div className="button-row">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleNew}>New</button>
        </div>
      </div>

      <div className="search-section">
        <label>Description</label>
        <input
          type="text"
          ref={searchInputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by description"
        />
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.locationCode}</td>
                  <td>{loc.description}</td>
                  <td>{loc.isActive ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No matching locations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="footer-hints">
        Save = Ctrl+S | New = Ctrl+N | Focus Search = F2 | Exit = Esc
      </div>
    </div>
  );
};

export default LocationMaster;
