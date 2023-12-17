var apiKey = 'S2v+32RLvV/f4Ks5qm/1/w==eFgI1A6inHEInuds'; 
// Función para realizar la solicitud a la API
function getPlanetInfo(planetName) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/planets?name=' + planetName,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            // Muestra la información en el div "planetInfo"
            displayPlanetInfo(result[0]);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

// Función para mostrar la información del planeta en el documento
function displayPlanetInfo(planet) {
    var infoDiv = document.getElementById('planetInfo');
    infoDiv.innerHTML = ''; // Limpia el contenido anterior

    // Crea elementos de texto para mostrar la información
    var name = document.createElement('p');
    var mass = document.createElement('p');
    var radius = document.createElement('p');
    var period = document.createElement('p');
    var semiMajorAxis = document.createElement('p');
    var temperature = document.createElement('p');
    var distanceLightYear = document.createElement('p');

    // Asigna el texto correspondiente a cada elemento
    name.textContent = 'Name: ' + planet.name;
    mass.textContent = 'Mass: ' + planet.mass;
    radius.textContent = 'Radius: ' + planet.radius;
    period.textContent = 'Period: ' + planet.period;
    semiMajorAxis.textContent = 'Semi-Major Axis: ' + planet.semi_major_axis;
    temperature.textContent = 'Temperature: ' + planet.temperature;
    distanceLightYear.textContent = 'Distance (light years): ' + planet.distance_light_year;

    // Agrega los elementos al div "planetInfo"
    infoDiv.appendChild(name);
    infoDiv.appendChild(mass);
    infoDiv.appendChild(radius);
    infoDiv.appendChild(period);
    infoDiv.appendChild(semiMajorAxis);
    infoDiv.appendChild(temperature);
    infoDiv.appendChild(distanceLightYear);

    // Crea un elemento de imagen
    var planetImage = document.createElement('img');

    // Asigna la ruta de la imagen según el nombre del planeta
    switch (planet.name.toLowerCase()) {
        case 'mercury':
            planetImage.src = '../IMG/mercury.png';
            planetImage.classList.add('planet', 'mercury');
            break;
        case 'venus':
            planetImage.src = '../IMG/venus.png';
            planetImage.classList.add('planet', 'venus');
            break;
        case 'earth':
            planetImage.src = '../IMG/earth.png';
            planetImage.classList.add('planet', 'earth');
            break;
        case 'mars':
            planetImage.src = '../IMG/mars.png';
            planetImage.classList.add('planet', 'mars');
            break;
        case 'jupiter':
            planetImage.src = '../IMG/jupiter.png';
            planetImage.classList.add('planet', 'jupiter');
            break;
        case 'saturn':
            planetImage.src = '../IMG/saturn.png';
            planetImage.classList.add('planet', 'saturn');
            break;
        case 'uranus':
            planetImage.src = '../IMG/uranus.png';
            planetImage.classList.add('planet', 'uranus');
            break;
        case 'neptune':
            planetImage.src = '../IMG/neptune.png';
            planetImage.classList.add('planet', 'neptune');
            break;
        default:
            // En caso de un planeta no reconocido, puedes asignar una imagen predeterminada
            planetImage.src = 'ruta de la imagen predeterminada';
            break;
    }

    // Agrega la imagen al div "planetInfo"
    infoDiv.appendChild(planetImage);
}

// Estilo CSS para las imágenes de los planetas
var planetStyles = `
.planet::before,
.planet::after {
    content: "";
    position: absolute;
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    border-radius: 50%;
}

.planet {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 40%; /* Ajusta el valor según tus preferencias */
    left: 70%; /* Ajusta el valor según tus preferencias */
    transform: translate(-50%, -50%);
    animation: rotate 20s linear infinite, pulse-glow 2s infinite alternate;
    overflow: hidden;
    border-radius: 50%;
    background-size: contain;
}


@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`;

// Crea un estilo en la etiqueta head del documento
var styleElement = document.createElement('style');
styleElement.innerHTML = planetStyles;
document.head.appendChild(styleElement);
