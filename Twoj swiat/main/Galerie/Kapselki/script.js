document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".image-track");
    let isMouseDown = false;
    let startX;
    let startPercentage;
    let debounceTimer;

    window.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        startX = e.clientX;
        startPercentage = parseFloat(track.dataset.prevPercentage) || 0;
        clearTimeout(debounceTimer); 
    });

    window.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return;

        const mouseDelta = (e.clientX - startX) * 0.1; // czulosc
        const maxDelta = window.innerWidth / 2;

        let nextPercentage = ((mouseDelta / maxDelta) * 100) + startPercentage;
        nextPercentage = Math.min(0, Math.max(nextPercentage, -100));
        track.dataset.nextPercentage = nextPercentage; 

        clearTimeout(debounceTimer); 
        debounceTimer = setTimeout(() => {
            for (const image of track.getElementsByClassName("image")) {
                image.style.transition = "object-position 0.2s"; 
                image.style.objectPosition = `${nextPercentage + 100}% 50%`;
            }
        }, ); 
    });

    window.addEventListener("mouseup", () => {
        if (isMouseDown) {
            isMouseDown = false;

            
            track.dataset.prevPercentage = track.dataset.nextPercentage || 0;

            
            track.style.transition = "transform 0.8s"; // opoznienie
            track.style.transform = `translate(${track.dataset.prevPercentage}%, -50%)`;
        }
    });
});
