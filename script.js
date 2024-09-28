// Get the video and audio elements
const video = document.getElementById('background-video');
const audio = new Audio('audio.mp3'); // Load the audio file

audio.volume = 0; // Start with volume at 0 for fade-in effect
audio.loop = true; // Set the audio to loop

// Pause both video and audio when the page loads
video.pause();
audio.pause();

// Play video and audio when the mouse moves
document.addEventListener('mousemove', () => {
    if (video.paused) {
        video.play();
    }

    if (audio.paused) {
        audio.play();
    }

    // Gradually fade in the audio
    let fadeInInterval = setInterval(() => {
        if (audio.volume < 1) {
            audio.volume = Math.min(audio.volume + 0.05, 1); // Increase volume by 0.05 every 100ms
        } else {
            clearInterval(fadeInInterval); // Stop fading in once max volume is reached
        }
    }, 100);
});

// Handle mouse idle and fade-out logic
let timeout;
document.addEventListener('mousemove', () => {
    clearTimeout(timeout);

    // Set the timeout to pause video and loop audio after 3 seconds of no mouse movement
    timeout = setTimeout(() => {
        video.pause();

        // Loop a 1-second segment of the audio (e.g., at the 10th second)
        let loopStart = 10; // Start looping at 10 seconds
        audio.currentTime = loopStart;

        // Start fading out the audio
        let fadeOutInterval = setInterval(() => {
            if (audio.volume > 0) {
                audio.volume = Math.max(audio.volume - 0.05, 0); // Decrease volume by 0.05 every 100ms
            } else {
                clearInterval(fadeOutInterval); // Stop fading out once volume reaches 0
                audio.pause(); // Pause the audio when it's completely faded out
            }
        }, 100);// Keep the audio looping at a specific second until the mouse moves again
        audio.loop = true;
        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime > loopStart + 1) { // Loop a 1-second segment
                audio.currentTime = loopStart;
            }
        });
    }, 200); // Trigger idle behavior after 3 seconds of no movement
});