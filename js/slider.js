const video = document.getElementById('video');
const timeDisplay = document.getElementById('time-display');
const volumeDisplay = document.getElementById('volume-display');

// Update time display
const updateTimeDisplay = () => {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    timeDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Update volume display
const updateVolumeDisplay = () => {
    volumeDisplay.textContent = `Volume: ${Math.round(video.volume * 100)}%`;
};

// Add event listener to update time display on time update
video.addEventListener('timeupdate', updateTimeDisplay);

// Add event listener to update volume display on volume change
video.addEventListener('volumechange', updateVolumeDisplay);

// Handle mouse wheel events
const handleWheel = (event) => {
    const videoRect = video.getBoundingClientRect();
    const controlsHeight = videoRect.height * 0.1; // Assuming controls take up 10% of the video height

    // Determine if the mouse is over the video controls (bottom 10% of the video)
    const isOverControls = (event.clientY > videoRect.bottom - controlsHeight);

    if (isOverControls) {
        // Mouse is over video control slider, adjust time
        if (event.deltaY < 0) {
            // Scrolling up, fast forward
            video.currentTime = Math.min(video.currentTime + 5, video.duration);
        } else {
            // Scrolling down, rewind
            video.currentTime = Math.max(video.currentTime - 5, 0);
        }
        updateTimeDisplay();
        timeDisplay.style.display = 'block';
        clearTimeout(timeDisplay.timeout);
        timeDisplay.timeout = setTimeout(() => {
            timeDisplay.style.display = 'none';
        }, 1000);
    } else {
        // Mouse is over video player, adjust volume
        if (event.deltaY < 0) {
            // Scrolling up, increase volume
            video.volume = Math.min(video.volume + 0.1, 1);
        } else {
            // Scrolling down, decrease volume
            video.volume = Math.max(video.volume - 0.1, 0);
        }
        updateVolumeDisplay();
        volumeDisplay.style.display = 'block';
        clearTimeout(volumeDisplay.timeout);
        volumeDisplay.timeout = setTimeout(() => {
            volumeDisplay.style.display = 'none';
        }, 1000);
    }
};

// Add event listeners for mouse enter and leave
video.addEventListener('mouseenter', () => {
    document.addEventListener('wheel', handleWheel);
});

video.addEventListener('mouseleave', () => {
    document.removeEventListener('wheel', handleWheel);
});

// Set initial volume
video.volume = 0.5;
updateVolumeDisplay();
