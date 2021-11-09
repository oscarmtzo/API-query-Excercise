// console.log("conectado");
let paginas = 1;
let special_word = "aqui va la api key";
const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");

btnSiguiente.addEventListener("click",() => {
    if (paginas < 1000) {
        paginas++;
        loadMovies();
    }
} )
btnAnterior.addEventListener("click", () => {
    if (paginas > 1) {
        paginas--;
        loadMovies();
    }
});
const loadMovies = async() => {
    try {
        
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${special_word}&language=es-MX&page=${paginas}`);
        //console.log(await respuesta.json());
    
        //Si la respuesta es correcta
        if(respuesta.status == 200) {
            const datos = await respuesta.json();
            console.log(datos.results)

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += card(pelicula.title, pelicula.overview, pelicula.backdrop_path);
                // console.log(pelicula.title);
            });

            renderCard(peliculas);
        } else {
            //si la respuesta es incorrecta 
            switch (respuesta.status) {
                case 401:
                    console.log("pusiste la llave mal, error de autenticacion");
                    break;
                case 404:
                    console.log("No se encontro la pelicula buscada");
                    break;
                default:
                    console.log("Un error que no se manejo anteriormente");
                    break;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

const card = (titulo, descripcion, imagen) => {
    return `
    <div class="col d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
                <a href="#" class="btn btn-primary">Muestra más</a>
            </div>
        </div>
    </div>
    `;
}

const renderCard = (movies) => {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = movies;
}

loadMovies();