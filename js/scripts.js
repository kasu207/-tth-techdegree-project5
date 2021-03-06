/*
URL
*/
const randomUsrUrl = 'https://randomuser.me/api/?results=12'
/*

/**
 * DOM Elements 
*/
const gallery = document.querySelector('#gallery');
const input = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-submit');
const employees = [];

/* HANDLE ALL FETCH REQUESTS */
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function getRandomUsrData(url) {
    const usrJSON = await getJSON(url);

    const profiles = usrJSON.results.map(async (user) => {
        const name = user.name;
        const email = user.email;
        const picture = user.picture;
        const location = user.location;
        const cell = user.cell;
        const birthday = user.dob;

        return {
            name,
            email,
            picture,
            location,
            cell,
            birthday
        }

    });
    return Promise.all(profiles);
}
/*
*Helper Funktion
 */
/* WEBDEV-Funcionality */
function createCard(data) {
    const arrData = data;
    data.map( (user) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        gallery.appendChild(cardDiv);
        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p id="address" class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
    `;
        cardDiv.addEventListener('click', () => {
            createModal(data, user);
        })
    });
    const names = document.querySelectorAll('#name');
    for (let i = 0; i < names.length; i++) {
        employees.push(names[i]);
    }
}
/* Search Funktion
 * accepts: 
 * SearchInput : input the user is typing in the input field
 * emps : Array of Employee Names 
 */
function search(searchInput, emps) {
    for (let i = 0; i < emps.length; i++) {
        console.log(emps[i]);
        if ((searchInput.length !== 0) && (emps[i].textContent.toLowerCase().includes(searchInput.toLowerCase()))) {
            emps[i].parentNode.parentNode.style.display = '';
        } else if (searchInput.length == 0) {
            emps[i].parentNode.parentNode.style.display = '';
        } else {
            emps[i].parentNode.parentNode.style.display = 'none';
        }
    }
};
/**ModalFunction
 * accepts: user data from createCard function
 */
function createModal(data, user) {
    console.log(data.indexOf(user));
    const modalDiv = document.createElement('div');
    const d = new Date(user.birthday.date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    modalDiv.className = 'modal-container';
    gallery.appendChild(modalDiv);
    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${year}/${month}/${date}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
`;
    const btnClose = document.querySelector('#modal-close-btn');
    btnClose.addEventListener('click', () => {
        gallery.removeChild(modalDiv);
    })
    const btnPrev = document.querySelector('#modal-prev');
    btnPrev.addEventListener('click', () => {
        let prevIndex = data.indexOf(user)-1;
        gallery.removeChild(modalDiv);
        if(prevIndex < 0 ){
            prevIndex = 11;
            createModal(data, data[prevIndex]);
        } else {
            createModal(data, data[prevIndex]);
        }
    })

    const btnNext = document.querySelector('#modal-next');
    btnNext.addEventListener('click', () => {
        let nextIndex = data.indexOf(user)+1;
        gallery.removeChild(modalDiv);
        if(nextIndex > 11){
            nextIndex = 0;
            createModal(data, data[nextIndex]);
        }else {
            createModal(data, data[nextIndex]);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    getRandomUsrData(randomUsrUrl)
        .then(createCard)
        .catch(e => {
            gallery.innerHTML = '<h3>Something went wrong</h3>';
            console.log(e);
        })
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(input.innerHTML)
        search(input.value, employees);
    });
    input.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (input.value != '') {
            search(input.value, employees);
        }
    });
});