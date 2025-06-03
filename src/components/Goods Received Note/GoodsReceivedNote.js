import React, { useState, useEffect } from 'react';
import './GoodsReceivedNote.css';

const GoodsReceivedNote = () => {
    const [formData, setFormData] = useState({
        code: '',
        receivedDate: '',
        payType: '',
        location: '',
        po: '',
        supplier: '',
        supplierInvoice: '',
        opnbl: false,
        itemDescription: '',
        item: '',
        qty: 0,
        rate: 0.00,
        barcodeSellingPrice: 0.00,
        minSellingPrice: 0.00,
        cashSellingPrice: 0.00,
        creditSellingPrice: 0.00,
        warranty: '',
        grossValue: 0.00,
        vat: 0.00,
        netValue: 0.00
    });

    const [selectedOption, setSelectedOption] = useState('none');
    const [purchaseType, setPurchaseType] = useState('local');

    // ✅ Set current date on mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        setFormData(prev => ({ ...prev, receivedDate: today }));
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Save clicked', formData);
    };

    const handleNew = () => {
        setFormData({
            code: '',
            receivedDate: new Date().toISOString().split('T')[0], // Reset to current date
            payType: '',
            location: '',
            po: '',
            supplier: '',
            supplierInvoice: '',
            opnbl: false,
            itemDescription: '',
            item: '',
            qty: 0,
            rate: 0.00,
            barcodeSellingPrice: 0.00,
            minSellingPrice: 0.00,
            cashSellingPrice: 0.00,
            creditSellingPrice: 0.00,
            warranty: '',
            grossValue: 0.00,
            vat: 0.00,
            netValue: 0.00
        });
    };

    const handleDelete = () => {
        console.log('Delete clicked');
    };

    const handlePrint = () => {
        console.log('Print clicked');
    };

    return (
        <div className="goods-received-container">
            {/* Title Bar */}
            <div className="title-bar">
                <span className="title-text">Good Recieved Note</span>

            </div>

            <div className="form-content">
                {/* Top Section */}
                <div className="top-section">
                    {/* Left Column */}
                    <div className="left-column">
                        <div className="form-row">
                            <label className="form-label">Code</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.code}
                                onChange={(e) => handleInputChange('code', e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label" htmlFor="receivedDate">Received Date</label>
                            <div className="date-input-group">
                                <input
                                    type="date"
                                    id="receivedDate"
                                    name="receivedDate"
                                    className="form-input"
                                    value={formData.receivedDate}
                                    onChange={(e) => handleInputChange('receivedDate', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label className="form-label">Pay Type</label>
                            <select
                                className="form-select"
                                value={formData.payType}
                                onChange={(e) => handleInputChange('payType', e.target.value)}
                            >
                                <option value=""></option>
                            </select>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="middle-column">
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="option"
                                    value="none"
                                    checked={selectedOption === 'none'}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <span>None</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="option"
                                    value="purchase"
                                    checked={selectedOption === 'purchase'}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <span>Purchase Order</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="option"
                                    value="imports1"
                                    checked={selectedOption === 'imports1'}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <span>Imports - 1</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="option"
                                    value="imports2"
                                    checked={selectedOption === 'imports2'}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <span className="imports-2">Imports - 2</span>
                            </label>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="right-column">
                        <div className="form-row">
                            <label className="form-label-short">Location</label>
                            <select className="form-select">
                                <option value=""></option>
                            </select>
                            <label className="form-label-short">PO</label>
                            <select className="form-select">
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label className="form-label-short">Supplier</label>
                            <select className="form-select wide">
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label className="form-label-short">Supplier Invoice</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.supplierInvoice}
                                onChange={(e) => handleInputChange('supplierInvoice', e.target.value)}
                            />
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={formData.opnbl}
                                    onChange={(e) => handleInputChange('opnbl', e.target.checked)}
                                />
                                <span>OPNBL</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Purchase Type Radio Buttons */}
                <div className="purchase-type-section">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="purchaseType"
                            value="local"
                            checked={purchaseType === 'local'}
                            onChange={(e) => setPurchaseType(e.target.value)}
                        />
                        <span>Purchases - Local</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="purchaseType"
                            value="imports"
                            checked={purchaseType === 'imports'}
                            onChange={(e) => setPurchaseType(e.target.value)}
                        />
                        <span>Purchases - Imports</span>
                    </label>
                </div>

                {/* Item Details Section */}
                <div className="item-details-section">
                    <div className="item-left-column">
                        <div className="form-group">
                            <label className="form-label-block">Item Description</label>
                            <textarea
                                className="form-textarea"
                                value={formData.itemDescription}
                                onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-narrow">Item</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.item}
                                onChange={(e) => handleInputChange('item', e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-narrow">QTY</label>
                            <input
                                type="number"
                                className="form-input number-input"
                                value={formData.qty}
                                onChange={(e) => handleInputChange('qty', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-narrow">Rate</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.rate.toFixed(2)}
                                onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div className="item-middle-column">
                        <div className="form-row">
                            <label className="form-label-wide">Barcode Selling Price</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.barcodeSellingPrice.toFixed(2)}
                                onChange={(e) => handleInputChange('barcodeSellingPrice', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-wide">Min Selling Price</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.minSellingPrice.toFixed(2)}
                                onChange={(e) => handleInputChange('minSellingPrice', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-wide">Cash Selling Price</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.cashSellingPrice.toFixed(2)}
                                onChange={(e) => handleInputChange('cashSellingPrice', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-wide">Credit Selling Price</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.creditSellingPrice.toFixed(2)}
                                onChange={(e) => handleInputChange('creditSellingPrice', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-wide">Warranty</label>
                            <select className="form-select">
                                <option value=""></option>
                            </select>
                            <button className="add-btn">Add</button>
                        </div>
                    </div>

                    <div className="item-right-column">
                        <div className="form-row">
                            <label className="form-label-medium">Gross Value</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.grossValue.toFixed(2)}
                                onChange={(e) => handleInputChange('grossValue', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-medium">VAT</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.vat.toFixed(2)}
                                onChange={(e) => handleInputChange('vat', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label-medium">Net Value</label>
                            <span className="currency">Rs</span>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input number-input"
                                value={formData.netValue.toFixed(2)}
                                onChange={(e) => handleInputChange('netValue', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="action-btn" onClick={handleSave}>Save</button>
                            <button className="action-btn" onClick={handleNew}>New</button>
                            <button className="action-btn" onClick={handleDelete}>Delete</button>
                            <button className="action-btn" onClick={handlePrint}>Print</button>
                        </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="data-grid">
                    <div className="grid-header">
                        <div className="grid-cell">Item</div>
                        <div className="grid-cell">Rate</div>
                        <div className="grid-cell">QTY</div>
                        <div className="grid-cell">Balance</div>
                        <div className="grid-cell">Recieved</div>
                        <div className="grid-cell">VAT</div>
                        <div className="grid-cell">Total</div>
                        <div className="grid-cell">Normal Price</div>
                        <div className="grid-cell">Min Price</div>
                        <div className="grid-cell">Cash Price</div>
                        <div className="grid-cell">Credit Price</div>
                        <div className="grid-cell">Serial</div>
                    </div>
                    <div className="grid-body">
                        {/* Empty grid area for data */}
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="status-bar">
                    <span>Save = Ctrl+S</span>
                    <span>New = Ctrl+N</span>
                    <span>Print = Ctrl+P</span>
                    <span>Delete = Ctrl+D</span>
                    <span>Focus Search = F2</span>
                    <span>Exit = Esc</span>
                </div>
            </div>
        </div>
    );
};

export default GoodsReceivedNote;