// ELEMENTS
const video = document.getElementById('webcam');
const canvas = document.getElementById('overlayCanvas');
const emotionText = document.getElementById('detectedEmotion');
const songSection = document.getElementById('songSection');
const songList = document.getElementById('songList');

// SONGS PER EMOTION
const songsByEmotion = {
  happy: [
    "Happy - Pharrell Williams",
    "Can't Stop The Feeling - Justin Timberlake",
    "Uptown Funk - Bruno Mars",
    "Good Life - OneRepublic",
    "Walking on Sunshine - Katrina & The Waves",
    "Shake It Off - Taylor Swift",
    "Best Day Of My Life - American Authors",
    "I Gotta Feeling - Black Eyed Peas"
  ],
  sad: [
    "Someone Like You - Adele",
    "Stay With Me - Sam Smith",
    "Fix You - Coldplay",
    "Let Her Go - Passenger",
    "When We Were Young - Adele",
    "Skinny Love - Birdy",
    "Hurt - Johnny Cash",
    "The Night We Met - Lord Huron"
  ],
  angry: [
    "Break Stuff - Limp Bizkit",
    "Killing In The Name - Rage Against The Machine",
    "In The End - Linkin Park",
    "Duality - Slipknot",
    "Numb - Linkin Park",
    "Given Up - Linkin Park",
    "Pain - Three Days Grace",
    "Before I Forget - Slipknot"
  ],
  surprised: [
    "Bohemian Rhapsody - Queen",
    "Don't Stop Me Now - Queen",
    "Mr. Brightside - The Killers",
    "Viva La Vida - Coldplay",
    "Adventure of a Lifetime - Coldplay",
    "Shake It Out - Florence + The Machine",
    "Wake Me Up - Avicii",
    "Happy - Pharrell Williams"
  ],
  neutral: [
    "Clocks - Coldplay",
    "Counting Stars - OneRepublic",
    "Shape of You - Ed Sheeran",
    "Let It Be - The Beatles",
    "Yellow - Coldplay",
    "Photograph - Ed Sheeran",
    "Perfect - Ed Sheeran",
    "Viva La Vida - Coldplay"
  ]
};

// LOAD FACE API MODELS
async function loadModels() {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('models');
    await faceapi.nets.faceExpressionNet.loadFromUri('models');
    console.log("Face API models loaded successfully");
    startWebcam();
  } catch (err) {
    console.error("Error loading Face API models:", err);
    alert("Failed to load Face API models. Check the console.");
  }
}

// START WEBCAM
function startWebcam() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      console.log("Webcam started successfully");
    })
    .catch(err => {
      console.error("Webcam access failed:", err);
      alert("Webcam access failed! Make sure to allow camera permission.");
    });
}

// DETECT EMOTIONS
video.addEventListener('play', () => {
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // Clear canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw detections
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // Update emotion & songs
    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
      emotionText.innerText = `Detected Emotion: ${maxEmotion.toUpperCase()}`;
      showSongs(maxEmotion);
    }
  }, 1000);
});

// SHOW SONGS
function showSongs(emotion) {
  if (!songsByEmotion[emotion]) return;
  songList.innerHTML = '';
  songsByEmotion[emotion].forEach(song => {
    const li = document.createElement('li');
    li.innerText = song;
    songList.appendChild(li);
  });
  songSection.classList.remove('hidden');
}

// LOAD MODELS ON PAGE LOAD
loadModels();