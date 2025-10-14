const inputEmail = document.getElementById('emailInput');
const inputPassword = document.getElementById('passwordInput');
const btnSignIn = document.getElementById('bouttonSignIn');

btnSignIn.addEventListener('click', checkCredentials);

function checkCredentials() {
  // Pour l'instant, credentials en "dur" qu'il faudra récupérer plus tard via l'API

  if(inputEmail.value == 'test@email.com' && inputPassword.value == 'Test-123') {
    inputEmail.classList.add("is-valid");
    inputPassword.classList.add("is-valid");
    const token = "tuesconnecteCestLeBonCOOKIE";
    setToken(token);

    // ici, on a attribué un rôle par défaut. Ce rôle doit en réalité être déterminé en fonction de l'utilisateur qui se connecte. Ce sera fait plus tard
    setCookie(roleCookieName, 'admin', 7);

    window.location.replace("/"); 
  } else {
    inputEmail.classList.add("is-invalid");
    inputPassword.classList.add("is-invalid");
  }
}