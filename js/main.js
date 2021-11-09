// console.log("conectado")

const cargarPeliculas = async () =>{

    try {
        let respuesta = await fetch(`https://api.themoviedb.org/3/movie/500?api_key=${special_word}&language=es-MX`);//respuesta que falta por obtener el obejeto json de un metodo .json() de respuesta
        //console.log(respuesta); //=> fulfilled promise
        // console.log(await respuesta.json());
        
        //Comprobacion de respuesta que tengamos se usa el control de flujo dependeiendo del codigo http 

        //si el status es 200 o esta correcto, vamos a mostrar las cartas en la pantalla del usuario
        if (respuesta.status == 200) {
            
            //accediendo a la informacion, debe de esperar la respuesta, es por esto que se usa await y el metodo json
            let movieData = await respuesta.json(); //almacena los datos de la pelicual en particular
            //console.log(movieData);
            let packOfCards = [];
            //card(movieData.original_title);
            packOfCards.push(
                card(movieData.original_title, movieData.overview)
            );
    
            renderCard(packOfCards);
            
        } else if (respuesta.status == 401) {
          console.log("hay un error en el URL");   
        }
        
    } catch(error) {
        console.log(error);
    }//catch no tiene que ver con la peticion
    //try y catch solo nos ayudan a ejecutar el codigo y en caso de NO funcionar, no se cae el programa por completo

}

const card = (movieTitle, movieDescription ) => {
    
    return `
        <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${movieTitle}</h5>
        <p class="card-text">${movieDescription}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
        </div>
        </div>
    `;
}

/**
 * @function renderCard
 */
const renderCard = (paqueteDeCards) => {
    const contenedor = document.getElementById("contenedor");
    paqueteDeCards.forEach(card => {
        contenedor.innerHTML += card;
    });
}


cargarPeliculas();