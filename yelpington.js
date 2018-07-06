'use strict'

let params = new URLSearchParams(document.location.search.slice(1));
let name = params.get("name");
let myJson;

changeDisplay();

function getInfo() {
    fetch(name + '.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById('restauranttitle')
            .textContent = myJson.name;

            document.getElementById('notes')
            .textContent = myJson.notes;

            document.getElementById('address')
            .textContent = myJson.address

            document.getElementById('phonenumber')
            .textContent = myJson['phone number']

            document.getElementById('hours')
            .textContent = myJson.hours

            document.getElementById('website')
            .textContent = myJson.website

            getMapInfo(myJson);
        })
}

function search(myJson) {
    let input = document.getElementById('input').value
    window.location.href = "http://localhost:5000/?name=" + input;
}

function getMapInfo(myJson) {
    fetch('https://nominatim.openstreetmaps.org/search/?q=' + myJson.address + ',burlington,vermont&format=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (mapInfo) {
            console.log(mapInfo)
            let mapSource = "https://www.openstreetmap.org/export/embed.html?bbox=" + mapInfo[0].boundingbox[2] + '%2C' + mapInfo[0].boundingbox[0] + '%2C' + mapInfo[0].boundingbox[3] + '%2C' + mapInfo[0].boundingbox[1] + '&;layer=mapnik&;marker=' + mapInfo[0].lat + '%2C' + mapInfo[0].lon;
            document.getElementById('mapiframe').setAttribute("src", mapSource) 
            console.log(mapSource)
        })
}

    function changeDisplay() {
        myJson = getInfo();
    }

    

    
