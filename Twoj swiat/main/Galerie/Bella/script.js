window.addEventListener('load', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const gridRowSpan = Math.ceil(item.querySelector('img').height / 10);
        item.style.gridRowEnd = `span ${gridRowSpan}`;
    });
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreImages();
    }
});

function loadMoreImages() {
    const gallery = document.querySelector('.gallery');
    for (let i = 0; i < 5; i++) {
        const newItem = document.createElement('div');
        newItem.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/300x${200 + Math.floor(Math.random() * 400)}`;
        newItem.appendChild(img);
        gallery.appendChild(newItem);

        img.onload = () => {
            const gridRowSpan = Math.ceil(img.height / 10);
            newItem.style.gridRowEnd = `span ${gridRowSpan}`;
        };
    }
}
