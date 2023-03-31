const form = document.querySelector('#searchForm')
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    deleteImages();
    const searchTerm = form.elements.query.value;
    const configs = { params: { q: searchTerm }}
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, configs);
    makeImages(res.data);
    form.elements.query.value = "";
})

const makeImages = (shows) => {
    for(let result of shows){
        if(result.show.image){
            const img = document.createElement('IMG')
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}

function deleteImages(){
    var images = document.getElementsByTagName('img');
    var l = images.length;
    for (var i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }
}