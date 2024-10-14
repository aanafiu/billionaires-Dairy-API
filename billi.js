let currentPage = 1;
const itemsPerPage = 10;
let allData = [];

// Fetch data from the API
const getAllBillionaires = () => {
    fetch('https://forbes400.onrender.com/api/forbes400/getAllBillionaires')
    .then((res) => res.json())
    .then((data) => {
        allData = data; // Store all data for pagination
        showPage(currentPage);
        setupPagination();
    });
}

// getAllBillionaires();

// Show the data for the current page
const showPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = allData.slice(startIndex, endIndex);
    showAllDetails(itemsToShow);
}

// Display details of the selected items
const showAllDetails = (elems) => {
    const detailSection = document.getElementById('detailSection');
    detailSection.innerHTML = ''; // Clear previous content

    elems.forEach((elem) => {
        const div = document.createElement('div');
        const name = elem.personName.split(" ");
        div.innerHTML = `
            <h1 class="w-full flex justify-start items-center gap-2">${name[0] + " " + name[1] }<input type="checkbox" checked="checked" class="checkbox" /></h1>
            <h1>${elem.countryOfCitizenship}</h1>
            <h1>${elem.industries[0]}</h1>
            <h1>${elem.rank}</h1>
            <h>${elem.estWorthPrev}</h>
        `;
        div.classList = "w-full grid grid-cols-5 py-2";
        detailSection.appendChild(div);
    });
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
        });

        paginationDiv.appendChild(pageButton);
    }
}
