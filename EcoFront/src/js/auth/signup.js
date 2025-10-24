//Implémenter le JS de ma page

const inputFirstName = document.getElementById("firstNameInput");
const inputLastName = document.getElementById("lastNameInput");
const inputPseudo = document.getElementById("pseudoInput");
const inputBirthDate = document.getElementById("birthDateInput");
const inputAdress = document.getElementById("adressInput");
const inputPostalCode = document.getElementById("postalCodeInput");
const inputPhoneNbr = document.getElementById("phoneNbrInput");
const inputMail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const inputValidationPassword = document.getElementById("validatePasswordInput");
const btnValidate = document.getElementById("bouttonSignUp");
const signUpForm = document.getElementById("signUpForm");

inputFirstName.addEventListener("keyup", validateForm); 
inputLastName.addEventListener("keyup", validateForm); 
inputPseudo.addEventListener("keyup", validateForm); 
inputBirthDate.addEventListener("keyup", validateForm); 
inputAdress.addEventListener("keyup", validateForm); 
inputPostalCode.addEventListener("keyup", validateForm); 
inputPhoneNbr.addEventListener("keyup", validateForm); 
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
btnValidate.addEventListener("click", validateRegistration);

//Function permettant de valider tout le formulaire
function validateForm(){
  const firstNameOK = validateRequired(inputFirstName);
  const lastNameOK = validateRequired(inputLastName);
  const pseudoOK = validateRequired(inputPseudo);
  const birthDateOK = validateDate(inputBirthDate);
  const adressOK = validateRequired(inputAdress);
  const postalCodeOK = validatePostalCode(inputPostalCode);
  const phoneNbrOK = validatePhoneNbr(inputPhoneNbr);
  const mailOK = validateMail(inputMail);
  const passwordOK = validatePassword(inputPassword);
  const confirmPasswordOK = validateConfirmationPassword(inputPassword, inputValidationPassword);

  if(firstNameOK && lastNameOK && pseudoOK && birthDateOK && adressOK && postalCodeOK && phoneNbrOK && mailOK && passwordOK && confirmPasswordOK) {
    btnValidate.disabled = false;
  } else {
    btnValidate.disabled = true;
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

function validateDate(input){
  const dateRegex = /^[0-9]{2}[\-][0-9]{2}[\-][0-9]{4}$/;
  const userBirthDate = input.value;
  if(userBirthDate.match(dateRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validatePostalCode(input){
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

function validatePhoneNbr(input) {
  const phoneRegex = /^(0|[\+][0-9]{2})[0-9][0-9]{8}$/;
  const userPhone = input.value;
  if(userPhone.match(phoneRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validateMail(input){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

function validatePassword(input){
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  const passwordUser = input.value;
  if(passwordUser.match(passwordRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd){
  if(inputPwd.value == inputConfirmPwd.value){
    inputConfirmPwd.classList.add("is-valid");
    inputConfirmPwd.classList.remove("is-invalid");
    return true;
  } else {
    inputConfirmPwd.classList.add("is-invalid");
    inputConfirmPwd.classList.remove("is-valid");
    return false;
  }
}

function validateRegistration() {
  let dataForm = new FormData(signUpForm);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "first_name": dataForm.get("Prenom"),
    "last_name": dataForm.get("Nom"),
    "pseudo": dataForm.get("Pseudo"),
    "birth_date": dataForm.get("DateNaissance"),
    "adress": dataForm.get("Adress"),
    "postal_code": dataForm.get("CodePostal"),
    "phone_number": dataForm.get("Telephone"),
    "email": dataForm.get("Email"),
    "password": dataForm.get("MotDePasse")
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"registration", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        alert("Erreur lors de l'inscription.");
      }
    })
    .then(result => {
      alert("Félicitations " + dataForm.get("Prenom") + " ! Votre compte est désormais créé. Vous pouvez vous connecter.");
      document.location.href="/signin";
    })
    .catch((error) => console.error(error));
}

