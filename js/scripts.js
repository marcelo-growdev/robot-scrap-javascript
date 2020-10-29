const content = document.getElementById("mural");
const cards = JSON.parse(localStorage.getItem("cards")) || [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function createCard() {
  const title = document.getElementById("title");
  const data = document.getElementById("content");
  const avatar = `
    https://www.gravatar.com/avatar/${getRandomInt(1, 500)}?d=robohash`;

  const newCard = {
    title: title.value,
    data: data.value,
    avatar: avatar,
  };

  addCard(newCard);
  title.value = "";
  data.value = "";
}

function addCard(newCard) {
  const html = `<div class="col-12 col-sm-6 col-lg-3 mb-5" data-position="${cards.length}">
      <div class="card">
          <img src="${newCard.avatar}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${newCard.title}</h5>
              <p class="card-text">${newCard.data}</p>
              <button type="button" class="btn btn-primary edit-card" onclick="editCard(event)" data-toggle="modal" data-target="#editModal">
                  Editar
              </button>
              <button class="btn btn-danger btn-destroy" onclick="destroyCard(event)">Excluir</button>
          </div>
      </div>
  </div>`;

  cards.push(newCard);
  content.innerHTML += html;
  saveLocalStorage();
}

function destroyCard(event) {
  const cardRemoved = event.path[3];

  cards.splice(cardRemoved.dataset.position, 1);
  cardRemoved.remove();
  saveLocalStorage();
  showCards();

  console.log(cards);
}

function editCard(event) {
  const cardEdit = event.path[3];
  const position = cardEdit.dataset.position;

  document.getElementById("edit-title").value = cards[position].title;
  document.getElementById("edit-content").value = cards[position].data;
  document.getElementById("edit-id").value = position;
}

function updateCard() {
  const title = document.getElementById("edit-title").value;
  const data = document.getElementById("edit-content").value;
  const position = document.getElementById("edit-id").value;

  cards[position].title = title;
  cards[position].data = data;

  saveLocalStorage();
  showCards();
}

function saveLocalStorage() {
  localStorage.setItem("cards", JSON.stringify(cards));
}

function showCards() {
  content.innerHTML = "";

  for (const item in cards) {
    const html = `<div class="col-12 col-sm-6 col-lg-3 mb-5" data-position="${item}">
        <div class="card">
            <img src="${cards[item].avatar}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${cards[item].title}</h5>
        <p class="card-text">${cards[item].data}</p>
        <button type="button" class="btn btn-primary" onclick="editCard(event)" data-toggle="modal" data-target="#editModal">
          Editar
        </button>
            <button class="btn btn-danger btn-destroy" onclick="destroyCard(event)">Excluir</button>
            </div>
        </div>
    </div>`;

    content.innerHTML += html;
  }
}

function clearStorage() {
  localStorage.clear();
  cards.length = 0;
  content.innerHTML = "";
}

showCards();
