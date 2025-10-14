import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "./src/pages/home.html", []),
    new Route("/connexion", "Connexion", "./src/pages/auth/signin.html", ["disconnected"], "./src/js/auth/signin.js"),
    new Route("/inscription", "Inscription", "./src/pages/auth/signup.html", ["disconnected"], "./src/js/auth/signup.js"),
    new Route("/contacts", "Contacts", "./src/pages/contacts.html", []),
    new Route("/mon-compte", "Mon compte", "./src/pages/mon-compte.html", ["passenger", "driver", "employee", "admin"]),
    new Route("/choix-trajet", "Covoiturages", "./src/pages/choix-trajet.html", []),
    new Route("/detail-trajet", "Détail du trajet", "./src/pages/detail-trajet.html", [])
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";