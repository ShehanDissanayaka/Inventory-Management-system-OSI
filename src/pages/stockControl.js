import React, { useState } from 'react';
import './stockControl.css';
import GroupMaster from '../components/Group Master/groupMaster';
import TypeMaster from '../components/Type Master/typeMaster';
import CategoryMaster from '../components/Category Master/categoryMaster';
import ItemMaster from '../components/Item Master/itemMaster';
import LocationMaster from '../components/Location Master/LocationMaster';
import CustomerMaster from '../components/Customer Master/CustomerMaster';
import SupplierMaster from '../components/Supplier Master/SupplierMaster';

const StockControl = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const renderContent = () => {
    switch (activeMenu) {
      case 'Group Master':
        return <GroupMaster />;
      case 'Type Master':
        return <TypeMaster />;
      case 'Category Master':
        return <CategoryMaster />;
      case 'Item Master':
        return <ItemMaster />;
      case 'Location Master':
        return <LocationMaster />
      case 'Customer Master':
        return <CustomerMaster />;
      case 'Supplier Master':
        return <SupplierMaster />;
      default:
        return <div className="placeholder-message">Select a menu item to continue.</div>;
    }
  };

  return (
    <div className="stock-control">
      {/* Header */}
      <header className="header">
        <h1>Stock Control</h1>
      </header>

      {/* Main Container with Side Menu */}
      <div className="main-container">
        {/* Left Side Menu */}
        <div className="side-menu">
          <div className="menu-section">
            <ul>
              <li
                className={activeMenu === 'Accounts Receivable' ? 'active' : ''}
                onClick={() => setActiveMenu('Accounts Receivable')}
              >
                Accounts Receivable
              </li>
              <li
                className={activeMenu === 'Accounts Payable' ? 'active' : ''}
                onClick={() => setActiveMenu('Accounts Payable')}
              >
                Accounts Payable
              </li>
              <li
                className={activeMenu === 'Post Dated CHQ' ? 'active' : ''}
                onClick={() => setActiveMenu('Post Dated CHQ')}
              >
                Post Dated CHQ
              </li>
            </ul>
          </div>

          <div className="menu-section">
            <h3>Master Files</h3>
            <ul>
              <li
                className={activeMenu === 'Group Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Group Master')}
              >
                Group Master
              </li>
              <li
                className={activeMenu === 'Type Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Type Master')}
              >
                Type Master
              </li>
              <li
                className={activeMenu === 'Category Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Category Master')}
              >
                Category Master
              </li>
              <li
                className={activeMenu === 'Location Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Location Master')}
              >
                Location Master
              </li>
              <li
                className={activeMenu === 'Item Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Item Master')}
              >
                Item Master
              </li>
              <li
                className={activeMenu === 'Rep Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Rep Master')}
              >
                Rep Master
              </li>
              <li
                className={activeMenu === 'Supplier Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Supplier Master')}
              >
                Supplier Master
              </li>
              <li
                className={activeMenu === 'Customer Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Customer Master')}
              >
                Customer Master
              </li>
              <li
                className={activeMenu === 'Supplier Group' ? 'active' : ''}
                onClick={() => setActiveMenu('Supplier Group')}
              >
                Supplier Group
              </li>
              <li
                className={activeMenu === 'Customer Group' ? 'active' : ''}
                onClick={() => setActiveMenu('Customer Group')}
              >
                Customer Group
              </li>
              <li
                className={activeMenu === 'Title Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Title Master')}
              >
                Title Master
              </li>
              <li
                className={activeMenu === 'Area Master' ? 'active' : ''}
                onClick={() => setActiveMenu('Area Master')}
              >
                Area Master
              </li>
              <li
                className={activeMenu === 'Credit Card Bank' ? 'active' : ''}
                onClick={() => setActiveMenu('Credit Card Bank')}
              >
                Credit Card Bank
              </li>
            </ul>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StockControl;
