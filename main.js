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

createHTMLElement("table", "persontable", document.body); // A table létrehozása
createHTMLElementWithParentID("thead", "personthead", "persontable"); // A tablehead létrehozása
createHTMLElementWithParentID("tbody", "persontbody", "persontable"); // A tablebody létrehozása
createHTMLElementWithParentID("tr", "persontr", "personthead"); // A tablerow létrehozása

createTableHeaderCell("persontr"); // A tableheader elemeinek létrehozása
renderTable(array); // A table renderelése

document.getElementById("form").addEventListener("submit", function(e){ // Eseménykezelő létrehozása a "form"-hoz
    e.preventDefault(); // Megakadályozzuk az űrlap alapértelmezett elküldését
    const form = e.currentTarget; // Az aktuális űrlap elemeinek lekérése

    const newPerson = { // Az új szmély létrehozása és az elemeinek megadása
        firstname1: document.getElementById("firstname1").value,
        firstname2: document.getElementById("firstname2").value,
        lastname: document.getElementById("lastname").value,
        married: document.getElementById("married").value,
        pet: document.getElementById("pet").value
    };
    if(validateFields("lastname", "firstname1", "pet")){ // A validálás eredményeinek lekérése
        array.push(newPerson); // Az új személy hozzáadása az array-hoz
        console.log(array)
        renderTable(array); // A tábla újrarenderelése az új elemmel együtt
        form.reset(); // A form Elemeinek reset-elése
    };
}
);