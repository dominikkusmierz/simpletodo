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
  let id = list.length;
  let element = { id: id, content: content, isDone: false };
  list.push(element);
  saveItem();
}

function saveItem() {
  localStorage.setItem("list", JSON.stringify(list));
}

const addButton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-item-input");
const items = document.querySelector(".items");

window.addEventListener("DOMContentLoaded", function () {
  loadItems(list);
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
  let displayItems = menu.map(function (item) {
    return ` <div class="item">
                <input type="checkbox" name="" id=""> <p>${item.content}</p>
            </div>`;
  });
  displayItems = displayItems.join("");
  items.innerHTML = displayItems;
}
