// src/components/ItemMaster/ItemMaster.js
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";   // ← same base instance you use elsewhere
import "./itemMaster.css";

const blank = {
    code: "",
    group: "",
    type: "",
    category: "",
    description: "",
    uom: "",
    warranty: "",
    reorderLevel: 0,
    reorderQty: 0,
    minLevel: 0,
    maxLevel: 0,
    purchasingPrice: 0,
    sellingPrice: 0,
    barcode: "",
    printQty: 1,
    active: true,
    invoicable: false,
    barcodeAvailable: false,
};

const API = "/api/stockcontrol/items/";

const toBackend = (f) => ({
    ITEM_code: f.code,
    ITEM_group: f.group,
    ITEM_type: f.type,
    ITEM_category: f.category,
    ITEM_description: f.description,
    ITEM_uom: f.uom,
    ITEM_warranty: f.warranty,
    ITEM_reorder_level: f.reorderLevel,
    ITEM_reorder_qty: f.reorderQty,
    ITEM_min_level: f.minLevel,
    ITEM_max_level: f.maxLevel,
    ITEM_purchase_price: f.purchasingPrice,
    ITEM_normal_selling_price: f.sellingPrice,
    ITEM_has_barcode: f.barcodeAvailable,
    ITEM_barcode: f.barcode,
    ITEM_invoicable: f.invoicable,
    ITEM_active: f.active,
});

const fromBackend = (it) => ({
    id: it.id,
    code: it.ITEM_code,
    description: it.ITEM_description,
});

