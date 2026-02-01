const form = document.querySelector('#searchForm');
const resultsContainer = document.querySelector('#results');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearImages();
    const searchTerm = form.elements.query.value;
    if (!searchTerm) return;

    try {
        const configs = { params: { q: searchTerm } }
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, configs);
        makeImages(res.data);
    } catch (e) {
        console.error("Error fetching data", e);
    }

    form.elements.query.value = "";
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG')
            img.src = result.show.image.medium;
            resultsContainer.append(img)
        }
    }
}

function clearImages() {
    resultsContainer.innerHTML = '';
}