const inputModel = document.getElementById('modelInput'); // vérifier que ce n'est pas vide
const inputPlateNbr = document.getElementById('plateNbrInput'); // vérifier le format XX-000-XX
const inputDatePlate = document.getElementById('datePlateInput'); // C'est forcément une date, voir si on peut limiter à la date du jour (une immat ne peut avoir été donnée dans le futur...)
const inputFuel = document.getElementById('fuelInput'); // vérifier que ce n'est pas vide, voire faire une liste avec les carburants possibles ?
const inputColor = document.getElementById('colorInput'); // vérifier que ce n'est pas vide
const btnSaveVehicle = document.getElementById('bouttonSaveVehicle');
const vehicleForm = document.getElementById('newVehicleForm');

inputModel.addEventListener("keyup", validateForm); 
inputPlateNbr.addEventListener("keyup", validateForm);
inputDatePlate.addEventListener("keyup", validateForm);
inputFuel.addEventListener("keyup", validateForm);
inputColor.addEventListener("keyup", validateForm);
btnSaveVehicle.addEventListener("click", saveNewVehicle);

//Function permettant de valider tout le formulaire
function validateForm(){
  const modelOK = validateRequired(inputModel);
  const plateNbrOK = validatePlate(inputPlateNbr);
  const datePlateOK = validateDate(inputDatePlate); 
  const fuelOK = validateRequired(inputFuel);
  const colorOK = validateRequired(inputColor);

  if(modelOK && plateNbrOK && datePlateOK && fuelOK && colorOK) {
    btnSaveVehicle.disabled = false;
  } else {
    btnSaveVehicle.disabled = true;
  }
}

function validateRequired(input){
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

function validatePlate(input){
  //Définir mon regex
  const recentPlateNbr = /^[A-Z]{2}[\-][0-9]{3}[\-][A-Z]{2}$/;
  const oldPlateNbr = /^[0-9]{3,4}[\-][A-Z]{3}[\-][0-9]{2,3}$/;
  const userPlate = input.value;
  if(userPlate.match(recentPlateNbr) || userPlate.match(oldPlateNbr)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validateDate(input){
  //Définir mon regex
  const emailRegex = /^[0-9]{2}[\-][0-9]{2}[\-][0-9]{4}$/;
  const mailUser = input.value;
  if(mailUser.match(emailRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function saveNewVehicle() {
  let dataForm = new FormData(vehicleForm);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-AUTH-TOKEN", getToken());

  const raw = JSON.stringify({
    "model": dataForm.get("Model"),
    "plate_number": dataForm.get("PlateNbr"),
    "date_plate_number": dataForm.get("DatePlateNbr"),
    "fuel": dataForm.get("Fuel"),
    "color": dataForm.get("Color")
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"car/create", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Erreur lors de l'enregistrement du véhicule.");
      }
    })
    .then(result => {
/*       alert("Super ! Votre véhicule est désormais enregistré. Vous pouvez commencer à proposer des covoiturages.");
      document.location.href="/new-trip"; */
    })
    .catch((error) => console.error(error));
}
