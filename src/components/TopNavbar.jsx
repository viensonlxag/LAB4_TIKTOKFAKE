import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const inputRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setShowSearch(false); // Quay về giao diện cũ sau khi Enter
    }
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchTerm(''); // Xoá nội dung tìm kiếm khi thoát (có thể bỏ nếu không muốn)
  };

  // Style cho container navbar
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '50px',
    position: 'sticky',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: 1,
    background: 'transparent' // Chỉnh màu nền nếu cần
  };

  // Style cho input khi ở chế độ search
  const inputStyle = {
    flex: 1,
    background: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
    outline: 'none',
    marginLeft: '10px',
    marginRight: '10px'
  };

  return (
    <div className="top-navbar" style={containerStyle}>
      {showSearch ? (
        // Giao diện search
        <>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
            onClick={handleCloseSearch}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a hashtag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
        </>
      ) : (
        // Giao diện mặc định
        <>
          <FontAwesomeIcon icon={faTv} className='icon' style={{ color: '#fff' }}/>
          <h2 style={{ color: '#fff', fontWeight: 500, fontSize: '14px', textShadow: '0 0 2px rgba(0,0,0,0.5)' }}>
            Following | <span style={{ fontWeight: 700 }}>For You</span>
            <span style={{
              display: 'inline-block',
              position: 'relative',
              marginLeft: '5px'
            }}>
              <span style={{
                position: 'absolute',
                bottom: '-2px',
                left: '0',
                width: '50%',
                height: '1px',
                backgroundColor: '#fff',
                transform: 'translateX(50%)'
              }}></span>
            </span>
          </h2>
          <FontAwesomeIcon
            icon={faSearch}
            className='icon'
            style={{ color: '#fff', cursor: 'pointer' }}
            onClick={handleSearchIconClick}
          />
        </>
      )}
    </div>
  );
};

export default TopNavbar;
