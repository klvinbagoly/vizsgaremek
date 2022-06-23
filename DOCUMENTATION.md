## **1. Az alkalmazás célja**

- A DiskHub alkalmazás feladata, hogy zenei előadók, albumok, zeneszámok, valamint műfajleírások adatait nyilvántartsa és kezelje.

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát: 
  https://github.com/klvinbagoly/vizsgaremek   

- A célgépre le kell klónozni az adott GitHub repository tartalmát: 
  ```sh
  git clone https://github.com/klvinbagoly/vizsgaremek.git
  ```
- Telepíteni kell az alkalmazás függőségeit:
  - Be kell lépni a vizsgaremek/backend mappába, és ki kell adni az `npm i` parancsot:
  ```sh
  cd vizsgaremek/backend
  npm i
  ```
  - Be kell lépni a vizsgaremek/frontend mappába, és ki kell adni az `npm i` parancsot:
  ```sh
  cd ../frontend
  npm i
  ```
- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal   


## **3. Az alkalmazás konfigurálása**

A /frontend/environments mappában be van állítva az API-végpont elérési útvonala, a http://localhost:3000/ , ezzel nincs semmi teendő. 
  - _environment.ts_ állomány: http://localhost:3000/ 
  - _environment.prod.ts_ állomány: http://localhost:3000/ 

## **4. Az alkalmazás indítása**
- A terminálban ki kell adni az `ng build` parancsot   
- A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába  
- A frontend mellett a backend mappát is meg kell nyitni párhuzamosan, és mindkettőben kiadni az `npm start` parancsot
### Vagy 
- El kell indítani a Docker Desktop alkalmazást
- A terminálon be kell lépni a /backend mappába és futtatni az `npm run deploy` parancsot 


_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros kell (példa):  
E-mail | Jelszó | Szerepkör
------------ | ------------- | -----------
ghurlestone0@sitemeter.com | pass123 | Felhasználó
kjzak1@chronoengine.com | pass123 | Admin

## **5. A végpontok dokumentációja**

Swagger-dokumentáció:
- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api-docs

---
---

## _Linkek:_


 [Felhasználói történetek - User Story](https://github.com/klvinbagoly/vizsgaremek/blob/main/README.md)


