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
var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        localStorage.setItem('articles', JSON.stringify([
            {
                title: 'Trop belle photo',
                description: 'Une petite description.',
                date: '2013-10-21',
                img: 'img/pexels-photo.jpg'
            },
            {
                title: 'Je sais pas quoi mettre comme titre',
                description: 'Une autre description.',
                date: '2012-04-23',
                img: 'img/beauty-bloom-blue-67636.jpg'
            },
            {
                title: 'Un titre',
                description: 'Blasphème.',
                date: '2016-08-21',
                img: 'img/Notre_Dame.jpg'
            }
        ]));
        loadArticles();
    },

    receivedEvent: function (id) {
        let parentElement = document.getElementById(id);
        let listeningElement = parentElement.querySelector('.listening');
        let receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        let image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function loadArticles() {
    let articles = JSON.parse(localStorage.getItem('articles'));
    for (let i = 0; i < articles.length; i++) {
        let art = articles[i];
        let html = `<div id="${i}">`;
        html += `<div><h4>${art.title}</h4></div>`;
        html += `<div><img src="${art.img}" class="imgArticle" alt="Image of article"></div>`;
        html += `<span class="toggle">></span>`;
        html += `<div class="details">`;
        html += `<p>Description: ${art.description}</p>`;
        html += `<p>Date: ${art.date}</p>`;
        html += `</div></div>`;
        document.getElementById('articles').innerHTML += html;
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