import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    /* Routes par défaut : acceuil, connexion, inscription et contact */
    new Route("/", "Accueil", "./src/pages/home.html", []),
    new Route("/signin", "Connexion", "./src/pages/auth/signin.html", ["disconnected"], "./src/js/auth/signin.js"),
    new Route("/signup", "Inscription", "./src/pages/auth/signup.html", ["disconnected"], "./src/js/auth/signup.js"),
    new Route("/contacts", "Contacts", "./src/pages/contacts.html", []),

    /* Création de compte, voiture, covoiturage */
    new Route("/mon-compte", "Mon compte", "./src/pages/user-data/mon-compte.html", ["connected", "driver", "employee", "admin"], "./src/js/user-data/driver-role.js"),
    new Route("/new-vehicle", "Mon véhicule", "./src/pages/user-data/new-vehicle.html", ["connected", "driver", "employee", "admin"], "./src/js/user-data/new-vehicle.js"),
    new Route("/new-trip", "Créer un trajet", "./src/pages/user-data/new-trip.html", ["connected", "driver", "employee", "admin"], "./src/js/user-data/new-trip.js"),

    /* Chercher et valider un trajet */
    new Route("/choix-trajet", "Covoiturages", "./src/pages/choix-trajet.html", []),
    new Route("/detail-trajet", "Détail du trajet", "./src/pages/detail-trajet.html", [])
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