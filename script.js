const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.querySelector(".filter");



function createButton(classes){
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
} 

function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ""){
        alert("Please add an item!");
        return;
    }
    // Create list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem));

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    itemList.appendChild(li);

    checkUI();

    itemInput.value = "";

    
}

function removeItem(e){
    if(e.target.parentElement.classList.contains("remove-item")){
        e.target.parentElement.parentElement.remove();
    }
    checkUI();
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function checkUI(){
    const items = itemList.querySelectorAll("li");
    if(items.length === 0){
        itemClear.style.display = "none";
        filter.style.display = "none";
    }else{
        itemClear.style.display = "block";
        filter.style.display = "block";
    }
}



// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemClear.addEventListener("click", clearItems);

checkUI();