import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./itemMaster.css";

const ItemMaster = () => {
    const [formData, setFormData] = useState({
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
        purchasingPrice: 0.0,
        sellingPrice: 0.0,
        barcode: "",
        printQty: 1,
        active: true,
        invoicable: false,
        barcodeAvailable: false,
    });

    const navigate = useNavigate();
    const codeInputRef = useRef(null);

    const resetForm = () => {
        setFormData({
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
            purchasingPrice: 0.0,
            sellingPrice: 0.0,
            barcode: "",
            printQty: 1,
            active: true,
            invoicable: false,
            barcodeAvailable: false,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSave = useCallback(() => {
        console.log("Saved:", formData);
        alert("Item saved successfully!");
        resetForm();
    }, [formData]);

    const handleRemove = () => {
        if (formData.code) {
            alert(`Item "${formData.code}" removed.`);
            resetForm();
        } else {
            alert("No item code provided to remove.");
        }
    };

    const handlePrint = () => {
        if (formData.barcodeAvailable) {
            alert(`Printing Barcode: ${formData.barcode}\nQty: ${formData.printQty}`);
        } else {
            alert("Barcode not available.");
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "s") {
                e.preventDefault();
                handleSave();
            } else if (e.ctrlKey && e.key.toLowerCase() === "n") {
                e.preventDefault();
                resetForm();
            } else if (e.key === "F2") {
                e.preventDefault();
                codeInputRef.current?.focus();
            } else if (e.key === "Escape") {
                e.preventDefault();
                navigate("/stockcontrol");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleSave, navigate]);

    return (
        <div className="item-master-container">
            <div className="title">Item Master</div>

            <div className="form-section">
                <div className="left-column">
                    <div className="row">
                        <label>Code</label>
                        <input
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            ref={codeInputRef}
                        />
                    </div>

                    <div className="row">
                        <label>Group</label>
                        <select name="group" value={formData.group} onChange={handleChange}>
                            <option value="">Select</option>
                        </select>
                        <label>Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="">Select</option>
                        </select>
                    </div>

                    <div className="row">
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        <label>Re-order Level</label>
                        <input
                            type="number"
                            name="reorderLevel"
                            value={formData.reorderLevel}
                            onChange={handleChange}
                        />
                        <label>Re-order QTY</label>
                        <input
                            type="number"
                            name="reorderQty"
                            value={formData.reorderQty}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        <label>Min Level</label>
                        <input
                            type="number"
                            name="minLevel"
                            value={formData.minLevel}
                            onChange={handleChange}
                        />
                        <label>Max Level</label>
                        <input
                            type="number"
                            name="maxLevel"
                            value={formData.maxLevel}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="status-column">
                    <div className="checkbox-section">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                            Active
                            <input
                                type="checkbox"
                                name="invoicable"
                                checked={formData.invoicable}
                                onChange={handleChange}
                            />
                            Invoicable
                        </label>
                    </div>
                    <br />

                    <div className="inline-field">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="">Select</option>
                        </select>
                    </div>

                    <div className="inline-field">
                        <label>UOM</label>
                        <select name="uom" value={formData.uom} onChange={handleChange}>
                            <option value="">Select</option>
                        </select>
                    </div>

                    <div className="inline-field">
                        <label>Warranty</label>
                        <select name="warranty" value={formData.warranty} onChange={handleChange}>
                            <option value="">Select</option>
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
                            value={formData.purchasingPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row">
                        <label>Min Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>

                <fieldset className="barcode-box">
                    <legend>
                        <label>
                            <input
                                type="checkbox"
                                name="barcodeAvailable"
                                checked={formData.barcodeAvailable}
                                onChange={handleChange}
                            />
                            Barcode Available
                        </label>
                    </legend>

                    <div className="inline-field">
                        <label>Barcode</label>
                        <input
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="inline-field">
                        <label>Print QTY</label>
                        <input
                            type="number"
                            name="printQty"
                            value={formData.printQty}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="button" onClick={handlePrint}>Print</button>
                </fieldset>
            </div>

            <div className="button-group">
                <button onClick={handleSave}>Save</button>
                <button onClick={resetForm}>New</button>
                <button onClick={handleRemove}>Remove</button>
            </div>

            <div className="search-section">
                <h4>Item Search</h4>
                <div className="row">
                    <input placeholder="Code" />
                    <input placeholder="Description" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Item Description</th>
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

            <div className="footer-hint">
                Save = Ctrl+S | New = Ctrl+N | Focus Search = F2 | Exit = Esc
            </div>
        </div>
    );
};

export default ItemMaster;
