const apiKey = '6060xxx';

// Elemente auf der Seite
const header = document.querySelector("#header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");



/* Hören auf das Absenden des Formulars */
form.onsubmit = function(e) {
    e.preventDefault();

    // Den Wert aus dem Input-Feld nehmen und Leerzeichen entfernen
    let city = input.value.trim();

    if (city === '') return; // Keine leere Anfrage senden

    // URL für die Anfrage
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Anfrage ausführen
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Entfernen der vorherigen Karte, falls vorhanden
            const prevCard = document.querySelector('.card');
            if (prevCard) prevCard.remove();

            // Fehlerprüfung
            if (data.error) {
                const html = `<div class="card">${data.error.message}</div>`;
                header.insertAdjacentHTML('afterend', html);
            } else {
                // Markup für die Wetterkarte

                const iconUrl = `https:${data.current.condition.icon}`;
                const html = `<div class="card">
                    <h2 class="card-city">${data.location.name}<span> ${data.location.country}</span></h2>
                    <div class="card-weather">
                        <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
                       <img class="card-img" src="${iconUrl}" alt="${data.current.condition.text}">

                    </div>
                    <div class="card-description">${data.current.condition.text}</div>
                </div>`;

                // Karte anzeigen
                header.insertAdjacentHTML('afterend', html);
            }
        })
        .catch(() => {
            // Fehlerbehandlung bei der Netzwerkverbindung
            const html = `<div class="card">Fehler bei der Verbindung mit der API</div>`;
            header.insertAdjacentHTML('afterend', html);
        });
};


