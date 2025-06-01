// src/components/SupplierMaster/SupplierMaster.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SupplierMaster.css";

/* ---------- blank template ---------- */
const initialSupplier = {
  code: "",
  group: "",
  area: "",
  name: "",
  address: "",
  tele_1: "",
  tele_2: "",
  tele_mobile: "",
  fax: "",
  email: "",
  contact_person: "",
  term: "",
  customer: "",
  credit_limit: 0,
  credit_period: 0,
  vat_number: "",
  lock: false,
};

export default function SupplierMaster() {
  const [supplier, setSupplier] = useState(initialSupplier);

  /* list + search */
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // or "code"

  /* ----------- form handlers ----------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSupplier((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async () => {
  try {
    const res = await axios.post("/api/stockcontrol/suppliers/", supplier);
    if (res.status === 201) {
      alert("Supplier saved!");
      setSupplier(initialSupplier);
      fetchSuppliers(); // refresh table
    }
  } catch (err) {
    console.error("Save error:", err);

    if (err.response) {
      const contentType = err.response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        const data = err.response.data;
        let message = "Error saving supplier:\n";
        for (let key in data) {
          message += `${key}: ${data[key]}\n`;
        }
        alert(message);
      } else {
        alert("Server returned an unexpected error:\n" + err.response.statusText);
      }
    } else {
      alert("Unknown error occurred while saving supplier.");
    }
  }
};

  const handleReset = () => setSupplier(initialSupplier);

  /* ----------- table helpers ----------- */
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("/api/stockcontrol/suppliers/");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/stockcontrol/suppliers/");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchData();
}, []);


  const filtered = suppliers.filter((s) =>
    (s[searchField] || "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* ============ UI ============ */
  return (
    <>
      {/* ---------- FORM ---------- */}
      <form
        className="supplier-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <fieldset>
          <legend>Supplier Details</legend>

          {/* Row 1 */}
          <div className="row">
            <label>Supplier Code:</label>
            <input
              name="code"
              value={supplier.code}
              onChange={handleChange}
              required
            />

            <label>FAX:</label>
            <input name="fax" value={supplier.fax} onChange={handleChange} />
          </div>

          {/* Row 2 */}
          <div className="row">
            <label>Supplier Group:</label>
            <select
              name="group"
              value={supplier.group}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1">Group 1</option>
              <option value="2">Group 2</option>
            </select>

            <label>Area Code:</label>
            <select name="area" value={supplier.area} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Area 1</option>
              <option value="2">Area 2</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="row">
            <label>Name:</label>
            <input name="name" value={supplier.name} onChange={handleChange} />
          </div>

          {/* Row 4 */}
          <div className="row">
            <label>Address:</label>
            <textarea
              name="address"
              value={supplier.address}
              onChange={handleChange}
            />
          </div>

          {/* Row 5 */}
          <div className="row">
            <label>Telephone 1:</label>
            <input
              name="tele_1"
              value={supplier.tele_1}
              onChange={handleChange}
            />

            <label>Telephone 2:</label>
            <input
              name="tele_2"
              value={supplier.tele_2}
              onChange={handleChange}
            />
          </div>

          {/* Row 6 */}
          <div className="row">
            <label>Mobile:</label>
            <input
              name="tele_mobile"
              value={supplier.tele_mobile}
              onChange={handleChange}
            />
          </div>

          {/* Row 7 */}
          <div className="row">
            <label>Email:</label>
            <input
              name="email"
              value={supplier.email}
              onChange={handleChange}
            />

            <label>Contact Person:</label>
            <input
              name="contact_person"
              value={supplier.contact_person}
              onChange={handleChange}
            />
          </div>

          {/* Row 8 */}
          <div className="row">
            <label>Term:</label>
            <input name="term" value={supplier.term} onChange={handleChange} />

            <label>Customer Code:</label>
            <input
              name="customer"
              value={supplier.customer}
              onChange={handleChange}
            />
          </div>

          {/* Row 9 */}
          <div className="row">
            <label>Credit Limit:</label>
            <input
              type="number"
              name="credit_limit"
              value={supplier.credit_limit}
              onChange={handleChange}
            />

            <label>Credit Period (days):</label>
            <input
              type="number"
              name="credit_period"
              value={supplier.credit_period}
              onChange={handleChange}
            />
          </div>

          {/* Row 10 */}
          <div className="row">
            <label>VAT Reg No.:</label>
            <input
              name="vat_number"
              value={supplier.vat_number}
              onChange={handleChange}
            />

            <label>Lock:</label>
            <input
              type="checkbox"
              name="lock"
              checked={supplier.lock}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="buttons">
            <button type="submit">Save</button>
            <button type="reset">New</button>
          </div>
        </fieldset>
      </form>

      {/* ---------- SEARCH ---------- */}
      <div className="search-section">
        <label htmlFor="searchBox">Search:</label>
        <input
          id="searchBox"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="name">Supplier Name</option>
          <option value="code">Supplier Code</option>
        </select>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Supplier Name</th>
              <th>Telephone 1</th>
              <th>Telephone 2</th>
              <th>Mobile</th>
              <th>Lock</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.code}</td>
                  <td>{s.name}</td>
                  <td>{s.tele_1}</td>
                  <td>{s.tele_2}</td>
                  <td>{s.tele_mobile}</td>
                  <td>{s.lock ? "Yes" : "No"}</td>
                  <td>{s.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- FOOTER HINTS ---------- */}
      <div className="footer-hints">
        Save = Ctrl+S&nbsp;|&nbsp;New = Ctrl+N&nbsp;|&nbsp;Focus&nbsp;Search = F2&nbsp;|&nbsp;Exit = Esc&nbsp;|&nbsp;Refresh = F5
      </div>
    </>
  );
}

