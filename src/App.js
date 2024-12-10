import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

// Sample video array with profile pictures
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'original sound - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState(videoUrls); // All videos
  const [displayVideos, setDisplayVideos] = useState(videoUrls); // Filtered videos
  const videoRefs = useRef([]);
  const containerRef = useRef(null); 

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Overlay states
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayVideo, setOverlayVideo] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setVideos(videoUrls); 
    setDisplayVideos(videoUrls);
  }, []);

  // Observe videos for play/pause
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [displayVideos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const scrollToVideo = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Drag event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endY = e.clientY;
    const deltaY = endY - startY;

    if (deltaY < -50) {
      // Drag up -> next video
      if (currentIndex < displayVideos.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollToVideo(newIndex);
      }
    } else if (deltaY > 50) {
      // Drag down -> previous video
      if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        scrollToVideo(newIndex);
      }
    }
  };

  // Update currentIndex based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let newIndex = currentIndex;
      videoRefs.current.forEach((ref, index) => {
        if (ref) {
          const offsetTop = ref.offsetTop;
          if (scrollPosition >= offsetTop - window.innerHeight / 2) {
            newIndex = index;
          }
        }
      });
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, displayVideos]);

  // Show overlay on ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        showVideoInfoOverlay(displayVideos[currentIndex]);
      } else if (e.key === 'Escape') {
        setShowOverlay(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, displayVideos]);

  const showVideoInfoOverlay = (video) => {
    setOverlayVideo(video);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  // Search function
  const searchVideos = (term) => {
    const trimmed = term.trim();
    if (!trimmed) {
      setDisplayVideos(videos); // no search term => show all
      return;
    }
    const filtered = videos.filter(video =>
      video.description.toLowerCase().includes(trimmed.toLowerCase())
    );
    setDisplayVideos(filtered);
  };

  return (
    <div
      className="app"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ overflow: 'hidden' }}
    >
      <div className="container">
        <TopNavbar
          className="top-navbar"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={searchVideos}
        />

        {displayVideos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}

        <BottomNavbar className="bottom-navbar" />
      </div>

      {/* Overlay Component */}
      {showOverlay && overlayVideo && (
        <div className="overlay-wrapper" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <h1 className="overlay-title">User Information</h1>
            <div className="overlay-info">
              <img src={overlayVideo.profilePic} alt={overlayVideo.username} className="profile-pic" />
              <p><strong>Username:</strong> {overlayVideo.username}</p>
              <p><strong>Description:</strong> {overlayVideo.description}</p>
              <p><strong>Song:</strong> {overlayVideo.song}</p>
              <p><strong>Likes:</strong> {overlayVideo.likes}</p>
              <p><strong>Comments:</strong> {overlayVideo.comments}</p>
              <p><strong>Saves:</strong> {overlayVideo.saves}</p>
              <p><strong>Shares:</strong> {overlayVideo.shares}</p>
            </div>
            <button className="close-btn" onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
