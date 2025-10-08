import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "./pages/home.html"),
    new Route("/connexion", "Connexion", "./pages/connexion.html"),
    new Route("/inscription", "Inscription", "./pages/inscription.html"),
    new Route("/contacts", "Contacts", "./pages/contacts.html"),
    new Route("/mon-compte", "Mon compte", "./pages/mon-compte.html"),
    new Route("/choix-trajet", "Covoiturages", "./pages/choix-trajet.html"),
    new Route("/detail-trajet", "Détail du trajet", "./pages/detail-trajet.html")
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";