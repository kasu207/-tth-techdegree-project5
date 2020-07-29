/*
URL
*/
const randomUsrUrl = 'https://randomuser.me/api/?results=12'
/*

/**
 * DOM Elements 
*/
const gallery = document.querySelector('#gallery');

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
/* WEBDEV-Funcionality */
function createCard(data) {
    data.map(user => {
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
            createModal(user);
        })
    });
}

function createModal(user) {
    const modalDiv = document.createElement('div');
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
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, OR ${user.location.postcode}</p>
                <p class="modal-text">${user.birthday.date}</p>
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
}
/* Search */


/* */
document.addEventListener('DOMContentLoaded', () => {
    getRandomUsrData(randomUsrUrl)
        .then(createCard)
        .catch(e => {
            gallery.innerHTML = '<h3>Something went wrong</h3>';
            console.log(e);
        })
});