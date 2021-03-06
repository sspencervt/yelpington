'use strict'

let name = document.location.pathname.slice(1);
let myJson;

changeDisplay();


getRestaurantList();

function getRestaurantList() {
    fetch('/all.json')
        .then(function (response){
            return response.json();
        })
        .then(function (restInfo){
            populateRestList(restInfo)
        })
}

function populateRestList(restInfo){
    for(var element in restInfo){

        let restTitle = restInfo[element].split('-');
        let restaurantName = ''

        for(var wordNumber in restTitle){
            let titleCase = restTitle[wordNumber].toUpperCase().slice(0,1) + restTitle[wordNumber].slice(1);
            restaurantName = restaurantName + titleCase + ' ';
        }

        document.getElementById("restLinks").innerHTML += '<li><a href="/' + restInfo[element] + '">' + restaurantName + '</a></li>';
    }
}

//GRABBING INFO FROM JSON AND DISPLAYING UNDER DIVS

function getInfo() {
    fetch(name + '.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById('restauranttitle')
            .textContent = myJson.name;

            for (var element in myJson.notes){
                document.getElementById('notes').innerHTML+=marked(myJson.notes[element])
            }

            document.getElementById('info').innerHTML ='<p class="bold center">Address</p><p class="center" id="address">' + myJson.address + '</p><p class="bold center">Phone Number</p><p class="center" id="phonenumber">' + myJson['phone number'] + '</p><p class="bold center">Hours</p><p class="center" id="hours">' + myJson.hours + '</p><p class="bold center">Website</p><p class="center" id="website">' + myJson.website + '</p>'

            getMapInfo(myJson);
        })
}

//GRABBING INPUT FROM SEARCH BAR AND ATTACHING TO END OF URL

function search(myJson) {
    let input = document.getElementById('input').value.split(' ')
    input = input.join('-')
    window.location.href = "http://localhost:5000/" + input;
}

//ACTIVATING 'ENTER' TO TRIGGER CLICK ON SEARCH BUTTON

function enterbutton() {
    let enter = document.getElementById('input')
    enter.addEventListener("keyup", function(event) {
        event.preventDefault()
        if (event.keyCode === 13) {
            document.getElementById('input').reset
            document.getElementById('searchbutton').click()

                }
                
    })
}

function weblink(myJson) {
    let link = document.getElementById('website').textContent
}

//POPULATING MAP

function getMapInfo(myJson) {
    fetch('https://nominatim.openstreetmaps.org/search/?q=' + myJson.address + ',burlington,vermont&format=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (mapInfo) {

            let mapSource = "https://www.openstreetmap.org/export/embed.html?bbox=" + mapInfo[0].boundingbox[2] + '%2C' + mapInfo[0].boundingbox[0] + '%2C' + mapInfo[0].boundingbox[3] + '%2C' + mapInfo[0].boundingbox[1] + '&layer=mapnik&marker=' + mapInfo[0].lat + '%2C' + mapInfo[0].lon;

            document.getElementById('mapiframe').setAttribute("src", mapSource) 

            // var marker = L.marker([mapSource]).addTo(map);
        })
        
}

    function changeDisplay() {
        myJson = getInfo();
    }

    

    
