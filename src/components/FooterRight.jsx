import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute,
  faVolumeUp,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons'; // Tạm dùng icon @ cho Threads
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [isMuted, setIsMuted] = useState(false); 
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count === 'string' && count.endsWith('K')) {
      return parseFloat(count) * 1000;
    }
    return parseInt(count, 10);
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleSave = async () => {
    if (!saved) {
      try {
        const videoUrl = videoRef.current ? videoRef.current.src : '';
        if (videoUrl) {
          await navigator.clipboard.writeText(videoUrl);
          alert('Video URL copied to clipboard!');
        } else {
          alert('Video URL not available.');
        }
      } catch (err) {
        console.error('Failed to copy video URL:', err);
        alert('Failed to copy video URL.');
      }
      setSaved(true);
    } else {
      setSaved(false);
    }
  };

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
  };

  return (
    <div className="footer-right">
      {/* Profile Picture Section */}
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            className="user-profile"
            alt="Profile"
          />
        ) : null}
        {userAddIcon && (
          <FontAwesomeIcon
            icon={userAddIcon}
            className="user-add"
            style={{ width: '15px', height: '15px', color: '#FF0000' }}
            onClick={handleUserAddClick}
          />
        )}
      </div>

      {/* Like Section */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: '35px',
            height: '35px',
            color: liked ? '#FF0000' : 'white',
            cursor: 'pointer'
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>

      {/* Comment Section */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: '35px', height: '35px', color: 'white', cursor: 'pointer' }}
        />
        <p>{comments}</p>
      </div>

      {/* Save Section */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faBookmark}
          style={{
            width: '35px',
            height: '35px',
            color: saved ? '#ffc107' : 'white',
            cursor: 'pointer'
          }}
          onClick={handleSave}
        />
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      {/* Share Section */}
      <div className="sidebar-icon" onClick={handleShareClick}>
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: '35px', height: '35px', color: 'white', cursor: 'pointer' }}
        />
        <p>{shares}</p>
      </div>

      {/* Mute/Unmute Section */}
      <div className="sidebar-icon mute">
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          style={{ width: '35px', height: '35px', color: 'white', cursor: 'pointer' }}
          onClick={handleMuteToggle}
        />
      </div>

      {/* Record Section */}
      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
          style={{ width: '35px', height: '35px', cursor: 'pointer' }}
        />
      </div>

      {showSharePopup && (
        <div className="share-popup-overlay" onClick={handleClosePopup}>
          <div className="share-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="share-popup-close" onClick={handleClosePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Share to:</h3>
            <ul className="share-list">
              <li>
                <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '8px', color: '#1877F2' }} />
                Facebook
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '8px', color: '#C13584' }} />
                Instagram
              </li>
              <li>
                <FontAwesomeIcon icon={faAt} style={{ marginRight: '8px', color: '#000' }} />
                Threads
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
