window.addEventListener("load", getData);

function getData() {
    const NASA_KEY = 'ge4KOkXIMyXnEuQGqSkRYqSTWZPSt66EZrhvl7IE';
    const PATH = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

    fetch(PATH)
        .then(response => response.json())
        .then(result => {
            console.log(result); // Agrega este log para depuración
            showData(result);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showData({ date, explanation, media_type, title, url }) {
    console.log('showData called'); 

    const TITLE = document.querySelector('#title');
    TITLE.innerHTML = title;
    const DATE = document.querySelector('#date');
    DATE.innerHTML = date;
    const EXPLANATION = document.querySelector('#description');
    EXPLANATION.innerHTML = explanation;

    const MULTIMEDIA = document.querySelector('#c_multimedia');
    MULTIMEDIA.innerHTML = ''; // Limpiamos el contenido anterior

    // Validamos si es imagen o video
    if (media_type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.className = 'embed-responsive-item';
        iframe.src = url;
        MULTIMEDIA.appendChild(iframe);
    } else {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'img-fluid';
        img.alt = url;
        MULTIMEDIA.appendChild(img);
    }
}
/*
// Estilo CSS para las imágenes de los planetas
var imgStyles = `
.multi {
    color: #fff !important;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
}

.header{
    text-align: center  !important;
}

body{
    color: #fff !important; 
}

body-multi{
    color: #fff !important; 
}

.footer{
    font-family: 'Space Grotesk', sans-serif;
    font-weight: bold;
    color:#fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1); 
    display: flex;
    justify-content: space-between; 
    font-size: 14px; 
}`;
*/