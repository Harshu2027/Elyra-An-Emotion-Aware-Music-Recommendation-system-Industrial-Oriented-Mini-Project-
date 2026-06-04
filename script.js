// ============================
// ELEMENT SELECTORS
// ============================
const videoBg = document.querySelector(".bg-video");
const content = document.querySelector(".content");
const heroBtn = document.querySelector(".hero .btn");
const navbar = document.querySelector(".navbar");
const cameraSection = document.getElementById("cameraSection");
const resultSection = document.getElementById("result");
const webcam = document.getElementById("webcam");

// ============================
// BACKGROUND VIDEO ANIMATION
// ============================
let scale = 1;
let floatOffset = 0;
function animateVideo() {
  if (!videoBg) return;
  scale += 0.0002;
  floatOffset += 0.01;
  const floatY = Math.sin(floatOffset) * 5;
  videoBg.style.transform = `scale(${scale}) translateY(${floatY}px)`;
  requestAnimationFrame(animateVideo);
}
animateVideo();

// ============================
// HERO CONTENT FADE IN
// ============================
window.addEventListener("load", () => {
  if (content) {
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }
});

// ============================
// HERO BUTTON GLOW
// ============================
let glowIntensity = 0;
let glowDirection = 1;
function pulseGlow() {
  if (!heroBtn) return;
  glowIntensity += 0.03 * glowDirection;
  if (glowIntensity >= 1 || glowIntensity <= 0) glowDirection *= -1;
  heroBtn.style.boxShadow = `0 0 ${15 + glowIntensity * 25}px rgba(0, 224, 255, 0.8)`;
  requestAnimationFrame(pulseGlow);
}
pulseGlow();

// ============================
// NAVBAR SCROLL EFFECT
// ============================
window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.style.background = window.scrollY > 50 ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.5)";
});

// ============================
// HERO PARALLAX EFFECT
// ============================
document.addEventListener("mousemove", (e) => {
  if (!content) return;
  const x = (window.innerWidth / 2 - e.clientX) / 60;
  const y = (window.innerHeight / 2 - e.clientY) / 60;
  content.style.transform = `translate(${x}px, ${y}px)`;
});

// ============================
// CAMERA & EMOTION SYSTEM
// ============================
if (heroBtn) {
  heroBtn.addEventListener("click", async () => {
    cameraSection.style.display = "block";
    cameraSection.scrollIntoView({ behavior: "smooth" });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      webcam.srcObject = stream;

      setTimeout(() => {
        cameraSection.style.display = "none";

        const emotions = ["Happy", "Sad", "Angry", "Relaxed"];
        const emotion = emotions[Math.floor(Math.random() * emotions.length)];

        const songs = {
          Happy: ["Happy - Pharrell Williams", "Shape of You - Ed Sheeran"],
          Sad: ["Let Her Go - Passenger", "Someone Like You - Adele"],
          Angry: ["Believer - Imagine Dragons", "Stronger - Kanye West"],
          Relaxed: ["Perfect - Ed Sheeran", "Let Me Love You - Justin Bieber"]
        };

        const emotionText = document.getElementById("emotionText");
        const songsDiv = document.getElementById("songs");

        resultSection.style.display = "block";
        resultSection.scrollIntoView({ behavior: "smooth" });

        emotionText.innerText = `Detected Emotion: ${emotion}`;
        songsDiv.innerHTML = songs[emotion].map(song => `<p>${song}</p>`).join("");
      }, 3000);

    } catch (err) {
      alert("Camera not accessible ❌");
    }
  });
}

// ============================
// LOGIN & REGISTER SYSTEM
// ============================

// Regex Patterns
// const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

// // REGISTER ELEMENTS
// const usernameInput = document.getElementById("regUsername");
// const emailInput = document.getElementById("regEmail");
// const passwordInput = document.getElementById("regPassword");

// // LOGIN ELEMENTS
// const loginUsernameInput = document.getElementById("loginUsername");
// const loginPasswordInput = document.getElementById("loginPassword");

// // ============================
// // LIVE PLACEHOLDER HINTS
// // ============================
// if (usernameInput && emailInput && passwordInput) {
//   usernameInput.addEventListener("input", () => {
//     usernameInput.placeholder = usernameRegex.test(usernameInput.value) ? "Username" : "Min 3 letters/numbers";
//   });
//   emailInput.addEventListener("input", () => {
//     emailInput.placeholder = emailRegex.test(emailInput.value) ? "Email" : "Enter valid email";
//   });
//   passwordInput.addEventListener("input", () => {
//     passwordInput.placeholder = passwordRegex.test(passwordInput.value) ? "Password" : "Min 6 chars, 1 letter & 1 number";
//   });
// }

// if (loginUsernameInput && loginPasswordInput) {
//   loginUsernameInput.addEventListener("input", () => {
//     loginUsernameInput.placeholder = loginUsernameInput.value.trim().length >= 3 ? "Username" : "Min 3 characters";
//   });
//   loginPasswordInput.addEventListener("input", () => {
//     loginPasswordInput.placeholder = loginPasswordInput.value.trim().length >= 6 ? "Password" : "Min 6 characters";
//   });
// }

// // ============================
// // REGISTER FUNCTION
// // ============================
// function registerUser() {
//   const username = usernameInput.value.trim();
//   const email = emailInput.value.trim();
//   const password = passwordInput.value.trim();

//   if (!usernameRegex.test(username)) { alert("Username must be at least 3 letters/numbers"); return; }
//   if (!emailRegex.test(email)) { alert("Enter a valid email"); return; }
//   if (!passwordRegex.test(password)) { alert("Password must be at least 6 characters with 1 letter & 1 number"); return; }

//   let users = JSON.parse(localStorage.getItem("elyraUsers")) || [];

//   if (users.find(u => u.username === username)) { alert("Username already exists ❌"); return; }
//   if (users.find(u => u.email === email)) { alert("Email already registered ❌"); return; }

//   users.push({ username, email, password });
//   localStorage.setItem("elyraUsers", JSON.stringify(users));

//   alert("Registered successfully 🎉");
//   window.location.href = "login.html";
// }

// // ============================
// // LOGIN FUNCTION
// // ============================
// function loginUser() {
//   const username = loginUsernameInput.value.trim();
//   const password = loginPasswordInput.value.trim();

//   let users = JSON.parse(localStorage.getItem("elyraUsers")) || [];
//   let storedUser = users.find(u => u.username === username);

//   if (!storedUser) { alert("No user found. Please register first."); return; }
//   if (password !== storedUser.password) { alert("Incorrect password ❌"); return; }

//   alert("Login successful 🎉");
//   window.location.href = "index.html";
// }