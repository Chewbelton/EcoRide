import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "./pages/home.html"),
    new Route("/choix-trajet", "Covoiturages", "./pages/choix-trajet.html"),
  ];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";