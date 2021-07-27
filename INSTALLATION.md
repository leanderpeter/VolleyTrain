# Installationsanleitung

## Client-Seite 
Der Client baut auf einem React-Frontend auf, welches mit create-react-app gebootstrapt wurde. Der Quellcode des React-Clients liegt im Verzeichnis `/volleytrain`.

### Was wird vorab benötigt?
1. Node.js (siehe https://nodejs.org/ oder Installation via [Homebrew](https://brew.sh) 

Vor dem Start des Entwicklungsservers müssen die Dependencies installiert werden. Dies erfolgt über das Kommando `npm install` im Terminal. Unteranderem werden folgende Abhängigkeiten installiert:
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Material-UI](https://material-ui.com)
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)

### Wie wird der Development-Server gestartet?
React bringt einen eignen Development-Server mit, mit welchem zur Echtzeit der React-Code in JavaScript übersetzt wird. Dies erfolgt im Hintergrund auf Basis von [Babel](https://babeljs.io), einem JavaScript Compiler.

Der Dev-Server wird in einem Terminal im frontend mit dem Kommando `npm start` gestartet. Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.

### Deployment auf den flask-Server
Soll die React-App für ein Deployment unter flask bereit gemacht werden, wird im Terminal mit dem Kommando `npm run build` die App produktionsreif und performanzoptimiert in dem Vereichnis `/volleytrain/build` zur Verfügung gestellt. 

Die React-App ist für ein Deployment im flask Verzeichnis `/volleytrain` konfiguriert (in der Datei `package.json` im Key `homepage`). Daher muss der Inhalt des Ordner `/volleytrain/build/` in `/src/` manuell kopiert werden.

Zur Beachtung: Die Verzeichnisse 
- `/volleytrain/build/` und 
- `/static/reactclient`
sind in der Datei `.gitignore` enthalten, so dass keine Kompilate im Repository abgelegt werden.


## Server/Service-Seite
Die Server-Seite baut auf Python, Flask sowie RestX auf.

### Was wird vorab benötigt? (Installation über Packages in PyCharm oder beispielsweise pip)
1. Aktuelle Python-Installation (siehe python.org)
2. Flask (darin enthalten sind auch *Werkzeug* und *Jinja*)
3. flask-restx
4. flask-cors 
5. google-auth
6. requests
7. mysql-connector-python
8. pytest

Flask, flask-restx und flask-cors müssen für die Python-Installation erreichbar sein. 
Hierzu kann ```pip``` verwendet werden. Einfacher geht es, wenn man PyCharm
installiert hat, sich im Projekt ein Virtual Environment anlegt und darin dann
zunächst das Package ```flask``` und danach ```flask-restx``` und ```flask-cors``` 
installiert. Diese Packages ziehen die Installation weiterer Packages nach sich.
```google-auth``` und ```requests``` werden für Firebase Authentication benötigt (vgl.
Module ```SecurityDecorator.py```).

### Wie wird der Server gestartet?
Derzeit ist die Datei ```main.py``` auszuführen, mehr nicht. Natürlich setzt dies ein
ordentlich installiertes Environment voraus (s.o.). Unter PyCharm genügt der Rechtsklick
auf die Datei ```main.py``` und die Auswahl von ```Run 'main'```. Der Start des 
Development Server kann in der PyCharm Console beobachtet werden. Anschließend kann man
auf die Dienste zugreifen.
