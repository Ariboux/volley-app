# Volleyball Team Management API

Ce projet est une API Flask permettant de gérer et de consulter des informations sur les équipes de volleyball, les classements et les matchs. Elle s'appuie sur des données extraites dynamiquement de pages web et de fichiers PDF.

## Fonctionnalités
1. **Gestion des équipes**
   - Récupération des équipes avec leurs groupes, identifiants et noms.

2. **Classements**
   - Affichage du classement d'un groupe avec des détails comme les points, les matchs joués, les matchs gagnés/perdus.

3. **Calendrier des matchs**
   - Consultation des prochains matchs d'une équipe avec date, heure, et noms des équipes.

4. **Lieu d'un match**
   - Extraction des informations sur le gymnase d'un match depuis un fichier PDF.

## Endpoints disponibles
### `GET /api/teams`
- **Description :** Récupère la liste des équipes disponibles dans la ligue.
- **Exemple de réponse :**
  ```json
  [
    {
      "group": "ARL",
      "id": "123",
      "name": "Team A"
    },
    {
      "group": "BRL",
      "id": "456",
      "name": "Team B"
    }
  ]
  ```

### `GET /api/classment/<group>`
- **Description :** Récupère le classement des équipes pour un groupe donné.
- **Paramètre :** `group` (Code du groupe, ex : ARL).
- **Exemple de réponse :**
  ```json
  [
    {
      "rank": 1,
      "team": "Team A",
      "points": 42,
      "games": 10,
      "games_won": 8,
      "games_lost": 2
    }
  ]
  ```

### `GET /api/calendar/<team>`
- **Description :** Récupère les prochains matchs d'une équipe donnée.
- **Paramètre :** `team` (Nom ou identifiant de l'équipe).
- **Exemple de réponse :**
  ```json
  [
    {
      "date": "2024-01-01",
      "time": "14:00",
      "team1": "Team A",
      "team2": "Team B"
    }
  ]
  ```

### `GET /api/gym/<match>`
- **Description :** Récupère les informations du lieu d'un match spécifique.
- **Paramètre :** `match` (Identifiant du match).
- **Exemple de réponse :**
  ```json
  {
    "gym": "Gymnase Municipal, 123 Rue du Sport, Paris"
  }
  ```

## Installation et configuration
1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/Ariboux/my-volley-app.git
   cd my-volley-app/server
   ```

2. **Créer un environnement virtuel :**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Pour Linux/Mac
   venv\Scripts\activate     # Pour Windows
   ```

3. **Installer les dépendances :**
   ```bash
   pip install -r requirements.txt
   ```

4. **Lancer le serveur :**
   ```bash
   python app.py
   ```
   L'API sera disponible à l'adresse `http://0.0.0.0:5000`.

## Dépendances
- **Flask :** Framework web léger pour Python.
- **Requests :** Pour effectuer des requêtes HTTP.
- **PDFPlumber :** Pour extraire du texte de fichiers PDF.
- **BeautifulSoup :** Pour parser et analyser du HTML.

## Utilisation
Vous pouvez interagir avec l'API en utilisant des outils comme [Postman](https://www.postman.com/) ou `curl`. Par exemple :
```bash
curl http://localhost:5000/api/teams
```

## Auteur
Développé par [Adrien](https://github.com/Ariboux)