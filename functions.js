 /**
 * 
 * @param {td-th} tag 
 * @param {string} inner 
 * @param {HTMLTableRowElement} parent 
 * @returns {HTMLTableCellElement}
 */
function createTableCell(tag, inner, parent){
    const temporary = document.createElement(tag);
    temporary.innerHTML = inner;
    parent.appendChild(temporary);
    return temporary
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
    const element = document.createElement(tagName);
    element.id = ID;
    parent.appendChild(element);
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
    const parentElement = document.getElementById(parentID);
    if(parentElement != undefined){
        createHTMLElement(tagName, ID, parentElement);
    }

}

//elkérjük a tableHeaderRow-t id szerint
/**
 * 
 * @param {string} tableHeaderRowId 
 */
function createTableHeaderCell(tableHeaderRowId){
    const tableHeaderRow = document.getElementById(tableHeaderRowId)
    createTableCell("th", "Lastname", tableHeaderRow);
    const th_firstname = createTableCell("th", "Firstname", tableHeaderRow);
    createTableCell("th", "Pet", tableHeaderRow);
    createTableCell("th", "Married", tableHeaderRow);
    th_firstname.colSpan = 2;
}

/**
 * 
 * @param {array} personArray 
 */
function renderTable(personArray){
    const tbody = document.getElementById("persontbody");
    tbody.innerHTML = '';
    for(const pers of personArray){
        const tr_body = createTableCell("tr", "", tbody);
        const td_lastname = createTableCell("td", pers.lastname, tr_body);
        const td_firstname1 = createTableCell("td", pers.firstname1, tr_body);

        if(pers.firstname2 === undefined){
            td_firstname1.colSpan = 2;
        }else{
            const td_firstname2 = createTableCell("td", pers.firstname2, tr_body);
        }
        tr_body.addEventListener("click", function(e){
            console.log("clicked");
            const select = tbody.querySelector(".selected");
            if( select != undefined){
                select.classList.remove("selected");
            }
            e.currentTarget.classList.add("selected");
        });
        const td_pet = createTableCell("td", pers.pet, tr_body);
        if(pers.married == true){
            const td_married = createTableCell("td", "Igaz", tr_body);
        }else{
            const td_married = createTableCell("td", "Hamis", tr_body);
        }
    }
}