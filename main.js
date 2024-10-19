let array = [
    {
        firstname1: 'Géza',
        firstname2: 'Ferenc',
        lastname: 'Kocsis',
        married: true,
        pet: 'kutya'
    },
    {
        firstname1: 'Mária',
        firstname2: 'Júlia',
        lastname: 'Horváth',
        married: false,
        pet: 'macska'
    },
    {
        firstname1: 'Ferenc',
        lastname: 'Balogh',
        married: false,
        pet: 'teknős'
    },
    {
        firstname1: 'Gábor',
        firstname2: 'Attila',
        lastname: 'Horváth',
        married: true,
        pet: 'macska'
    },
]


const table = document.createElement("table");
const thead = document.createElement("thead");
const tr_head = document.createElement("tr");
const tbody = document.createElement("tbody");

document.body.appendChild(table);
table.appendChild(thead);
thead.appendChild(tr_head);
table.appendChild(tbody);

const th_lastname = createTableCell("th", "Lastname", tr_head);
const th_firstname = createTableCell("th", "Firstname", tr_head);
const th_pet = createTableCell("th", "Pet", tr_head);
const th_married = createTableCell("th", "Married", tr_head);
th_firstname.colSpan = 2;

const form = document.getElementById("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const lastName = document.getElementById("lastname");
    const firstName1 = document.getElementById("firstname1");
    const firstName2 = document.getElementById("firstname2");
    const married = document.getElementById("married");
    const pet = document.getElementById("pet");

    const lastNameValue = lastName.value;
    const firstName1Value = firstName1.value;
    let firstName2Value = firstName2.value;
    const marriedValue = married.checked;
    const petValue = pet.value;

    if(firstName2Value === ""){
            firstName2Value = undefined;
    }
    const newPerson = {
        firstname1: firstName1Value,
        firstname2: firstName2Value,
        lastname: lastNameValue,
        married: marriedValue,
        pet: petValue
    }
    if(validateFields(lastName, firstName1, pet)){
        array.push(newPerson);
        console.log(array)
        
        renderTable();
    }
})

renderTable();

function validateFields(lastElement, firstElement, petElement){
    let result = true
    if(lastElement.value == ""){
        const lastParent = lastElement.parentElement
        const lastError = lastParent.querySelector(".error");
        lastError.innerHTML = "Kötelező"
        result = false
    }
    if(firstElement.value == ""){
        const firstParent = firstElement.parentElement
        const firstError = firstParent.querySelector(".error");
        firstError.innerHTML = "Kötelező"
        result = false
    }
    if(petElement.value == ""){
        const petParent = petElement.parentElement
        const petError = petParent.querySelector(".error");
        petError.innerHTML = "Kötelező"
        result = false
    }
    return result
}

function renderTable(){
    tbody.innerHTML = '';
    for(const pers of array){
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

/**
 * 
 * @param {td-th} type 
 * @param {string} inner 
 * @param {HTMLTableRowElement} parent 
 */
function createTableCell(type, inner, parent){
    const temporary = document.createElement(type);
    temporary.innerHTML = inner;
    parent.appendChild(temporary);
    return temporary
}