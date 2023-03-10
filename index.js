let list;
const savedList = JSON.parse(localStorage.getItem("list"));

if (Array.isArray(savedList)) list = savedList;
else {
  list = [
    {
      id: 0,
      content: "do something",
      isDone: false,
    },
  ];
}
function createItem(content) {
  const id = new Date().getTime();
  let element = { id: id, content: content, isDone: false };
  list.push(element);
  saveItem();
}

function saveItem() {
  localStorage.setItem("list", JSON.stringify(list));
}

function removeItem(id) {
  list=list.filter(function (item) {
    if (item.id == id) {
      return false;
    } else {
      return true;
    }
  });
}

function deleteItem(e) {
  const deleteButton = e.target;
  const idToDelete = deleteButton.id;
  console.log(idToDelete);
  removeItem(idToDelete);
  saveItem();
  loadItems(list);
}

const addButton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-item-input");
const items = document.querySelector(".items");
window.addEventListener("DOMContentLoaded", function () {
  loadItems(list);
  const deleteButton = document.querySelector(".delete-button");
});

addButton.addEventListener("click", function () {
  addInput.classList.toggle("hide");
});

addInput.addEventListener("keypress", function (e) {
  let size = Object.keys(list).length;
  let inputvalue = addInput.value;
  if (e.key === "Enter") {
    createItem(inputvalue);

    addInput.classList.toggle("hide");
    addInput.value = "";
  }

  loadItems(list);
});

function loadItems(menu) {
  // let displayItems = menu.map(function (item) {
  //   return ` <div class="item">
  //               <input type="checkbox" name="" id=""> <p>${item.content}</p>
  //           </div>`;
  // });

  //
  const itembox = document.querySelector(".items");
  itembox.innerHTML = "";

  menu.forEach(function (menu) {
    const item = document.createElement("div");
    item.classList = "item";
    item.innerText = menu.content;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList = "item-checkbox";

    const deleteButton = document.createElement("button");
    deleteButton.classList = "delete-button";
    deleteButton.onclick = deleteItem;
    deleteButton.classList = "delete-button fa-regular fa-trash-can fa-xs";
    deleteButton.id = menu.id;
    item.appendChild(deleteButton);
    items.appendChild(item);
    item.prepend(checkbox);
  });
}
