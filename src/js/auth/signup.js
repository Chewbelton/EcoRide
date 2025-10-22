//Implémenter le JS de ma page

const inputFirstName = document.getElementById("firstNameInput");
const inputMail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const inputValidationPassword = document.getElementById("validatePasswordInput");
const btnValidate = document.getElementById("bouttonSignUp");
const signUpForm = document.getElementById("signUpForm");

inputFirstName.addEventListener("keyup", validateForm); 
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
bouttonSignUp.addEventListener("click", validateRegistration);

//Function permettant de valider tout le formulaire
function validateForm(){
  const firstNameOK = validateRequired(inputFirstName);
  const mailOK = validateMail(inputMail);
  const passwordOK = validatePassword(inputPassword);
  const confirmPasswordOK = validateConfirmationPassword(inputPassword, inputValidationPassword);

  if(firstNameOK && mailOK && passwordOK && confirmPasswordOK) {
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

function validateMail(input){
  //Définir mon regex
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
    //Définir mon regex
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
        alert("Erreur lors de l'inscription. Un compte existe déjà avec cette adresse mail.");
      }
    })
    .then(result => {
      alert("Félicitations ! Votre compte est désormais créé. Vous pouvez vous connecter.");
      document.location.href="/signin";
    })
    .catch((error) => console.error(error));
}

