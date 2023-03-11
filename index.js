//model----------------------------------------------------------------------------------

let list;
const savedList = JSON.parse(localStorage.getItem("list"));

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
  let day;
  if(parseInt(date.getUTCDate())<10){
     day="0"+date.getUTCDate();
  }else{
     day = date.getUTCDate();
  };

  let month;
  if(parseInt(date.getMonth())<10){
    let mm=date.getMonth()+1;
     month="0"+mm;
  }else{
     month = date.getMonth()+1;
  };
  
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

//controller----------------------------------------------------------------------------------

function deleteItem(e) {
  const deleteButton = e.target;
  const idToDelete = deleteButton.id;
  removeItem(idToDelete);
  saveItem();
  render();
}
//selecting my buttons
const addButton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-item-input");
const items = document.querySelector(".items");
const actual = document.querySelector(".actual");
const done = document.querySelector(".done");
const container=document.querySelector(".container");
const prevDate=document.querySelector(".prev");
const nextDate=document.querySelector(".next");
const datePicker=document.querySelector(".datePicker");
const dateContainer=document.querySelector(".dateContainer");
window.addEventListener("DOMContentLoaded", function () {
  render();

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
//selector
actual.addEventListener("click", function () {
  if (actual.classList.contains("menuselected")) {
    return;
  } else {
    addInput.classList.toggle("hide");
    actual.classList.toggle("menuselected");
    done.classList.toggle("menuselected");
    dateContainer.classList.toggle("hide");
  }
  render();
});

done.addEventListener("click", function () {
  if (done.classList.contains("menuselected")) {
    
    return;
  } else {
    dateContainer.classList.toggle("hide");
    addInput.classList.toggle("hide");
    actual.classList.toggle("menuselected");
    done.classList.toggle("menuselected");
  }
  render();
});
//date buttons
datePicker.addEventListener('change',function(){
  console.log("change");
  render();
  
})
//view----------------------------------------------------------------------------------

//Items made in this day
function currentItems(menu) {
  items.innerHTML = "";

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


function oldItems(menu) {
 
  items.innerHTML = "";
  
  console.log("data" + datePicker.value);
  menu.forEach(function (menu) {
  let selectedDate="";
  console.log(menu.date);
    if (datePicker.value == menu.date) {
      const item = document.createElement("div");
      item.classList = "item";
      item.innerText = menu.content;
      items.appendChild(item);
    }
  });
 
}

//rendering all items
function render() {
  if (actual.classList.contains("menuselected")) {
    currentItems(list);
  } else {
    oldItems(list);
  }
}
