// Depart
const inputAdressDepart = document.getElementById('adressDepartInput');
const inputCpDepart = document.getElementById('cpDepartInput');
const inputHeureDepart = document.getElementById('heureDepartInput');
const inputDateDepart = document.getElementById('dateDepartInput');

inputAdressDepart.addEventListener("keyup", validateForm); 
inputCpDepart.addEventListener("keyup", validateForm);
inputHeureDepart.addEventListener("keyup", validateForm);
inputDateDepart.addEventListener("keyup", validateForm);

// Arrivee
const inputAdressArrivee = document.getElementById('adressArriveeInput');
const inputCpArrivee = document.getElementById('cpArriveeInput');
const inputHeureArrivee = document.getElementById('heureArriveeInput');
const inputDateArrivee = document.getElementById('dateArriveeInput');

inputAdressArrivee.addEventListener("keyup", validateForm); 
inputCpArrivee.addEventListener("keyup", validateForm);
inputHeureArrivee.addEventListener("keyup", validateForm);
inputDateArrivee.addEventListener("keyup", validateForm);

// Prix, places
const inputPrix = document.getElementById('prixInput');
const inputPlaces = document.getElementById('placesInput');

inputPrix.addEventListener("keyup", validateForm); 
inputPlaces.addEventListener("keyup", validateForm);

// Checkbox
const inputDefaultStatus = document.getElementById('defaultStatusInput');

let inputAnimaux;
let inputFumeur;

function checkPref() {
  if(document.getElementById('animauxInput').checked) {
    inputAnimaux = document.getElementById('animauxInput'); 
  } else {
    inputAnimaux = '';
  }

  if(document.getElementById('fumeurInput').checked) {
    inputFumeur = document.getElementById('fumeurInput');
  } else {
    inputFumeur = '';
  }
}

// Boutton
const btnSaveTrip = document.getElementById('bouttonSaveTrip');
btnSaveTrip.addEventListener("click", saveNewTrip);

//Function permettant de valider tout le formulaire
function validateForm(){
  const adressDepartOK = validateRequired(inputAdressDepart);
  const cpDepartOK = validatePostalCode(inputCpDepart);
  const heureDepartOK = validateTime(inputHeureDepart);
  const dateDepartOK = validateDate(inputDateDepart);

  const adressArriveeOK = validateRequired(inputAdressArrivee);
  const cpArriveeOK = validatePostalCode(inputCpArrivee);
  const heureArriveeOK = validateTime(inputHeureArrivee);
  const dateArriveeOK = validateDate(inputDateArrivee);

  const priceOK = validateNumber(inputPrix);
  const nbrPlaceOK = validateNumber(inputPlaces);

  if(adressDepartOK && cpDepartOK && heureDepartOK && dateDepartOK && adressArriveeOK && cpArriveeOK && heureArriveeOK && dateArriveeOK && priceOK && nbrPlaceOK) {
    btnSaveTrip.disabled = false;
  } else {
    btnSaveTrip.disabled = true;
  }
}

function validateRequired(input) {
  if(input.value != ''){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validatePostalCode(input) {
  const postalCodeRegex = /^[0-9]{5} [A-Za-z\d\W_]+$/;
  const userPostal = input.value;
  if(userPostal.match(postalCodeRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validateTime(input) {
  //Définir mon regex
  const timeRegex = /^[0-9]{2}[\:][0-9]{2}$/;
  const timeUser = input.value;
  if(timeUser.match(timeRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validateDate(input) {
  //Définir mon regex
  const dateRegex = /^[0-9]{2}[\-][0-9]{2}[\-][0-9]{4}$/;
  const dateUser = input.value;
  if(dateUser.match(dateRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validateNumber(input) {
  const numberRegex = /^[0-9]{1,3}$/;
  const numberUser = input.value;
  if(numberUser.match(numberRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function saveNewTrip() {
  let dataForm = new FormData(newTripForm);

  checkPref();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN", getToken());

  const raw = JSON.stringify({
    "status": inputDefaultStatus.value,
    "adressDepart": dataForm.get("AdresseDepart"),
    "cpDepart": dataForm.get("cpDepart"),
    "heureDepart": dataForm.get("HeureDepart"),
    "dateDepart": dataForm.get("DateDepart"),
    "adressArrivee": dataForm.get("AdresseArrivee"),
    "cpArrivee": dataForm.get("cpArrivee"),
    "heureArrivee": dataForm.get("HeureArrivee"),
    "dateArrivee": dataForm.get("DateArrivee"),
    "price": dataForm.get("Prix"),
    "nbrPlace": dataForm.get("NbrPlaces"),
    "preferences": inputAnimaux.value + " " + inputFumeur.value
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"covoiturage/create", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Erreur lors de l'enregistrement du trajet.");
      }
    })
    .then(result => {
      console.log(result);
      /*       alert("Super ! Votre trajet a été créé.");
      document.location.href="/mon-compte"; */
    })
    .catch((error) => console.error(error));
}
