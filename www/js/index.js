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
<<<<<<< HEAD
  initialize: function () {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady: function () {
      this.receivedEvent('deviceready');
      document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
      /*localStorage.setItem('articles', JSON.stringify([
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
      ]));*/
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
=======
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        document.getElementById("cameraTakeVideo").addEventListener("click", cameraTakeVideo);
        /*localStorage.setItem('articles', JSON.stringify([
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
        ]));*/
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
>>>>>>> 557f6b26658cda81dd13671e6259d51e91439434
};

app.initialize();

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

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function loadArticles() {
<<<<<<< HEAD
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
=======
    let articles = JSON.parse(localStorage.getItem('articles'));
    for (let i = 0; i < articles.length; i++) {
        let art = articles[i];
        let html = `<div id="${i}">`;
        html += `<div><h4>${art.title}</h4></div>`;
        if (art.hasOwnProperty('img'))
            html += `<div><img src="${art.img}" class="imgArticle" alt="Image of article"></div>`;
        html += `<span class="toggle">></span>`;
        html += `<div class="details">`;
        html += `<p>Description: ${art.description}</p>`;
        html += `<p>Date: ${art.date}</p>`;
        if (art.hasOwnProperty('video'))
            html += `<video controls width="100%" src="${art.video.src}"><source type="${art.video.type}"></video>`;
        html += `</div></div>`;
        document.getElementById('articles').innerHTML += html;
    }
    addEvent(articles.length);
>>>>>>> 557f6b26658cda81dd13671e6259d51e91439434
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
<<<<<<< HEAD
  let articles = JSON.parse(localStorage.getItem('articles'));
  articles.push({
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
      img: document.getElementById('photo').src
  });
  localStorage.setItem('articles', JSON.stringify(articles));
  location.reload()
=======
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
    articles.push(art);
    localStorage.setItem('articles', JSON.stringify(articles));
    location.reload()
>>>>>>> 557f6b26658cda81dd13671e6259d51e91439434
}

function reset() {
    localStorage.setItem('articles', JSON.stringify([]));
    location.reload()
}

var content = document.querySelector('#hamburger-content');
var sidebarBody = document.querySelector('#hamburger-sidebar-body');
sidebarBody.innerHTML = content.innerHTML;
var button = document.querySelector('#hamburger-button');
var buttonAfficheForm = document.querySelector('#hamburger-sidebar-body > nav ul li #add-button');
var overlay = document.querySelector('#hamburger-overlay');
var activatedClass = 'hamburger-activated';
var showClass = 'show';

<<<<<<< HEAD
button.addEventListener('click', function(e) {
  e.preventDefault();
=======
button.addEventListener('click', function (e) {
    e.preventDefault();
>>>>>>> 557f6b26658cda81dd13671e6259d51e91439434

  console.log(this.parentNode);
  this.parentNode.classList.add(activatedClass);
});

buttonAfficheForm.addEventListener('click', function(e) {
  //this.parentNode.classList.add(activatedClass);
  let form = document.getElementById("new");
  form.style.display = 'block';
  document.getElementById("hamburger").classList.remove(activatedClass);

});

<<<<<<< HEAD
button.addEventListener('keydown', function(e) {
  if (this.parentNode.classList.contains(activatedClass))
  {
      if (e.repeat === false && e.which === 27)
          this.parentNode.classList.remove(activatedClass);
  }
});


overlay.addEventListener('click', function(e) {
  e.preventDefault();

  this.parentNode.classList.remove(activatedClass);
});
=======
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
>>>>>>> 557f6b26658cda81dd13671e6259d51e91439434
