/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

let app = {
    onDeviceReady: function () {
        document.getElementById('cameraTakePicture').addEventListener('click', cameraTakePicture);
        document.getElementById('cameraTakeVideo').addEventListener('click', cameraTakeVideo);
        document.getElementById('addPosition').addEventListener('click', getPosition);
        loadArticles();
    }
};

app.onDeviceReady();

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        document.getElementById('photoDiv').style.display = 'block';
        document.getElementById('photo').src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function cameraTakeVideo() {
    navigator.device.capture.captureVideo(onSuccess, onFail);

    function onSuccess(files) {
        document.getElementById('videoSource').type = files[0].type;
        document.getElementById('video').src = files[0].fullPath;
        document.getElementById('videoDiv').style.display = 'block';
    }

    function onFail(e) {
        alert('Failed because: ' + e);
    }
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(onSuccess, onFail);

    function onSuccess(p) {
        document.getElementById('positionDiv').style.display = 'block';
        document.getElementById('lat').innerText = p.coords.latitude.toString();
        document.getElementById('lng').innerText = p.coords.latitude.toString();
    }

    function onFail(e) {
        alert('Failed because: ' + e);
    }
}

function loadArticles() {
    if (localStorage.getItem('articles') == null) {
        localStorage.setItem('articles', JSON.stringify([]));
        return;
    }
    let articles = JSON.parse(localStorage.getItem('articles'));
    for (let i = 0; i < articles.length; i++) {
        let art = articles[i];
        let hasPosition = art.hasOwnProperty('position');
        let html = `<div id="${i}" class="toggle">`;
        html += `<div><h4>${art.title}</h4></div>`;
        if (art.hasOwnProperty('img'))
            html += `<div><img src="${art.img}" class="imgArticle" alt="Image of article"></div>`;
        html += `<span>Details</span>`;
        html += `<div class="details">`;
        html += `<p>Description: ${art.description}</p>`;
        html += `<p>Date: ${art.date}</p>`;
        if (art.hasOwnProperty('video'))
            html += `<video controls width="100%" src="${art.video.src}"><source type="${art.video.type}"></video>`;
        if (hasPosition)
            html += `<div id="map${i}" class="map"></div>`;
        html += `</div></div>`;
        document.getElementById('articles').innerHTML += html;
        if (hasPosition)
            addMap(art.position.lat, art.position.lng, i)
    }
    addEvent(articles.length);
}

function addEvent(lenght) {
    for (let i = 0; i < lenght; i++) {
        document.getElementsByClassName('toggle')[i].onclick = () => {
            let detail = document.getElementsByClassName('details')[i];
            detail.style.display !== 'block' ? detail.style.display = 'block' : detail.style.display = 'none'
        }
    }
}

document.getElementById('add').onclick = () => addArticleJSON();
document.getElementById('reset').onclick = () => reset();

function addArticleJSON() {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    if (title === '') {
        alert('Title required');
        return;
    }
    if (date === '') {
        alert('Date required');
        return;
    }
    let articles = JSON.parse(localStorage.getItem('articles'));
    const hasPhoto = document.getElementById('photoDiv').style.display === 'block';
    const hasVideo = document.getElementById('videoDiv').style.display === 'block';
    const hasPosition = document.getElementById('positionDiv').style.display === 'block';
    let art = {
        title: title,
        description: document.getElementById('description').value,
        date: date
    };
    if (hasPhoto)
        art.img = document.getElementById('photo').src;
    if (hasVideo)
        art.video = {
            src: document.getElementById('video').src,
            type: document.getElementById('videoSource').type
        };
    if (hasPosition)
        art.position = {
            lat: parseFloat(document.getElementById('lat').innerText),
            lng: parseFloat(document.getElementById('lng').innerText)
        };
    articles.unshift(art);
    localStorage.setItem('articles', JSON.stringify(articles));
    location.reload()
}

function addMap(lat, lng, i) {
    let map = new google.maps.Map(document.getElementById(`map${i}`), {
        center: {lat: 0, lng: 0},
        zoom: 1
    });
    let marker = new google.maps.Marker({
        position: {lat: lat, lng: lng}
    });
    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

function reset() {
    localStorage.setItem('articles', JSON.stringify([]));
    location.reload()
}

const
    content = document.querySelector('#hamburger-content'),
    sidebarBody = document.querySelector('#hamburger-sidebar-body');
sidebarBody.innerHTML = content.innerHTML;
const
    button = document.querySelector('#hamburger-button'),
    buttonAfficheForm = document.querySelector('#hamburger-sidebar-body > nav ul li #add-button'),
    overlay = document.querySelector('#hamburger-overlay'),
    activatedClass = 'hamburger-activated';

button.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentNode.classList.add(activatedClass);
});

buttonAfficheForm.addEventListener('click', function () {
    let form = document.getElementById("new");
    form.style.display = 'block';
    document.getElementById("hamburger").classList.remove(activatedClass);

});

button.addEventListener('keydown', function (e) {
    if (this.parentNode.classList.contains(activatedClass)) {
        if (e.repeat === false && e.which === 27)
            this.parentNode.classList.remove(activatedClass);
    }
});

overlay.addEventListener('click', function (e) {
    e.preventDefault();

    this.parentNode.classList.remove(activatedClass);
});
