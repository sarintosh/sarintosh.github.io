/*
https://api.api-ninjas.com/v1/planets?name=
*/
const fetchData = async () => {
    try {
        const res = await fetch('JS/planetas.json');
        const data = await res.json();
        const filtroData = data.filter(item => item.name.common.toLowerCase() === params.toLowerCase());
        banderillas(filtroData);
    } catch (error) {
        console.log(error);
    }
};
/*
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/planets?name=' + name,
    headers: { 'X-Api-Key': 'YOUR_API_KEY' },
    contentType: 'application/json',
    success: function (result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
*/
document.addEventListener("DOMContentLoaded", function () {
    var planets = [
        {
            "name": "Neptune",
            "id": "mars", // ID para identificar la imagen
        },
        {
            "name": "Mercury",
            "id": "mercury",
        },
        {
            "name": "Venus",
            "id": "venus",
        },
        {
            "name": "Earth",
            "id": "earth",
        },
        {
            "name": "Mars",
            "id": "mars",
        },
        {
            "name": "Saturn",
            "id": "saturn",
        },
        {
            "name": "Uranus",
            "id": "uranus",
        },
        {
            "name": "Jupiter",
            "id": "jupiter",
        }
    ];

    // URL base de la API
    var apiBaseUrl = 'https://api.api-ninjas.com/v1/planets?name=';

    // Función para mostrar datos de un planeta haciendo una solicitud a la API
    function mostrarDatos(planeta) {
        var jsonDataElement = document.getElementById("json-data");

        // Hacer la solicitud a la API usando fetch
        fetch(apiBaseUrl + planeta.id)
            .then(response => response.json())
            .then(data => {
                jsonDataElement.innerHTML = "<p>Nombre: " + data.name + "</p>";
                jsonDataElement.innerHTML += "<p>Masa: " + data.mass + "</p>";
                jsonDataElement.innerHTML += "<p>Radio: " + data.radius + "</p>";
                // Continúa de la misma manera para otros campos
            })
            .catch(error => {
                console.error("Error al obtener datos de la API", error);
            });
    }

    // Función para asignar evento de clic a una imagen de planeta
    function asignarEventoClic(imagen, planeta) {
        imagen.addEventListener("click", function () {
            mostrarDatos(planeta);
        });
    }

    // Asigna eventos de clic para cada imagen de planeta
    planetas.forEach(function (planeta) {
        var planetImage = document.getElementById(planeta.id + "-image");
        asignarEventoClic(planetImage, planeta);
    });
});

/*
MARTE
*/
/*
var planets = {
    "name": "Mars",
    "mass": 0.000338,
    "radius": 0.0488,
    "period": 687,
    "semi_major_axis": 1.542,
    "temperature": 210,
    "distance_light_year": 0.000037,
    "host_star_mass": 1,
    "host_star_temperature": 6000
};


// Función para mostrar datos de un planeta
function mostrarDatos(planets) {
    var jsonDataElement = document.getElementById("json-data");
    jsonDataElement.innerHTML = "<p>Nombre: " + planeta.name + "</p>";
    jsonDataElement.innerHTML += "<p>Masa: " + planeta.mass + "</p>";
    jsonDataElement.innerHTML += "<p>Radio: " + planeta.radius + "</p>";
    // Continúa de la misma manera para otros campos
}

// Asigna la función mostrarDatos al hacer clic en la imagen de Neptuno
var neptuneImage = document.getElementById("neptune-image");
neptuneImage.addEventListener("click", function () {
    mostrarDatos(planetas[0]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Mercurio
var mercuryImage = document.getElementById("mercury-image");
mercuryImage.addEventListener("click", function () {
    mostrarDatos(planetas[1]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Venus
var venusImage = document.getElementById("venus-image");
venusImage.addEventListener("click", function () {
    mostrarDatos(planetas[2]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Tierra
var earthImage = document.getElementById("earth-image");
earthImage.addEventListener("click", function () {
    mostrarDatos(planetas[3]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Marte
var marsImage = document.getElementById("mars-image");
marsImage.addEventListener("click", function () {
    mostrarDatos(planetas[4]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Saturno
var saturnImage = document.getElementById("saturn-image");
saturnImage.addEventListener("click", function () {
    mostrarDatos(planetas[5]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Neptuno
var neptuneImage = document.getElementById("neptune-image");
neptuneImage.addEventListener("click", function () {
    mostrarDatos(planetas[6]);
});

// Asigna la función mostrarDatos al hacer clic en la imagen de Urano
var uranusImage = document.getElementById("uranus-image");
uranusImage.addEventListener("click", function () {
    mostrarDatos(planetas[7]);
});



// Función para asignar evento de clic a una imagen de planeta
function asignarEventoClic(imagen, planeta) {
    imagen.addEventListener("click", function () {
        mostrarDatos(planeta);
    });
}

// Asigna eventos de clic para cada imagen de planeta
planetas.forEach(function (planeta) {
    var planetImage = document.getElementById(planeta.id + "-image");
    asignarEventoClic(planetImage, planeta);
});

/*
const fetchData = async () => {
    try {
        const res = await fetch('data/api2.json');
        const data = await res.json();
        const filtroData = data.filter(item => item.name.common.toLowerCase() === params.toLowerCase());
        banderillas(filtroData);
    } catch (error) {
        console.log(error);
    }
};
/*____________________________________________*/
/*
const banderillas = data => {
    let elementos = '';
    data.forEach(item => {
        elementos += `
        <article class="card">
            
            <div class="card-content">

            <img src="${item.flags.png}" alt="" class="img-fluid">
                <h3>${item.name.common}</h3>
                <p>
                    <b>Población: </b>
                    ${item.population}
                </p>

                <p>
                    <b>Capital: </b>
                    ${item.capital[0]}
                </p>

                <p>
                    <b>Región: </b>
                    ${item.region}
                </p>
                <p>
                    <b>Área (Kms): </b>
                    ${item.area}
                </p>

                <p>
                    <b>Coordenadas: </b>
                    ${item.latlng}
                </p>

                <p>
                    <b>Moneda: </b>
                    ${item.currencies[Object.keys(item.currencies)[0]].name}
                    (${item.currencies[Object.keys(item.currencies)[0]].symbol})
                    ${Object.keys(item.currencies)[0]}
                </p>

                <p>
                    <b>Idioma(s): </b>
                    ${Object.values(item.languages).join(', ')}
                </p>

                <p>
                <b>Coeficiente de Gini: </b>
                    ${Object.values(item.gini).join(', ')}
                </p>

                <p>
                <b>Fronteras: </b>
                    ${Object.values(item.borders).join(', ')}
                </p>

            </div>
        </article>
        `;
    });
    banderas.innerHTML = elementos;
};
*/




