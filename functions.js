 /**
 * 
 * @param {td-th} tag 
 * @param {string} inner 
 * @param {HTMLTableRowElement} parent 
 * @returns {HTMLTableCellElement}
 */
function createTableCell(tag, inner, parent){
    const temporary = document.createElement(tag); // Új elem létrehozása a megadott típussal
    temporary.innerHTML = inner; // Az elem belső HTML tartalmának beállítása
    parent.appendChild(temporary); // Az új elemet hozzáadjuk a szülő elemhez
    return temporary // Visszaadjuk a létrehozott elemet
}

//szeretnénk létrehozni egy html elementet és utána adni neki egy ID-t
//végül szerretnénk appendchild-olni
/**
 * 
 * @param {string} tagName 
 * @param {string} ID 
 * @param {HTMLElement} parent 
 */
function createHTMLElement(tagName, ID, parent){
    const element = document.createElement(tagName); // Új elem létrehozása a megadott típussal
    element.id = ID; // Az elem azonosítójának beállítása
    parent.appendChild(element); // Az új elemet hozzáadjuk a szülő elemhez
}

//szeretnénk létrehozni egy html elementet és utána adni neki egy ID-t
//végül szerretnénk appendchild-olni
/**
 * 
 * @param {string} tagName 
 * @param {string} ID 
 * @param {String} parentID
 */
function createHTMLElementWithParentID(tagName, ID, parentID){
    const parentElement = document.getElementById(parentID); // A szülő elem keresése az azonosító alapján
    if(parentElement != undefined){ // Ellenőrizzük, hogy a szülő elem létezik-e
        createHTMLElement(tagName, ID, parentElement); // Ha igen, létrehozzuk az új elemet
    }

}

//elkérjük a tableHeaderRow-t id szerint
/**
 * 
 * @param {string} tableHeaderRowId 
 */
function createTableHeaderCell(tableHeaderRowId){
    const tableHeaderRow = document.getElementById(tableHeaderRowId) // A sor (tr) keresése a megadott azonosító alapján
    createTableCell("th", "Lastname", tableHeaderRow); // Vezetéknév fejléc cella létrehozása
    const th_firstname = createTableCell("th", "Firstname", tableHeaderRow); // Keresztnév fejléc cella létrehozása
    createTableCell("th", "Pet", tableHeaderRow); // Házas fejléc cella létrehozása
    createTableCell("th", "Married", tableHeaderRow); // Állat fejléc cella létrehozása
    th_firstname.colSpan = 2; // A Keresztnév fejléc cella szélességének beállítása (lehet 2 firstname de csak egy oszlop van nekik)
}

/**
 * 
 * @param {array} personArray 
 */
function renderTable(personArray){
    const tbody = document.getElementById("persontbody"); // A táblázat "body"-jának keresése
    tbody.innerHTML = ''; // A meglévő tartalom törlése
    for(const pers of personArray){ // Az array bejárása
        const tr_body = document.createElement('tr'); // Új sor (tr) létrehozása
        tbody.appendChild(tr_body); // Az új sort hozzáadjuk a táblázat testéhez
        const td_lastname = createTableCell("td", pers.lastname, tr_body); // Új cella (td) létrehozása
        const td_firstname1 = createTableCell("td", pers.firstname1, tr_body); // Új cella (td) létrehozása

        if(pers.firstname2 === ""){ // A második keresztnév vizsgálata
            td_firstname1.colSpan = 2; // Az első 2 cella összevonása (nincs igény 2-re)
        }else{
            const td_firstname2 = createTableCell("td", pers.firstname2, tr_body); // Új cella (td) létrehozása
        }

        tr_body.addEventListener("click", function(e){ // Az eseménykezelő hozzáadása a sorhoz
            const select = tbody.querySelector(".selected"); // A már "selected" elem(ek) keresése
            if( select != undefined){ // Ha már van "selected" class-al rendelkező elem
                select.classList.remove("selected"); // A "selected" class eltávolítása
            }
            e.currentTarget.classList.add("selected"); // Az aktuális elemhez hozzáadjuk a "selected" class-t
        });
        const td_pet = createTableCell("td", pers.pet, tr_body); // A pet cella létrehozása
        createTableCell("td", pers.married ? false : true, tr_body); // Házas cella létrehozása
    }
}


/**
 * 
 * @param {HTMLElement} htmlElement 
 * @param {string} errorMessage 
 * @returns Az elem validságát
 */
function validateElement(htmlElement, errorMessage){
    const errorElement = htmlElement.parentElement.querySelector(".error"); // Az "error" class-al rendelkező mező lekérése
    if( htmlElement.value === ""){ // Az elem tartalmának ellenőrzése
        errorElement.innerHTML = errorMessage; // Az elem tartalmának megadása
        return false // Visszaadjuk a "false" értéket
    }
    else{
        errorElement.innerHTML = ""; // Töröljük az elem tartalmát
        return true // Visszaadjuk a "false" értéket
    }
}

/**
 * 
 * @param {HTMLElement} lastElement 
 * @param {HTMLElement} firstElement 
 * @param {HTMLElement} petElement 
 * @returns A form validságát
 */
function validateFields(lastNameID, firstNameID, petID){
    const lastElement = document.getElementById(lastNameID); // A vezetéknév mező keresése
    const firstElement = document.getElementById(firstNameID); // Az első keresztnév mező keresése
    const petElement = document.getElementById(petID); // Az állat mező keresése

    let result = true // A validálás eredményének alapértelmezett beállítása
    if(!validateElement(lastElement, "Kötelező")){ // A "lastname" elem validálása
        result = false; // Ha a validálás hibát talál, az eredmény hamisra állítódik
    };
    if(!validateElement(firstElement, "Kötelező")){ // A "lastname" elem validálása
        result = false;
    };
    if(!validateElement(petElement, "Kötelező")){ // A "lastname" elem validálása
        result = false;
    };
    return result
}