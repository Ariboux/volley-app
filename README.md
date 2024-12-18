# Volley App Full Stack

Ce projet est une application mobile React Native accompagnée d'une API en Python/Flask. Elle permet de suivre une équipe de volley-ball dans sa ligue et son groupe. À terme, elle offrira diverses fonctionnalités pour enrichir l'expérience des amateurs de volley.

## Fonctionnalités actuelles

- Sélection d'une équipe et d'un groupe à partir d'une liste.
- Affichage du classement de l'équipe dans son groupe.

## Fonctionnalités à venir

1. **Sélection de la ligue et de l'équipe :**
   - Interface fluide pour choisir sa ligue et son équipe.
2. **Accueil :**
   - Affichage des matchs passés et à venir de l'équipe.
3. **Exploration des matchs :**
   - Vue détaillée des prochains matchs d'une équipe ou d'une ligue.
   - Accès à l'itinéraire vers le lieu d'un match en un clic.
4. **Ajout au calendrier :**
   - Ajout rapide des matchs à venir dans n'importe quel calendrier avec tous les détails (lieu, horaires, marges).
5. **Classement interactif :**
   - Accès au classement détaillé avec interactions dynamiques.

---

## Organisation du projet

### Structure des dossiers

```
volley-app/
├── client/  # Code React Native
│   ├── src/  # Sources de l'application mobile
│   ├── assets/  # Images, polices, etc.
│   ├── components/  # Composants de l'application
│   ├── constants/  # Constantes de l'application
│   ├── hooks/  # Hooks personnalisés
│   ├── scripts/  # Scripts utiles (p)
│   ├── .gitignore  # Configuration Git locale
│   ├── app.json  # Configuration Expo
│   ├── package.json  # Dépendances Node.js
│   ├── package-lock.json  # Verrouillage des dépendances
│   ├── objectifs.txt  # Liste des fonctionnalités à ajouter
│   └── README.md  # Documentation du client
├── server/  # API Flask pour le scraping
│   ├── app.py  # Serveur principal
│   ├── requirements.txt  # Dépendances Python
│   ├── .gitignore  # Configuration Git locale
│   └── README.md  # Documentation du serveur
├── start-linux.sh  # Script pour lancer les projets sous Linux
├── start-windows.bat  # Script pour lancer les projets sous Windows
└── README.md  # Documentation du projet
```

### Scripts importants

- **Windows** : `start-windows.bat` pour démarrer à la fois le client et le serveur.
- **Linux** : `start-linux.sh` pour démarrer à la fois le client et le serveur.

---

## Installation et configuration

### Prérequis

- **Node.js** : pour exécuter le client React Native.
- **Python 3** : pour exécuter le serveur Flask.
- **Expo CLI** : pour gérer le projet React Native.

### Étapes d'installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Ariboux/my-volley-app.git
   cd volley-app
   ```

2. Installez les dépendances du client :

   ```bash
   cd client
   npm install
   ```

3. Installez les dépendances du serveur :

   ```bash
   cd server
   pip install -r requirements.txt
   ```

<!-- 4. Configurez les variables d'environnement :
   - **Client** : Ajoutez un fichier `.env` dans `client/` avec vos configurations React Native.
   - **Serveur** : Ajoutez un fichier `.env` dans `server/`. -->

---

## Lancement

### Windows

Double-cliquez sur `start-windows.bat` pour lancer le projet.

### Linux

Exécutez le script suivant :

```bash
./start-linux.sh
```

---

## Contribution

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b votre_nom-fonctionnalite
   ```
3. Faites vos modifications et commitez-les :
   ```bash
   git commit -m "Ajout de la fonctionnalité X"
   ```
4. Poussez votre branche :
   ```bash
   git push origin votre_nom-fonctionnalite
   ```
5. Ouvrez une Pull Request.

---

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.

---

## Auteur

Développé par Adrien.
