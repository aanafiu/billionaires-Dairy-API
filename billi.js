let currentPage = 1;
const itemsPerPage = 10;
let allData = [];

// Fetch data from the API
const getAllBillionaires = () => {
    fetch("https://forbes400.onrender.com/api/forbes400/getAllBillionaires")
    .then((res) => res.json())
    .then((data) => {
        allData = data; // Store all data for pagination
        showPage(currentPage);
        
    })
    .catch(error => console.log(error));
}

// getAllBillionaires();

// Show the data for the current page
const showPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = allData.slice(startIndex, endIndex);
    setupPagination();
    showAllDetails(itemsToShow);
}
let sum ;
// Display details of the selected items
const showAllDetails = (elems) => {
    const detailSection = document.getElementById('detailSection');
    detailSection.innerHTML = ''; // Clear previous content

     sum = elems.reduce((curr, pev) =>{
        console.log(curr)
        console.log(pev.estWorthPrev)
        return curr + pev.estWorthPrev;
        
    } , 0);
    
    console.log(sum);
    elems.forEach((elem) => {
        const div = document.createElement('div');
        const name = !elem.personName.includes("-") ? elem.personName.split(" ") : elem.personName.split("-") ;
        console.log(elem.personName);
        console.log(name);
        div.innerHTML = `
            <h1 class="w-full flex justify-start items-center gap-2">${name[0] + ' ' +  (name[0].includes(" ") ? ' ' :  elem.lastName.split(" ")[0] )}<input type="checkbox" class="checkbox" /></h1>
            <h1>${elem.countryOfCitizenship}</h1>
            <h1>${elem.industries[0]}</h1>
            <h1>${elem.rank}</h1>
            <h>${elem.estWorthPrev}</h>
        `;
        div.classList = "w-full grid grid-cols-5 py-2";
        detailSection.appendChild(div);

    });

    setupCheckboxes();
    
}
document.getElementById('calculateWealth').addEventListener('click', ()=> sumAuto(sum));
// net wealth
function sumAuto(sum){

    const sumSection = document.getElementById('sumSection');
    sumSection.innerText = " ";
    const divv = document.createElement('div');
    divv.innerHTML = `

        <h1 class = "col-span-4 text-left">Total Net Wealth:</h1>
        <h1 class = "text-left">${sum.toFixed(3)}$</h1>

    `;
    divv.classList = "w-full grid grid-cols-5 py-2 items-center text-bold text-xl";
    sumSection.appendChild(divv);

}

// Setup pagination controls
const setupPagination = () => {
    const paginationDiv = document.getElementById('pagination');
    const totalPages = Math.ceil(allData.length / itemsPerPage);

    paginationDiv.innerHTML = ''; // Clear previous pagination controls

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList = "pagination-button";
        pageButton.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
            sumAuto(sum);
        });

        paginationDiv.appendChild(pageButton);
    }
}

// Function to handle all checkboxes
const setupCheckboxes = () => {
    // Select all checkboxes by class name
    const checkboxes = document.querySelectorAll('.checkbox');

    // Add event listener to each checkbox
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                // Show alert when the checkbox is checked
                console.log("Checkbox is checked!");
            } else {
                // If clicked again, uncheck the checkbox
                checkbox.checked = false;
                console.log("Checkbox is not checked!");
            }
        });
    });
}