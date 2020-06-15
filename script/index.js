
class CatBreed {
    constructor(breed) {
        this.breed = breed;
    }

    static async fetchCat(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async fetchCatImages(url) {
        try {
            const response = await fetch(`${url}`);
            const catImages = await response.json();
            const catCarousel = document.querySelector('.carousel-inner');
            catImages.forEach((img, index) => {
                const imgDiv = document.createElement('div');
                imgDiv.setAttribute('class', `carousel-item${index === 0 ? ' active' : ''}`);
                const catImgElement = document.createElement('img');
                catImgElement.setAttribute('src', img.url);
                imgDiv.appendChild(catImgElement);
                catCarousel.appendChild(imgDiv);
            });
            return catCarousel;
        } catch (error) {
            return error;
        }
    }

    static async onLoad(url) {
        const catData = await this.fetchCat(url);
        const catContainer = document.getElementById('catList');
        const catDropDown = document.createElement('select');
        catDropDown.setAttribute('id', 'catDropdown');
        catData.forEach((cat) => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.innerHTML = cat.name;
            catDropDown.appendChild(option);
        });
        catDropDown.addEventListener('change', async (e) => {
            const carousel = document.querySelector('.carousel-inner');
            const carouselImages = carousel.querySelectorAll('div');
            carouselImages.forEach((div) => {
                carousel.removeChild(div);
            });
            const pics = await this.fetchCatImages(`https://api.thecatapi.com/v1/images/search?breed_id=${e.target.value}&limit=5`);
        });
        catContainer.appendChild(catDropDown);
    }
}

CatBreed.onLoad('https://api.thecatapi.com/v1/breeds');