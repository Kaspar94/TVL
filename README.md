# TVL ( Tagastuste Vormistamise Lahendus )

TVL'i kasutusjuhend: https://docs.google.com/document/d/1489TDJBvDBAZWvpk4rNomsg-zlUw0NH-uMfw5wkASls/edit?usp=sharing

# Running application locally

1. Download [Node.js](https://nodejs.org/en/) (LTS)
2. Clone git repository `git clone https://github.com/Kaspar94/TVL.git`
3. Go to project folder `cd TVL`
4. Install front-end dependencies `npm install`
5. Build front-end app `npm run build`
6. Go to server folder `cd server`
7. Install server dependencies `npm install`
8. Create file `password.json` at `./TVL/server/api/data/`, and fill it with `{"username" : "", "password" : ""}`. This is used by `xmlController` to authenticate itself at Omniva infosystems. Command on Ubuntu for lazy people `echo "{\"username\" : \"\", \"password\" : \"\"}" > api/data/password.json` 
8. Launch server Windows: `node server.js`, Ubuntu: `sudo node server.js` or `PORT=8080 node server.js`, default port is `80`
9. Open browser and type `localhost` or `localhost:8080` if you set port to 8080
10. To stop the server, use `Ctrl+C`


# Käsud rakenduse üles seadmiseks linux masinal

* Installida nodejs ning npm(on kaasas Node pakiga): https://nodejs.org/en/download/
 VÕI
 `apt-get install npm`
 `apt-get install nodejs-legacy`

# TVL kaustas
Kui server teisiti ümber pole seadistatud, kasutada iga käskluse ees sudo.

* `npm install -g @angular-cli` (installib angulari)
* `npm install` (installib angularile vajalikud teegid)
* `ng build --env=prod`

# TVL/server kaustas

* `npm install` (installib nodele vajalikud teegid)

* `NODE_ENV=prod node server.js` (käivitab serveri)

# Rollid
 
* Klient - saab tagastada toodet
* Haldaja/administraator - saab lisada/muuta/eemaldada ärikliente. 