const ItemMaster = () => {
    const [form, setForm] = useState(blank);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const codeInputRef = useRef(null);
    const navigate = useNavigate();

    /* ---------- fetch list ---------- */
    const fetchItems = useCallback(async () => {
        try {
            const res = await axios.get(API);
            setItems(res.data.map(fromBackend));
        } catch (err) {
            console.error(err);
            alert("Error fetching items");
        }
    }, []);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    /* ------------from select in the groupmaster-------- */
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("/api/stockcontrol/groupmaster/");
                setGroupOptions(response.data); // response should be an array of { GROUP_code, GROUP_description }
            } catch (error) {
                console.error("Error fetching group codes:", error);
                alert("Failed to fetch group codes");
            }
        };

        fetchGroups();
    }, []);

    /* -------from select in the typeMaster------ */

    const [typeOptions, setTypeOptions] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await axios.get("/api/stockcontrol/typemaster/");
                setTypeOptions(res.data);              // [{ TYPE_code, TYPE_description, … }]
            } catch (err) {
                console.error("Error loading types:", err);
                alert("Failed to load types");
            }
        };

        fetchTypes();
    }, []);

    /* -------from select in the Categorymaster------ */

    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/api/stockcontrol/categorymaster/");
                setCategoryOptions(res.data); // [{ CATEGORY_code, CATEGORY_description, ... }]
            } catch (err) {
                console.error("Error loading categories:", err);
                alert("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);



    /* ---------- handlers ---------- */
    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    };

    const resetForm = () => setForm(blank);

    const saveItem = useCallback(async () => {
        try {
            const res = await axios.post(API, toBackend(form));
            if (res.status === 201) {
                alert("Item saved!");
                resetForm();
                fetchItems();
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                const data = err.response.data;
                let msg = "Error:\n";
                for (let k in data) msg += `${k}: ${data[k]}\n`;
                alert(msg);
            } else {
                alert("Unknown error saving item");
            }
        }
    }, [form, fetchItems]);

    const removeItem = () => {
        if (!form.code) return alert("Enter a code to remove.");
        alert("Remove not implemented (demo).");
    };

    const printBarcode = () => {
        if (!form.barcodeAvailable) return alert("Barcode not available.");
        alert(`Printing ${form.barcode} – Qty ${form.printQty}`);
    };

    /* ---------- shortcuts ---------- */
    useEffect(() => {
        const onKey = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "s") { e.preventDefault(); saveItem(); }
            else if (e.ctrlKey && e.key.toLowerCase() === "n") { e.preventDefault(); resetForm(); }
            else if (e.key === "F2") { e.preventDefault(); codeInputRef.current?.focus(); }
            else if (e.key === "Escape") { e.preventDefault(); navigate("/stockcontrol"); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [saveItem, navigate]);

    /* ---------- search ---------- */
    const [searchCode, setSearchCode] = useState("");
    const [searchDesc, setSearchDesc] = useState("");

    // …and update `filtered`:
    const filtered = useMemo(
        () =>
            items.filter(
                i =>
                    i.code.toLowerCase().includes(searchCode.toLowerCase()) &&
                    i.description?.toLowerCase().includes(searchDesc.toLowerCase())
            ),
        [items, searchCode, searchDesc]
    );

    return (
        <div className="item-master-container">
            <div className="title">Item Master</div>

            <div className="form-section">
                <div className="left-column">
                    <div className="row">
                        <label>Code</label>
                        <input
                            name="code"
                            value={form.code}
                            onChange={onChange}
                            ref={codeInputRef}
                        />
                    </div>

                    <div className="row">

                        <label>Group</label>
                        <select name="group" value={form.group} onChange={onChange}>
                            <option value="">Select</option>
                            {groupOptions.map((g) => (
                                <option key={g.GROUP_code} value={g.GROUP_code}>
                                    {g.GROUP_code} - {g.GROUP_description}
                                </option>
                            ))}
                        </select>


                        <label>Type</label>
                        <select name="type" value={form.type} onChange={onChange}>
                            <option value="">Select</option>
                            {typeOptions.map(t => (
                                <option key={t.TYPE_code} value={t.TYPE_code}>
                                    {t.TYPE_code} - {t.TYPE_description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row">
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={form.description}
                            onChange={onChange}
                        />
                    </div>

                    <div className="row">
                        <label>Re-order Level</label>
                        <input
                            type="number"
                            name="reorderLevel"
                            value={form.reorderLevel}
                            onChange={onChange}
                        />
                        <label>Re-order QTY</label>
                        <input
                            type="number"
                            name="reorderQty"
                            value={form.reorderQty}
                            onChange={onChange}
                        />
                    </div>

                    <div className="row">
                        <label>Min Level</label>
                        <input
                            type="number"
                            name="minLevel"
                            value={form.minLevel}
                            onChange={onChange}
                        />
                        <label>Max Level</label>
                        <input
                            type="number"
                            name="maxLevel"
                            value={form.maxLevel}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="status-column">
                    <div className="checkbox-section">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="active"
                                checked={form.active}
                                onChange={onChange}
                            />
                            Active
                            <input
                                type="checkbox"
                                name="invoicable"
                                checked={form.invoicable}
                                onChange={onChange}
                            />
                            Invoicable
                        </label>
                    </div>
                    <br />

                    <div className="inline-field">
                        <label>Category</label>
                        <select name="category" value={form.category} onChange={onChange}>
                            <option value="">Select</option>
                            {categoryOptions.map((cat) => (
                                <option key={cat.CATEGORY_code} value={cat.CATEGORY_code}>
                                    {cat.CATEGORY_code} - {cat.CATEGORY_description}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="inline-field">
                        <label>UOM</label>
                        <select name="uom" value={form.uom} onChange={onChange}>
                            <option value="">Select</option>
                            <option value="1">Liters(L)</option>
                            <option value="2">Milliliters(mL)</option>
                            <option value="3">Kilograms(kg)</option>
                            <option value="4">Grams(g)</option>
                            <option value="5">Millimeters(m)</option>
                            <option value="6">meters(m)</option>
                            <option value="7">Inches(in)</option>
                            <option value="8">feet(ft)</option>
                            <option value="9">yards(yd)</option>
                            <option value="10">Units</option>
                        </select>
                    </div>

                    <div className="inline-field">
                        <label>Warranty</label>
                        <select name="warranty" value={form.warranty} onChange={onChange}>
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bottom-section">
                <fieldset className="price-box">
                    <legend>Prices</legend>
                    <div className="row">
                        <label>Purchasing Price</label>
                        <input
                            type="number"
                            name="purchasingPrice"
                            value={form.purchasingPrice}
                            onChange={onChange}
                        />
                    </div>
                    <div className="row">
                        <label>Min Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={form.sellingPrice}
                            onChange={onChange}
                        />
                    </div>
                </fieldset>

                <fieldset className="barcode-box">
                    <legend>
                        <label>
                            <input
                                type="checkbox"
                                name="barcodeAvailable"
                                checked={form.barcodeAvailable}
                                onChange={onChange}
                            />
                            Barcode Available
                        </label>
                    </legend>

                    <div className="inline-field">
                        <label>Barcode</label>
                        <input
                            name="barcode"
                            value={form.barcode}
                            onChange={onChange}
                        />
                    </div>

                    <div className="inline-field">
                        <label>Print QTY</label>
                        <input
                            type="number"
                            name="printQty"
                            value={form.printQty}
                            onChange={onChange}
                        />
                    </div>

                    <button type="button" onClick={printBarcode}>Print</button>
                </fieldset>
            </div>

            <div className="button-group">
                <button onClick={saveItem}>Save</button>
                <button onClick={resetForm}>New</button>
                <button onClick={removeItem}>Remove</button>
            </div>

            <div className="search-section">
                <h4>Item Search</h4>
                <div className="row">
                    <input
                        placeholder="Code"
                        value={searchCode}
                        onChange={e => setSearchCode(e.target.value)}
                    />
                    <input
                        placeholder="Description"
                        value={searchDesc}
                        onChange={e => setSearchDesc(e.target.value)}
                    />
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Item Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length ? (
                            filtered.map(it => (
                                <tr key={it.id}>
                                    <td>{it.code}</td>
                                    <td>{it.description}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center" }}>
                                    No matching items
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

            <div className="footer-hint">
                Save = Ctrl+S | New = Ctrl+N | Focus Search = F2 | Exit = Esc
            </div>
        </div>
    );
};

export default ItemMaster;
