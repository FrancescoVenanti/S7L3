fetch("https://striveschool-api.herokuapp.com/books")
  .then((responseObj) => responseObj.json())
  .then((booksObj) => {
    console.log(booksObj);
    const container = document.getElementById("books");
    booksObj.forEach((el) => {
      const title = el.title;
      const price = el.price;
      const img = el.img;
      const category = el.category;
      const asin = el.asin;
      const col = document.createElement("div");
      col.classList.add("col-3");
      const card = document.createElement("div");
      card.classList.add("card", "shadow", "h-100");
      const cardImg = document.createElement("img");
      cardImg.src = img;
      cardImg.classList.add("card-img", "img-fluid");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "p-2", "text-center");
      const h5 = document.createElement("h5");
      h5.classList.add("card-title", "mb-5");
      h5.innerText = title;
      const p = document.createElement("p");
      p.classList.add("card-text");
      p.innerText = "Euro: " + price;
      const btnAdd = document.createElement("button");
      btnAdd.classList.add("btn", "btn-success");
      btnAdd.innerText = "Aggiungi al carrello";
      const btnDel = document.createElement("button");
      btnDel.classList.add("btn", "btn-danger");
      btnDel.innerText = "cancella";
      col.appendChild(card);

      card.appendChild(cardImg);
      card.appendChild(cardBody);
      cardBody.appendChild(h5);
      cardBody.appendChild(p);
      cardBody.appendChild(btnAdd);
      cardBody.appendChild(btnDel);

      container.appendChild(col);
      btnDel.addEventListener("click", deleteCard);
      btnAdd.addEventListener("click", function () {
        const cart = document.querySelector("#cartList");
        const cartDiv = document.createElement("div");
        cartDiv.classList.add(
          "d-flex",
          "p-2",
          "border",
          "border-secondary",
          "align-items-center",
          "justify-content-between",
          "mb-3"
        );
        const cartImg = document.createElement("img");
        cartImg.classList.add("img-fluid");
        cartImg.src = img;
        cartImg.style = "width:50px";
        const cartTitle = document.createElement("p");
        cartTitle.classList.add("m-0");
        const cartBtn = document.createElement("button");
        cartBtn.classList.add("btn", "btn-outline-danger", "cartBtn");
        cartBtn.innerText = "Rimuovi";
        cartTitle.innerText = title;
        cart.appendChild(cartDiv);
        cartDiv.appendChild(cartImg);
        cartDiv.appendChild(cartTitle);
        cartDiv.appendChild(cartBtn);
        cartBtn.addEventListener("click", deleteCartEl);
      });
    });
  })
  .catch((error) => console.log(error));

const deleteCard = function (e) {
  console.log(e.target.parentElement);
  let card = e.target.parentElement.parentElement;
  card.remove();
};

const deleteCartEl = function (e) {
  console.log(e.target.parentElement);
  let card = e.target.parentElement;
  card.remove();
};

const storage = function () {
  const cartContent = document.getElementById("cartList").innerHTML;
  if (myStorage !== cartContent) {
    localStorage.setItem("myStorage", cartContent);
  }
};

setInterval(storage, 1000);

let myStorage = "";
window.onload = () => {
  myStorage = localStorage.getItem("myStorage");
  if (myStorage == null) {
    myStorage = "";
  }
  let cart = document.getElementById("cartList");
  cart.innerHTML = myStorage;
  let cartBtn = document.querySelectorAll(".cartBtn");
  cartBtn.forEach((el) => {
    el.addEventListener("click", deleteCartEl);
  });
};

const clearLocalStorage = function () {
  localStorage.clear();
};
//clearLocalStorage();

const btnStorage = document.getElementById("clearStorage");
btnStorage.addEventListener("click", function () {
  localStorage.clear();
});
