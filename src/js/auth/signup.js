// On enregistre d'abord les différents champs dans des variables grâce à leur ID

const inputPseudo = document.getElementById("pseudo");
const inputMail = document.getElementById("mail");
const inputPassword = document.getElementById("password");
const inputVerifPassword = document.getElementById("verify-password");
const btnValidate = document.getElementById("boutton-validation-inscription");

// Ajoute une eventListener -> keyup pour chaque élément input du form
inputPseudo.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputVerifPassword.addEventListener("keyup", validateForm);

// Appliquer la fonctions à chaque élément input
function validateForm() {
  const pseudoOK = validateRequired(inputPseudo);
  const mailOK = validateMail(inputMail);
  const passwordOK = validatePassword(inputPassword);
  const verifPasswordOK = validateConfirmationPassword(inputPassword, inputVerifPassword);
  
  if(pseudoOK && mailOK && passwordOK && verifPasswordOK) {
    btnValidate.disabled = false;
  } else {
    btnValidate.disabled = true;
  }

}

// Cette fonction convient uniquement pour les champs "textes" étant required -> ne devant pas être vides
function validateRequired(input) {
  if(input.value != "") {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid"); 
    input.classList.remove("is-valid");
    return false;
  }
}

// Fonction pour checker la validité des emails
function validateMail(input){
  //Définir mon regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailUser = inputMail.value;
  if(mailUser.match(emailRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  }
  else{
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

// Fonction pour checker la validité du mot de passe
function validatePassword(input){
  //Définir mon regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  const passwordUser = inputPassword.value;
  if(passwordUser.match(passwordRegex)){
    input.classList.add("is-valid");
    input.classList.remove("is-invalid"); 
    return true;
  }
  else{
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

// Confirmer le mot de passe

function validateConfirmationPassword(inputPwd, inputVerifPwd){
    if(inputPwd.value == inputVerifPwd.value){
        inputVerifPwd.classList.add("is-valid");
        inputVerifPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputVerifPwd.classList.add("is-invalid");
        inputVerifPwd.classList.remove("is-valid");
        return false;
    }
}