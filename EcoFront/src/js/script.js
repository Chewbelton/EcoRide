const tokenCookieName = "accesstoken";
const roleCookieName = "role";
const signoutButton = document.getElementById('signoutBoutton');
const apiUrl = "http://127.0.0.1:8000/api/";

signoutButton.addEventListener("click", signout);

getUserInfo();

// fonction pour récupérer le rôle associé au cookie

function getRole() {
  return getCookie(roleCookieName);
}


// fonction pour effacer les cookies lors de la déconnexion
function signout() {
  eraseCookie(tokenCookieName);
  eraseCookie(roleCookieName);
  window.location.replace("/");
}

// fonction pour récupérer le token
function setToken(token){
  setCookie(tokenCookieName, token, 7);
}

function getToken(){
  return getCookie(tokenCookieName);
}


// fonctions pour récupérer le cookie et lui donner les valeurs voulues

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// fonction pour vérifier que l'on est bien connecté

function isConnected(){
  if(getToken() == null || getToken == undefined){
    return false;
  }
  else{
    return true;
  }
}

// fonction pour afficher ou masquer les éléments en fonction du rôle


/* 
Il existe six rôle :
  - Disconnected (utilisateur non-connecté)
  - Connected (utilisateur connecté ; tous les rôles enfants DOIVENT être connecté pour accéder aux fonctionnalités)
    - Driver
    - Employee
    - Admin
*/


function showAndHideForRole() {
  const userConnected = isConnected();
  const role = getRole();

  let allElementsToEdit = document.querySelectorAll('[data-show]');

  allElementsToEdit.forEach(element => {
    switch(element.dataset.show) {
      case 'disconnected':
        if(userConnected) {
          element.classList.add("d-none");
        }
        break;
      case 'connected':
        if(!userConnected) {
          element.classList.add("d-none");
        }
        break;
      case 'driver':
        if(!userConnected || role != 'driver') {
          element.classList.add("d-none");
        }
        break;
      case 'employee':
        if(!userConnected || role != 'employee')  {
          element.classList.add("d-none");
        }
        break;
      case 'admin':
        if(!userConnected || role != 'admin') {
          element.classList.add("d-none");
        }
        break;
    }
  })
}

function getUserInfo() {
  let myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' 
  };

  fetch(apiUrl+"account/me", requestOptions)
  .then(response =>{
    if(response.ok){
      return response.json();
    } else{
      console.log("Impossible de récupérer les informations utilisateur");
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(error =>{
    console.error("erreur lors de la récupération des données utilisateur", error);
  });
}

