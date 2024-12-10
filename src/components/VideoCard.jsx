// File: src/components/VideoCard.jsx
import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay,
  } = props;

  const videoRef = useRef(null);

  // Handle autoplay for the video
  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Autoplay failed:', error);
      });
    }
  }, [autoplay]);

  // Handle video play/pause on click
  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="video" style={{ scrollSnapAlign: 'start' }}>
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
        // Accessibility attributes
        tabIndex="0"
        aria-label={`Video by ${username}`}
      ></video>

      {/* Bottom controls */}
      <div className="bottom-controls">
        {/* Footer Left */}
        <div className="footer-left">
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>

        {/* Footer Right */}
        <div className="footer-right">
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            videoRef={videoRef} // Pass the ref to FooterRight for functionalities like copying URL
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
