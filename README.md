Projet EcoRide

Application/site de covoiturage écologique, pour voyager en limitant au maximum les émissions de carbone.

Pour utiliser cette application, vous devez installer Bootstrap via npm :

npm install bootstrap@5.2.3


Cette application utilise également Symfony, via Composer. Téléchargez Composer ici : https://getcomposer.org/download/, et installez les différents packages nécessaire à l'application :

•	composer require symfony/orm-pack : installation de Doctrine, notamment pour la gestion des relations classe / entité sur Symfony ;
•	composer require --dev symfony/maker-bundle : pour faciliter la création d’entités ;
•	composer require symfony/serializer-pacK : pour permettre la sérialisation des données et donc l’échange entre le serveur et le client ;
•	composer require symfony/security-bundle : pour la création d’un système d’authentification, et garantir un minimum de sécurité
