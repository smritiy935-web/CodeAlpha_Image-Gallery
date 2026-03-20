const images = [

  // ✅ NATURE IMAGES - 100% WORKING

  { url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'nature', title: 'Mountain Lake' },

  { url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'nature', title: 'Forest Trail' },

  { url: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'nature', title: 'Sunset Beach' },

  { url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', category: 'nature', title: 'Desert Dunes' },


  { url: 'https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'nature', title: 'Snowy Mountains' },


  // ✅ CARS IMAGES - 100% WORKING

  { url: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'cars', title: 'Red Lamborghini' },

  { url: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'cars', title: 'White Lamborghini' },

  { url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'cars', title: 'Sports Car' },

  { url: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'cars', title: 'Classic Car' },

  { url: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'cars', title: 'Luxury Car' },


  // ✅ ANIMALS IMAGES - 100% WORKING

  { url: 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'animals', title: 'Colorful Parrot' },

  { url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', category: 'animals', title: 'Playful Monkey' },

  { url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'animals', title: 'Cute Cat' },

  { url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'animals', title: 'Loyal Dog' },

  { url: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=600', category: 'animals', title: 'Wild Lion' }

];

// DOM Elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let filteredImages = [...images];

function displayGallery(imagesToShow) {
  gallery.innerHTML = '';
  imagesToShow.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.index = index;
    div.innerHTML = `<img src="${img.url}" alt="${img.title}"><div class="category-badge">${img.category}</div>`;
    div.addEventListener('click', () => openLightbox(imagesToShow.indexOf(img)));
    gallery.appendChild(div);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = filteredImages[currentIndex].url;
  lightboxCaption.textContent = filteredImages[currentIndex].title;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  lightboxImg.src = filteredImages[currentIndex].url;
  lightboxCaption.textContent = filteredImages[currentIndex].title;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  lightboxImg.src = filteredImages[currentIndex].url;
  lightboxCaption.textContent = filteredImages[currentIndex].title;
}

function filterImages(category) {
  if (category === 'all') filteredImages = [...images];
  else filteredImages = images.filter(img => img.category === category);
  displayGallery(filteredImages);
  filterBtns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');
}

// Event Listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => filterImages(btn.dataset.filter));
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') nextImage();
  else if (e.key === 'ArrowLeft') prevImage();
});

// Initial gallery display
displayGallery(images);