document.addEventListener("DOMContentLoaded", function () {
  const itemForm = document.getElementById("item-form");
  if (itemForm) {
    itemForm.addEventListener("submit", addItem);
  }

  const randomList = document.getElementById("randomList");
  if (randomList) {
    const items = [
      "The voice by Miguel",
      "Jane the Witch by Austin",
      "Lady Gaga & the Birds",
      "It's a hooray for me by Jim Rohn",
      "Everybody Loves Chris by Walter White",
    ];

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      randomList.appendChild(li);
    });
  }
});

const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("book-list");
const itemFilter = document.getElementById("filter");
let isEditMode = false;

// Load items from local storage on page load
window.addEventListener("load", loadItemsFromStorage);

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add a Book");
    return;
  }

  // Create Book List
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item");
  li.appendChild(button);

  itemList.appendChild(li);

  // Save to local storage
  saveItemToStorage(newItem);

  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  // Add click event to the removeItem function
  button.addEventListener("click", function () {
    removeItem(this.parentElement);
  });

  return button;
}

function removeItem(li) {
  itemList.removeChild(li);

  // Remove from local storage
  const itemText = li.firstChild.textContent;
  removeItemFromStorage(itemText);
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function saveItemToStorage(item) {
  //create as objects in array (easier to fav & heart)
  // Retrieve existing items from local storage
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // Add the new item to the array
  items.push(item);

  // Save the updated array back to local storage
  localStorage.setItem("items", JSON.stringify(items));
}

function removeItemFromStorage(item) {
  // Retrieve existing items from local storage
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // Remove the item from the array
  const updatedItems = items.filter((storedItem) => storedItem !== item);

  // Save the updated array back to local storage
  localStorage.setItem("items", JSON.stringify(updatedItems));
}

function loadItemsFromStorage() {
  console.log("loadItemsFromStorage function called");
  // Retrieve existing items from local storage
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // Display items on the page
  items.forEach((item) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item");
    li.appendChild(button);

    itemList.appendChild(li);
  });
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Function to clear all items
function clearAllItems() {
  // Remove all child elements (list items) from the itemList
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear items from local storage
  localStorage.removeItem("items");
}

//buttons
function openAboutPage() {
  const url = "library2.html";
  window.open(url, "_blank");
}

function openLibraryPage() {
  const url = "library3.html";
  window.open(url, "_blank");
}

function openFavPage() {
  const url = "library4.html";
  window.open(url, "_blank");
}

// Event Listener for the form submission

itemFilter.addEventListener("input", filterItems);
function onClickItem(onClickItem) {
  itemList.addEventListener("click", onClickItem);
}

const clearButton = document.getElementById("clear");
if (clearButton) {
  clearButton.addEventListener("click", clearAllItems);
}
