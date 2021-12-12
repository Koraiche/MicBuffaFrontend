# AssignmentApp : ona rajouté 20 fonctionnalités
Done by Fahd KORAICHE & Naoufal REMZAN
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## 1.
On a ajouté bootstrap et un navbar contenant toutes les routes accesibles au utilisateurs connecté(selon son role+droits).
## 2.
On a Rendu la présentation plus jolie, notamment  les assignments dans une table angular material, avec l'élément paginator pour faire la pagination.
## 3.
On a implementé un deuxieme exemple sur la meme page, notamment  les assignments dans une table angular material de hauteur fixe, qui scrolle les éléments, mais qui laisse le header fixe("sticky row")
## 4.
Dans le table a gauche(exemple du paginator) on a les colonnes triables (juste sur la vue, on n'envoie pas de requêtes...)
## 5.
Ona rajouté le surlignage de la ligne sur laquelle on déplace la souris (dans les deux exemple paginator et sticky row)
## 6.
Dans l'exemple  a droite on a afficher une icône dans une colonne supplémentaire à droite, et quand on clique dessus on a le détail. 
## 7.
Dans l'exemple  a droit on a rajouté une colonne supplémentaire dans le tableau qui présente la liste, et si on clique dessus ça supprime directement (sans passer par le détail)
## 8.
On a utilisé le Dialog Angular Material, pour ajouter un DIALOGUE qui demande a l'admin est-ce qu'il est sure de vouloir supprimer un element.
## 9.
Ona utiliseé le composant angular material Snack Bar pour afficher les messages qu'on affiche dans la console ("assignments recuperés ","assignment ajouté", "supprimé").
## 10.
On a géreé la connexion login/password avec des variables ( ona l'a fait meme dans le backend avec JWT ou elle etait fonctionnelle, mais dans Heroku ca n'a pas fonctinné)
## 11.
On a codé une interface graphique de connexion
## 12.
On a codé une interface graphique d'inscription
## 13.
On a codé une fonction/route  de deconnexion
## 14.
On a codé une interface graphique de reception
## 15.
On a codé une interface graphique de perte(route not found, elle fonctionne que si on est connecté sinon on est redirigé vers la reception)
## 16.
En haut de l'écran, un bouton "deconnexion" qui n'apparait que si on est connecté, 
## 17.
En haut de l'écran, un bouton "connexion" qui apparait que si on n'est pas connecté. 
## 18.
En haut de l'écran, text "nom prenom user" qui apparait que si on est connecté. 
## 19.
On ne pourra editer et supprimer un assignment que si on est connecté en admin. Les boutons serons grisés pour ne pas proposer l'option si on n'a pas le droit. 
## 20.
ona rajouté des composants material dans toutes les pages(edit assignments, add asginments, login, signup ...)
