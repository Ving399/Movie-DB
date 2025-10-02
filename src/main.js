const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});


//utils

function createMovies(movies, container) {
    container.innerHTML = '';

        movies.forEach(movie => {

        //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); //tomamos el id y la clase principal del article contenedor
        const movieContainer = document.createElement('div'); //metenmos cad apelicula en un div
        movieContainer.classList.add('movie-container');     //le damos la clase movie container
        
        const movieImg = document.createElement('img') //creamos la etiqueta de img
        movieImg.classList.add('movie-img');           //le damos una clase
        movieImg.setAttribute('alt', movie.title);     //le damos un titulo a la imagen 
        movieImg.setAttribute(                         //tomamos la imagen del json de peliculas
            'src',
            'https://image.tmdb.org/t/p/w300'+ movie.poster_path );

        movieContainer.appendChild(movieImg);          //le agregamos la imagen que ya creamos y trajimos del json al div principal
        container.appendChild(movieContainer); //metemos en el article las imagenes que tengamos en el json segun la estructura que ya definimos por cada img
    });
}

function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');     
        
        const categoryTitle = document.createElement('h3') 
        categoryTitle.classList.add('category-title');           
        categoryTitle.setAttribute('id', 'id'+category.id);

        categoryTitle.addEventListener( 'click', ()=> {
           location.hash = `#category=${category.id}-${category.name}`; 
        });  

        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });

}


// CREANDO EL CONTENEDOR DE LAS PELICULAS
//Funcion para conseguir peliculas en tendencia
async function getTrendingMoviesPreview() {     
    const {data} = await api('trending/movie/day');

    const movies = data.results //mete a una variable la respuesta
    console.log(data, movies); //imprime la variable

    createMovies(movies, trendingMoviesPreviewList);

}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');

    const categories = data.genres
    console.log(data, categories); 

    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {     
    const {data} = await api('/discover/movie',{
        params: {
            with_genres: id,
        },
    });

    const movies = data.results //mete a una variable la respuesta
    console.log(data, movies); //imprime la variable
    
    createMovies(movies, genericSection);
}
