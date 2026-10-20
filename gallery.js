/* THE LIFE EDIT — EASY PHOTO EDITOR
   1. Upload your own photos into the images/ folder on GitHub.
   2. Change an item image to "images/your-photo.jpg".
   3. Set type to "my moments" for your own photos, or "inspiration" for inspiration images.
   4. Edit title, note and category. Add or remove items by copying an object.
   IMPORTANT: sample images are inspiration only; none are represented as Lucky's real photos.
*/
const lifeEditPhotos = [
  {
  title: "a little piece of paradise 🌴",
  note: "blue skies, palm trees & the little moments I love ♡",
  category: "travel",
  type: "my moments",
  image: "images/20220903_130712.jpg"
},
{
  title: "chasing sunsets & little joys 🌅",
  note: "golden skies, happy moments, and a little bit of magic ♡",
  category: "my life",
  type: "my moments",
  image: "images/Me.jpeg"
},
];

const gallery = document.getElementById("world-grid");
const dialog = document.getElementById("world-lightbox");
const dialogImage = document.getElementById("lightbox-image");
const dialogTitle = document.getElementById("lightbox-title");
const dialogType = document.getElementById("lightbox-type");

function renderWorld(filter = "all") {
  gallery.replaceChildren();
  const photos = lifeEditPhotos.filter(item => filter === "all" || item.type === filter);
  if (!photos.length) {
    const empty = document.createElement("p");
    empty.className = "world-empty";
    empty.textContent = "No photos here yet! Add your first personal photo in gallery.js ♡";
    gallery.append(empty);
    return;
  }
  photos.forEach((photo, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "world-card";
    card.setAttribute("aria-label", `View ${photo.title}`);
    const image = document.createElement("img");
    image.src = photo.image;
    image.alt = photo.title;
    image.loading = "lazy";
    const info = document.createElement("div");
    info.className = "world-card-info";
    const label = document.createElement("span");
    label.className = "world-card-label";
    label.textContent = `${photo.type === "my moments" ? "♡ my moment" : "✳ inspiration"} / ${photo.category}`;
    const title = document.createElement("strong");
    title.textContent = photo.title;
    const note = document.createElement("span");
    note.className = "world-card-note";
    note.textContent = photo.note;
    info.append(label, title, note);
    card.append(image, info);
    card.addEventListener("click", () => {
      dialogImage.src = photo.image;
      dialogImage.alt = photo.title;
      dialogTitle.textContent = photo.title;
      dialogType.textContent = `${photo.type} · ${photo.note}`;
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
    gallery.append(card);
  });
}

document.querySelectorAll(".world-filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".world-filter").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  button.classList.add("active");
  button.setAttribute("aria-pressed", "true");
  renderWorld(button.dataset.filter);
}));
document.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
renderWorld();
