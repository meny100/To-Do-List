//Memachem Saada//
//ID: 308124353//
//create elements//
let body = document.body;
let contDiv = document.createElement("div");
let divJumb = document.createElement("div");
let h1 = document.createElement("h1");
//list body
let listDiv = document.createElement("div");
//add task part//
let h4 = document.createElement("h4");
let addDiv = document.createElement("div");
let addInputDiv = document.createElement("div");
let addInput = document.createElement("input");
let addDivButton = document.createElement("div");
let addButton = document.createElement("button");


//add classes style and content to the elements//
contDiv.classList.add("container");
divJumb.className = "jumbotron container bg-info my-2 p-4 col-xl-6 col-lg-6 col-md-8";
divJumb.style = "border: 1px orangered dotted; border-radius: 8px;  background-image: url('groceryStore.jpg'); background-repeat: no-repeat; background-attachment: fixed; background-size: cover;";
h1.className = "text-center text-decoration-underline";
h1.innerHTML = "To Do List";
listDiv.className = "list container text-center";
h4.innerHTML = "Add Task";
h4.className = "mt-5 text-decoration-underline";
h4.style.color = "red";
addDiv.className = "add";
addInputDiv.className = "input-group mb-2";
addInput.className = "form-control";
addInput.placeholder = "Add a task to the list";
addInput.style = "max-width: 220px;"
addButton.onclick = addItem;
addDivButton.className = "input-group-append";
addButton.className = "btn btn-success";
addButton.type = "button";
addButton.innerText = "Add";


//append elements in body//
body.append(contDiv);
contDiv.append(divJumb);
divJumb.append(h1);
divJumb.append(listDiv);
divJumb.append(h4);
divJumb.append(addDiv);
addDiv.append(addInputDiv);
addInputDiv.append(addInput);
addInputDiv.append(addDivButton);
addDivButton.append(addButton);




//implementation and logic//

//placing the cursor on input box//
addInput.focus();
addInput.select();

//define enter-key-press to active add-function//
document.addEventListener('keypress', function (e) {
    if (e.key === "Enter")
        addItem();
}
);


//add task to the list by clicking 'Add' button//
function addItem() {
    if (addInput.value != "") {
        //create HTML task elements//
        let row = createNewRow();

        //append in page//
        listDiv.append(row);

        //store data list in local storage//
        localStorage.setItem("to_do_list", listDiv.innerHTML);

        //reset the add box//
        addInput.value = "";
        addInput.placeholder = "Add a task to the list";
    }
    else {//the add input is empty
        //animation//
        addInput.classList.add("animate__animated", "animate__pulse", "animate__faster");
        //reset the animation after the animation done//
        setTimeout(function () {
            addInput.classList.remove("animate__animated", "animate__pulse", "animate__faster");
        }, 1000);
    }
}


//create new task row, return the row element//
function createNewRow(){
        let row = document.createElement("div");
        let task = document.createElement("div");
        let deleteButton = document.createElement("button");

        //giving properties//
        row.className = "row justify-content-center my-3 animate__animated animate__zoomIn";
        task.className = "mx-2 px-2 col-6";
        task.style = "border: 1px solid black; border-radius: 4px; background: white;";
        task.innerHTML = addInput.value;
        deleteButton.onclick = deleteItem;
        deleteButton.className = "btn btn-danger col-2 btn-sm delBtn";
        deleteButton.innerHTML = "Delete";

        //append task and button in row        
        row.append(task);
        row.append(deleteButton);
        
        return row;
}


//delete task from the list//
function deleteItem() {
    let row = this.parentNode;

    //animation of delete. first remove the old animation and then give the new one//
    row.classList.remove("animate__animated", "animate__zoomIn");
    row.classList.add("animate__animated", "animate__backOutRight");

    //delay the actual delete//
    setTimeout(function () {
        listDiv.removeChild(row);

        //updating local storage//
        localStorage.setItem("to_do_list", listDiv.innerHTML);
    }, 300);
}


//appear on the screen from the localStorage//
if (localStorage.getItem("to_do_list")) {
    listDiv.innerHTML = localStorage.getItem("to_do_list");

    // the local Storage doesn't save 'onclick' property of buttons. thats why I need to add it manually//
    addOnClickProperty();
}


//add onclick to all delete buttons//
function addOnClickProperty() {
    let delButtons = document.getElementsByClassName("delBtn");

    //delButtons is array of delete buttons element//
    for (let i = 0; i < delButtons.length; i++) {
        delButtons[i].onclick = deleteItem;
    }
}