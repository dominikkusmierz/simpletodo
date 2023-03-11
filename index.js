let list;
const savedList = JSON.parse(localStorage.getItem("list"));
//model//////////////
if (Array.isArray(savedList)) list = savedList;
else {
  list = [
    {
      id: 0,
      content: "do something",
      isDone: false,
      date: "1999-10-12",
    },
  ];
}
function getDate() {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const myDate = year + "-" + month + "-" + day;
  return myDate;
}
function createItem(content) {
  if (content == "") return;
  else {
    const date = new Date();
    const id = date.getTime();
    let myDate = getDate();
    let element = { id: id, content: content, isDone: false, date: myDate };
    list.push(element);
    saveItem();
  }
}

function saveItem() {
  localStorage.setItem("list", JSON.stringify(list));
}

function removeItem(id) {
  list = list.filter(function (item) {
    if (item.id == id) {
      return false;
    } else {
      return true;
    }
  });
}

//controller/////////////
function deleteItem(e) {
  const deleteButton = e.target;
  const idToDelete = deleteButton.id;
  console.log(idToDelete);
  removeItem(idToDelete);
  saveItem();
  render();
}
//selecting my buttons
const addButton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-item-input");
const items = document.querySelector(".items");
window.addEventListener("DOMContentLoaded", function () {
  render();
  const deleteButton = document.querySelector(".delete-button");
});
//button + click event

// addButton.addEventListener("click", function () {
//   addInput.classList.toggle("hide");
//   addInput.focus();
// });

//Input item event
addInput.addEventListener("keypress", function (e) {
  let size = Object.keys(list).length;
  let inputvalue = addInput.value;
  if (e.key === "Enter") {
    createItem(inputvalue);

    // addInput.classList.toggle("hide");
    addInput.value = "";
  }

  render();
});
//view//////////////////////
//Items made in this day
function currentItems(menu) {
  const itembox = document.querySelector(".items");
  itembox.innerHTML = "";

  menu.forEach(function (menu) {
    if (getDate() == menu.date) {
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
    }
  });
}

//rendering all items
function render() {
  currentItems(list);
}
