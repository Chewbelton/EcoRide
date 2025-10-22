const inputEmail = document.getElementById('emailInput');
const inputPassword = document.getElementById('passwordInput');
const btnSignIn = document.getElementById('bouttonSignIn');
const signInForm = document.getElementById('signInForm');

btnSignIn.addEventListener('click', checkCredentials);

function checkCredentials() {
  // Pour l'instant, credentials en "dur" qu'il faudra récupérer plus tard via l'API

  let dataForm = new FormData(signInForm);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "username": dataForm.get("Email"),
    "password": dataForm.get("MotDePasse")
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl+"login", requestOptions)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        inputEmail.classList.add("is-invalid");
        inputPassword.classList.add("is-invalid");
      }
    })
    .then(result => {
      inputEmail.classList.add("is-valid");
      inputPassword.classList.add("is-valid");

      const token = result.api_token;
      setToken(token);
      setCookie(roleCookieName, result.roles[0], 7);

      window.location.replace("/"); 
    })

    .catch((error) => console.error(error));
}