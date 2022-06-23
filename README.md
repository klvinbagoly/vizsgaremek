# DiskHub CD-nyilvántartó alkalmazás
> Vizsgaremek feladat

***

## _Követelmények_


**Az alkalmazás:**

Adminisztrációs rendszer legyen (sablon használható)

**Követelmények:**

- MongoDB alapú, NoSQL - legalább 5 féle entitás legyen (pl.: termék, rendelés, vásárló, kiszállítás, számla).

- NodeJS API, saját maga által leprogramozott API szolgálja ki a frontendet - legalább 10 különböző végpont legyen (pl.: api/user, api/product, api/order …).

- Frontend Angular/React alapú - legalább 5 külön oldal legyen, model-service-component architektúra, Bootstrap/Material vagy egyéb sablon használata engedélyezett, reszponzív legyen. A felület bizonyos oldalai csak belépés után legyenek elérhetőek (JWT-autentikáció).

- Clean kód elveit kövesse az alkalmazás összes eleme.

- Minden API útvonalhoz legalább egy tesztet kell írni. Legalább 1-1 Unit/Integrációs teszt.

- Swagger alapú dokumentáció az API-hoz.

- Markdown dokumentáció a repository-ban, tartalmazza az alkalmazás telepítését, konfigurálását, célját.

- Dockerizálva legyen a kész alkalmazás, konténerből legyen futtatható.

***
## _Felhasználói történetek_

### Főoldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném elérni az elérhető aloldalakat | hogy könnyedén navigáljak az oldalon. | Reszponzív menüsáv, amely minden aloldalon megjelenik.|
| Felhasználóként | szeretném látni a legnépszerűbb előadókat | hogy képet kapjak az aktuális trendekről. | Információk a 10 legnépszerűbb előadóról kártya formában, egy-egy képpel. |
| Adminként  | szeretnék bejelentkezni az oldalra | hogy tudjam szerkeszteni az adatokat. | Bejelentkezési felület egy felugró ablakkal. |

### Összes előadó oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni az összes előadót | hogy ki tudjam választani a kedvencemet. | Lista az összes előadóról, amely klikkelésre átvezet az adott előadó oldalára. |
| Adminként | szeretnék új előadót hozzáadni | hogy kiegészítsem az adatbázist az újonnan elérhető előadókkal. | Új előadó hozzáadása gomb (admin bejelentkezés esetén), amely átirányít az új előadó felvétele oldalra. |
| Adminként | szeretném szerkeszteni a meglévő előadókat | hogy kijavítsam/kibővítsem az előadó adatait. | Módosítás gomb (admin bejelentkezés esetén), amely átirányít az előadó szerkesztése oldalra. |
| Adminként | szeretnék egy előadót törölni | hogy a már nem elérhető előadók ne szerepeljenek az adatbázisban. | Törlés gomb (admin bejelentkezés esetén), amely megerősítés után törli az előadót. |

### Egy előadó oldal

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni az előadót leginkább jellemző műfaj/stílusokat | hogy nagyjából képet kapjak az előadóról. | Előadóhoz tartozó címkék megjelenítése |
| Felhasználóként | szeretném látni az előadó legnépszerűbb albumait | hogy át tudjak navigálni az adott album oldalára. | Előadó legnépszerűbb albumai, amelyek klikkelésre átvisznek az album oldalára. |
| Adminként | szeretném szerkeszteni az előadó címkéit | hogy a felhasználó képet kapjon az előadóról. | Címkék szerkesztése gomb (admin bejelentkezés esetén), amely átirányít a címkék szerkesztése oldalra. |
| Adminként | szeretnék új albumot hozzáadni | hogy kiegészítsem az adatbázist az újonnan elérhető albumokkal. | Új album hozzáadása gomb (admin bejelentkezés esetén), amely átirányít az új album felvétele oldalra. |
| Adminként | szeretném szerkeszteni a meglévő albumokat | hogy kijavítsam/kibővítsem az album adatait. | Módosítás gomb (admin bejelentkezés esetén), amely átirányít az album szerkesztése oldalra. |
| Adminként | szeretnék egy albumot törölni | hogy a már nem elérhető albumok ne szerepeljenek az adatbázisban. | Törlés gomb (admin bejelentkezés esetén), amely megerősítés után törli az albumot. |

### Egy album oldala

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretném látni az album adatait | hogy képet kapjak az albumról. | Album adatainak megjelenítése, esetleg képpel |
| Adminként | szeretném szerkeszteni az album adatait | hogy a felhasználó képet kapjon az albumról | Módosítás gomb (admin bejelentkezés esetén), amely átirányít az album szerkesztése oldalra. |

### Műfaj leírása

| Felhasználó személye | Tevékenység | Haszon | Elfogadási kritérium |
| --- | --- | --- | --- |
| Felhasználóként | szeretnék látni egy rövid leírást a műfajról | hogy megismerjem jobban az adott műfajt. | Műfaj leírása |
| Adminként | szeretném szerkeszteni a műfaj leírását | hogy a felhasználó jobban képet kapjon a műfajról | Módosítás gomb (admin bejelentkezés esetén), amely átirányít a műfaj szerkesztése oldalra. |

## _A projekt egyéb adatai_

#### Prioritás: 
> **magas**

#### Megvalósítási idő: 
> **34 nap** *(2022. május 24-2022. június 27.)*

#### Továbbfejlesztési lehetőségek:

- Rákeresés, szűrés lehetősége
- Adatok rendezése mezők szerint
- Regisztráció lehetősége

## _Dokumentáció_

[A dokumentáció itt érhető el.](https://github.com/klvinbagoly/vizsgaremek/blob/main/DOCUMENTATION.md)