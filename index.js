let list = [
  {
    id: 1,
    content: "Zob cos",
    isDone: false,
  },
];

const addButton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-item-input");
const items = document.querySelector(".items");

window.addEventListener("DOMContentLoaded", function () {
  loadItems(list);
});

addButton.addEventListener("click", function () {
  console.log("click");

  addInput.classList.toggle("hide");
});

addInput.addEventListener("keypress", function (e) {
    var size=Object.keys(list).length;
  let inputvalue = addInput.value;
  if (e.key === "Enter") {
    let element = { id: 2, content: inputvalue, isDone: false };
    list[size+1] = element;

    addInput.classList.toggle("hide");
    addInput.value="";
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
