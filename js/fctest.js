const textFR = `Maître Corbeau, sur un arbre perché,
Tenait en son bec un fromage.
Maître Renard, par l'odeur alléché,
Lui tint à peu près ce langage :
« Hé ! bonjour, Monsieur du Corbeau.
Que vous êtes joli ! que vous me semblez beau !
Sans mentir, si votre ramage
Se rapporte à votre plumage,
Vous êtes le Phénix des hôtes de ces bois. »
A ces mots le Corbeau ne se sent pas de joie ;
Et pour montrer sa belle voix,
Il ouvre un large bec, laisse tomber sa proie.
Le Renard s'en saisit, et dit : « Mon bon Monsieur,
Apprenez que tout flatteur
Vit aux dépens de celui qui l'écoute :
Cette leçon vaut bien un fromage, sans doute. »
Le Corbeau, honteux et confus,
Jura, mais un peu tard, qu'on ne l'y prendrait plus.`;
const authorFR = `Jean de La Fontaine`;
const textEN = `asdasdasdasdasdasd`;
const authorEN = `RChesapla - Admin`;
const fullTextElement = document.getElementById("full-text");
const animatedTextElement = document.getElementById("animated-text");
const fableTitleElement = document.getElementById("fable-title");
const footerElement = document.querySelector("footer");
const parchmentElement = document.getElementById("parchment");
const imageContainer = document.getElementById("image-container");

function typeText(text, author) {
	let index = 0;
	const delay = 100;

	function animate() {
		if (index < text.length) {
			animatedTextElement.innerHTML += text.charAt(index);
			index++;
			setTimeout(animate, delay);
		} else {
			typeAuthor(author);
		}
	}
	animate();
}

function typeAuthor(author) {
	const authorSpan = document.createElement("span");
	authorSpan.className = "author";
	animatedTextElement.appendChild(authorSpan);
	let index = 0;
	const delay = 100;

	function animate() {
		if (index < author.length) {
			authorSpan.innerHTML += author.charAt(index);
			index++;
			setTimeout(animate, delay);
		} else {
			authorSpan.style.opacity = 1;
			showImage();
		}
	}
	animate();
}

function startAnimation(text, author, title) {
	fullTextElement.textContent = text + " " + author;
	fableTitleElement.textContent = title;
	parchmentElement.style.display = "block";
	setTimeout(() => {
		animatedTextElement.innerHTML = text.charAt(0);
		animatedTextElement.style.opacity = 1;
		typeText(text.slice(1), author);
	}, 2000);
}

document.getElementById("french-button").addEventListener("click", () => {
	document.getElementById("language-screen").style.display = "none";
	footerElement.classList.add("hidden");
	document.documentElement.requestFullscreen().catch((err) => console.log(err));
	startAnimation(textFR, authorFR, "Le Corbeau et le Renard");
});

document.getElementById("türkçe-button").addEventListener("click", () => {
	document.getElementById("language-screen").style.display = "none";
	footerElement.classList.add("hidden");
	document.documentElement.requestFullscreen().catch((err) => console.log(err));
	startAnimation(textEN, authorEN, "MERHABALAR");
});
