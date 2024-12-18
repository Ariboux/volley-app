from flask import Flask, jsonify
import requests
import pdfplumber
from io import BytesIO
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/teams', methods=['GET'])
def get_teams():
    try:
        url = "https://www.ffvbbeach.org/ffvbapp/adressier/engag_division_aff.php?divisions=ISM&wss_codent=PTIDF94"
        response = requests.get(url)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        
        teams = []
        tables = soup.find_all('table')
        if len(tables) < 3:
            raise Exception("Moins de 3 tables trouvées dans le HTML")
        
        rows = tables[2].find_all('tr')

        for row in rows[2:-1]:
            cells = row.find_all('td')
            if len(cells) > 3:
                group = cells[0].get_text(strip=True)
                id = cells[1].get_text(strip=True)
                name = cells[3].get_text(strip=True)
                teams.append({
                    "group": group,
                    "id": id,
                    "name": name
                })
        
        return jsonify(teams)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/classment/<group>', methods=['GET'])
def get_classement(group="ARL"):
    try:
        url = "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2024/2025&codent=PTIDF94&poule=" + group
        response = requests.get(url)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        
        classement = []
        tables = soup.find_all('table')
        if len(tables) < 3:
            raise Exception("Moins de 3 tables trouvées dans le HTML")
        
        rows = tables[2].find_all('tr')
        
        for row in rows[1:]:
            cells = row.find_all('td')
            if len(cells) > 0:
                rank = float(cells[0].get_text(strip=True))
                team = cells[1].get_text(strip=True)
                points = int(cells[2].get_text(strip=True))
                games = int(cells[3].get_text(strip=True))
                games_won = cells[4].get_text(strip=True)
                games_won = 0 if games_won == '' else int(games_won)
                games_lost = cells[5].get_text(strip=True)
                games_lost = 0 if games_lost == '' else int(games_lost)

                classement.append({
                    "rank": rank,
                    "team": team,
                    "points": points,
                    "games": games,
                    "games_won": games_won,
                    "games_lost": games_lost
                })
        
        return jsonify(classement)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/calendar/<team>', methods=['GET'])
def get_calendar_team(team):
    try:
        url = "https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=2024/2025&codent=PTIDF94&poule=ARL&equipe=" + team
        response = requests.get(url)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        
        calendar = []
        tables = soup.find_all('table')
        if len(tables) < 4:
            raise Exception("Moins de 4 tables trouvées dans le HTML")

        rows = tables[3].find_all('tr')

        for row in rows[1::2]:
            cells = row.find_all('td')
            if len(cells) > 6:
                date = cells[1].get_text(strip=True)
                time = cells[2].get_text(strip=True)
                team1 = cells[3].get_text(strip=True)
                team2 = cells[5].get_text(strip=True)
                calendar.append({
                    "date": date,
                    "time": time,
                    "team1": team1,
                    "team2": team2
                })
        
        return jsonify(calendar)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/gym/<match>', methods=['GET'])
def get_gym(match):
    try:
        url = "https://www.ffvbbeach.org/ffvbapp/adressier/fiche_match_ffvb.php"
        data = {
            "wss_saison": "2024/2025",
            "codmatch": match,
            "codent": "PTIDF94"
        }
        response = requests.post(url, data=data)
        response.raise_for_status()
        pdf_file = BytesIO(response.content)
        with pdfplumber.open(pdf_file) as pdf:
            text = "".join(page.extract_text() for page in pdf.pages)
        text = text.split("Salle")[1].split("Arbitre")[0].split('Tél.')[0].replace("\n", " ").strip()
        return jsonify({"gym": text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
