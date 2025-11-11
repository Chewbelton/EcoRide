import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    /* Routes par défaut : acceuil, connexion, inscription et contact */
    new Route("/", "Accueil", "./src/pages/home.html", []),
    new Route("/signin", "Connexion", "./src/pages/auth/signin.html", ["disconnected"], "./src/js/auth/signin.js"),
    new Route("/signup", "Inscription", "./src/pages/auth/signup.html", ["disconnected"], "./src/js/auth/signup.js"),
    new Route("/contacts", "Contacts", "./src/pages/contacts.html", []),
    new Route("/page-test", "Page test", "./src/pages/page-test.html", [], "./src/js/page-test.js"),

    /* Création de compte, voiture, covoiturage */
    new Route("/moncompte", "Mon compte", "./src/pages/user-data/moncompte.html", ["connected", "driver", "employee", "admin"], "./src/js/user-data/moncompte.js"),
    new Route("/newvehicle", "Mon véhicule", "./src/pages/user-data/newvehicle.html", ["connected", "driver", "employee", "admin"], "./src/js/user-data/newvehicle.js"),
    new Route("/newtrip", "Créer un trajet", "./src/pages/user-data/newtrip.html", ["connected", "driver", "employee", "admin"], "./src/js/user-data/newtrip.js"),  // WARNING !!! GET BACK TO THIS LINE AFTER TEST

    /* Chercher et valider un trajet */
    new Route("/choixtrajet", "Covoiturages", "./src/pages/choixtrajet.html", []),
    new Route("/detailtrajet", "Détail du trajet", "./src/pages/detailtrajet.html", [])
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";


/*

[] -> Tout le monde peut y accéder
["disconnected"] -> Réserver aux utilisateurs déconnecté 
["client"] -> Réserver aux utilisateurs avec le rôle client 
["admin"] -> Réserver aux utilisateurs avec le rôle admin 
["admin", "client"] -> Réserver aux utilisateurs avec le rôle client OU admin

*/