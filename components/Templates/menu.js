import React, { useState } from 'react';
import styles from '../../styles/Menu.module.css';

const Menu = ({ menuItems }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleElementClick = () => {
    setActiveMenu(null);
  };

  return (
    <div className={styles.menuContainer}>
      {menuItems.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          <button onClick={() => handleMenuClick(index)}>{item.name}</button>
          {activeMenu === index && (
            <div className={styles.dropdownMenu}>
              {item.elements.map((element, i) => (
                <button key={i} onClick={handleElementClick}>
                  {element}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
