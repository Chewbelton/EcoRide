// Input fields
const inputPseudo = document.getElementById("pseudoInput");
const inputAdress = document.getElementById("adressInput");
const inputPostalCode = document.getElementById("postalCodeInput");
const inputPhoneNbr = document.getElementById("phoneNbrInput");
const inputMail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const inputValidationPassword = document.getElementById("validatePasswordInput");

// Validate button
const saveNewPseudo = document.getElementById("saveNewPseudoBtn");
const saveNewMail = document.getElementById("saveNewMailBtn");
const saveNewPassword = document.getElementById("saveNewPasswordBtn");
const saveNewAdress = document.getElementById("saveNewAdressBtn");
const saveNewPhone = document.getElementById("saveNewPhoneBtn");

// Edit forms
const pseudoForm = document.getElementById("editPseudoForm");
const mailForm = document.getElementById("editMailForm");
const passwordForm = document.getElementById("editPasswordForm");
const adressForm = document.getElementById("editAdressForm");
const phoneForm = document.getElementById("editPhoneNumberForm");


// Pseudo
inputPseudo.addEventListener("keyup", callPseudo); 
saveNewPseudo.addEventListener("click", validateNewPseudo);

function callPseudo() {
  const pseudoOK = validateRequired(inputPseudo);

  if(pseudoOK) {
    saveNewPseudo.disabled = false;
  } else {
    saveNewPseudo.disabled = true;
  }
}

function validateNewPseudo() {
  let dataForm = new FormData(pseudoForm);

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "pseudo": dataForm.get("Pseudo")
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"account/edit", requestOptions)
  .then(response => {
    if(response.ok){
      return response.text()
    } else {
      alert("Les modifications n'ont pas pu être prises en compte.");
    }})
  .then(result => {
    alert("Vos informations ont bien été modifiées.");
    document.location.reload();
  })
  .catch((error) => console.error(error));
}

// Mail
inputMail.addEventListener("keyup", callMail);
saveNewMail.addEventListener("click", validateNewMail);

function callMail() {
  const mailOK = validateMail(inputMail);

  if(mailOK) {
    saveNewMail.disabled = false;
  } else {
    saveNewMail.disabled = true;
  }
}

function validateNewMail() {
  let dataForm = new FormData(mailForm);

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "email": dataForm.get("Email")
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"account/edit", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.text();
      } else {
        alert("Les modifications n'ont pas pu être prises en compte.");
      }
    })
    .then(result => {
      alert("Vos informations ont bien été modifiées.");
      document.location.reload();
    })
    .catch((error) => console.error(error));
}


// Password
inputPassword.addEventListener("keyup", callPassword);
inputValidationPassword.addEventListener("keyup", callPassword);
saveNewPassword.addEventListener("click", validateNewPassword);

function callPassword() {
  const passwordOK = validatePassword(inputPassword);
  const verifyPasswordOK = validateConfirmationPassword(inputPassword, inputValidationPassword);

  if(passwordOK && verifyPasswordOK) {
    saveNewPassword.disabled = false;
  } else {
    saveNewPassword.disabled = true;
  }
}

function validateNewPassword() {
  let dataForm = new FormData(passwordForm);

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "password": dataForm.get("MotDePasse")
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"account/edit", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.text();
      } else {
        alert("Les modifications n'ont pas pu être prises en compte.");
      }
    })
    .then(result => {
      alert("Vos informations ont bien été modifiées.");
      document.location.reload();
    })
    .catch((error) => console.error(error));
}


// Adress
inputAdress.addEventListener("keyup", callAdress); 
inputPostalCode.addEventListener("keyup", callAdress); 
saveNewAdress.addEventListener("click", validateNewAdress);

function callAdress() {
  const adressOK = validateRequired(inputAdress);
  const postalCodeOK = validatePostalCode(inputPostalCode);

  if(adressOK && postalCodeOK) {
    saveNewAdress.disabled = false;
  } else {
    saveNewAdress.disabled = true;
  }
}

function validateNewAdress() {
  let dataForm = new FormData(adressForm);

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "adress": dataForm.get("Adress"),
    "postal_code": dataForm.get("CodePostal")
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"account/edit", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.text();
      } else {
        alert("Les modifications n'ont pas pu être prises en compte.");
      }
    })
    .then(result => {
      alert("Vos informations ont bien été modifiées.");
      document.location.reload();
    })
    .catch((error) => console.error(error));
}


// Phone
inputPhoneNbr.addEventListener("keyup", validatePhoneNbr); 
saveNewPhone.addEventListener("click", validateNewPhone);

function callPhoneNumber() {
  const phoneNumberOK = validatePhoneNbr(inputPhoneNbr);

  if(phoneNumberOK) {
    saveNewPhone.disabled = false;
  } else {
    saveNewPhone.disabled = true;
  }
}

function validateNewPhone() {
  let dataForm = new FormData(phoneForm);

  const myHeaders = new Headers();
  myHeaders.append("X-AUTH-TOKEN", getToken());
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "phone_number": dataForm.get("Telephone")
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"account/edit", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.text();
      } else {
        alert("Les modifications n'ont pas pu être prises en compte.");
      }
    })
    .then(result => {
      alert("Vos informations ont bien été modifiées.");
      document.location.reload();
    })
    .catch((error) => console.error(error));
}




// General function
function validateRequired(input){
  if(input.value != ""){
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