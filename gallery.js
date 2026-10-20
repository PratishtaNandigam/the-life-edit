/* THE LIFE EDIT — EASY PHOTO EDITOR
   1. Upload your own photos into the images/ folder on GitHub.
   2. Change an item image to "images/your-photo.jpg".
   3. Set type to "my moments" for your own photos, or "inspiration" for inspiration images.
   4. Edit title, note and category. Add or remove items by copying an object.
   IMPORTANT: sample images are inspiration only; none are represented as Lucky's real photos.
*/
const lifeEditPhotos = [
  {"title": "a little piece of paradise 🌴", "note": "blue skies, palm trees & the little moments I love ♡", "category": "travel", "type": "my moments", "image": "images/20220903_130712.jpg"},
  {"title": "chasing sunsets & little joys 🌅", "note": "golden skies, happy moments, and a little bit of magic ♡", "category": "my life", "type": "my moments", "image": "images/Me.jpeg"},
  {"title": "little details, big feelings", "note": "the tiny things that make an outfit feel like me ♡", "category": "style", "type": "my moments", "image": "images/little-details.jpeg"},
  {"title": "a little sparkle", "note": "pink, gold & all the pretty details ✨", "category": "style", "type": "my moments", "image": "images/pink-and-gold.jpeg"},
  {"title": "daisy days", "note": "a flower for every mood 🌼", "category": "flowers", "type": "my moments", "image": "images/daisy-days.jpeg"},
  {"title": "sunshine in a handful", "note": "tiny blooms, big joy ♡", "category": "flowers", "type": "my moments", "image": "images/yellow-flowers.jpeg"},
  {"title": "meet me by the water", "note": "soft skies & nowhere else to be", "category": "travel", "type": "my moments", "image": "images/waterfront-evening.jpeg"},
  {"title": "the accessories edit", "note": "a little sunshine on my favorite things", "category": "style", "type": "my moments", "image": "images/little-accessories.jpeg"},
  {"title": "flowers, always", "note": "some days just need a bouquet ♡", "category": "flowers", "type": "my moments", "image": "images/pink-flowers.jpeg"},
  {"title": "collecting sunsets", "note": "the sky putting on a show again ✳", "category": "travel", "type": "my moments", "image": "images/sunset-walk.jpeg"},
  {"title": "a moment in bloom", "note": "finding beauty in the little things 🌸", "category": "flowers", "type": "my moments", "image": "images/spring-blossoms.jpeg"},
  {"title": "a little moving memory 🎞", "note": "press play to relive the moment ♡", "category": "my life", "type": "my moments", "video": "images/little-memory.mp4", "image": "images/little-memory-cover.jpg"},
  { title: "flower market mornings", note: "a bouquet makes everything better", category: "flowers", type: "inspiration", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=85" },
  { title: "one more coffee, please", note: "finding the cutest corners", category: "cafés", type: "inspiration", image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=85" },
  { title: "clay days", note: "a little messy, a lot of fun", category: "pottery", type: "inspiration", image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=85" },
  { title: "out of office", note: "collecting places, not things", category: "travel", type: "inspiration", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=85" },
  { title: "the slow mornings edit", note: "a little time for myself", category: "self-care", type: "inspiration", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85" },
  { title: "little home details", note: "beautiful spaces with personality", category: "interiors", type: "inspiration", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85" },
  { title: "beauty shelf diaries", note: "trying something new, always", category: "beauty", type: "inspiration", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85" },
  { title: "made with love", note: "something delicious is happening", category: "cooking", type: "inspiration", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=85" },
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
    if (photo.video) { image.alt = `${photo.title} (video preview)`; }
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
    if (photo.video) {
      const video = document.createElement("video");
      video.src = photo.video;
      video.poster = photo.image;
      video.controls = true;
      video.playsInline = true;
      video.preload = "none";
      video.setAttribute("aria-label", photo.title);
      video.style.cssText = "display:block;width:100%;height:auto;aspect-ratio:3/4;object-fit:cover;background:#241b1b;";
      const videoCard = document.createElement("div");
      videoCard.className = "world-card";
      videoCard.style.cursor = "default";
      videoCard.append(video, info);
      gallery.append(videoCard);
      return;
    }
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
