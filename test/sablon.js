const imgEl = document.getElementById("movie-image");
const MAX_OFFSET = 20; // max distance that the image can move from its natural position
const MAX_TILT = 30; // max tilt in degrees

// follow mouse
window.addEventListener("mousemove", ({ clientX, clientY }) => {
	const xOffset = (clientX / window.innerWidth - 0.5) * 2 * MAX_OFFSET;
	const yOffset = (clientY / window.innerHeight - 0.5) * 2 * MAX_OFFSET;
	const xTilt = (clientY / window.innerHeight - 0.5) * MAX_TILT;
	const yTilt = (clientX / window.innerWidth - 0.5) * -MAX_TILT;
	imgEl.style.transform = `translate(${xOffset}px, ${yOffset}px) rotateX(${xTilt}deg) rotateY(${yTilt}deg)`;
});
