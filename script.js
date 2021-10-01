// element webapp is created by vedansh yadav

console.log("This is a to do programm created by vedansh yadav using html,css and jquery with javascript");


// funtion to autoclear the localstorage when there is no work and notes key is set
function autoclear() {
    let workes = localStorage.getItem('workes'); // getting all the works from the localstorage
    if (!(workes == null)) {
        var myworks = JSON.parse(workes); // getting the works from the localstorage as an array by parsing it
        // if there is no note inside myworks array
        if (myworks[0] == undefined) {
            localStorage.clear(); // clearing the localstorage
            localStorage.clear(); // clearing the localStorage
        }
    }
}

showwork(); // calling the showwork function
showsuccess(); // calling the function that will set the background green of the completed works
autoclear(); // calling autoclear to clear localstorage when myworks array is empty

let addbtn = $('.add-btn'); // letting the addbtn 
var myworks; // intialising an variable in which I will be going to store all works

// adding an event to my addbtn
addbtn.click(function () {
    // checking if the value of the work textarea is empty or not if it is empty run the if part else run the else part
    if ($('#work').val() == "") {
        alert("Your work is empty please type something first to add an work"); // showing an elert if the value of work textarea is blank
    }
    // code to be run when the value of work textarea is not equals to blank
    else {
        let workes = localStorage.getItem('workes'); // getting all the works from the localstorage
        if (workes == null) {
            myworks = [];  // making mywork an new array if workes varaible is equal to null
        } else {
            myworks = JSON.parse(workes); // getting the works from the localstorage as an array by parsing it
        }

        myworks.push($('#work').val()); // pushing the textarea value to my array (myworks)
        localStorage.setItem('workes', JSON.stringify(myworks)); // setting the work in the localstorage
        console.log("Your Work `", $('#work').val(), "` has been added successfully"); // consoling that the work is added successfully
        $('#work').val(""); // reseting the textarea value after getting the work from it
        showwork(); // calling the showwork function
    }
})


// Intialising the showwork function that will show all the works

function showwork() {
    let workes = localStorage.getItem('workes'); // getting all the works from the localstorage
    // console.log(workes)
    if (workes == null) {
        myworks = [];  // making mywork an new array if workes varaible is equal to null
    } else {
        myworks = JSON.parse(workes); // getting the works from the localstorage as an array by parsing it
    }

    let workhtml = ""; // letting a variable in which I will store the work and I beautiful html and later than assign element to the innerHTML of my works containing div
    myworks.forEach((element, index) => {
        // exchanging (<) with (&lt;) and (>) with (&gt;) to save from xxl attack and storing it in a variable text
        text = element;
        text = text.replace(/</g,"&lt;");
        text = text.replace(/>/g,"&gt;");
        workhtml += `
        <div class="box box-4">
            <div class="box-content">
                <input type="checkbox" id="${index}" onclick="complete(this)" name="vehicle1" value="Bike">
                <p>${text}</p>
                <img src="delete.png" onclick="deletework(${index})" class="delete-icon">
            </div>
        </div>
        `;
    });
    // console.log(workhtml);
    document.querySelector('#works').innerHTML = workhtml;  // passing all the works in the todowork container that's id is equal to works
}


// intialising an event to delete button
$('#delete-btn').click(() => {
    let workes = localStorage.getItem('workes'); // getting all the works from the localstorage
    // what will hapen if there is no work in the works key in localstorage it means it is null
    if (workes == null) {
        // an alert that will be shown when the user had not added any work
        alert("You had not added any work first add some works and after that try to delete");
    }
    // what will hapen when there is some works in the works key in localstorage
    else {
        // showing an confirm box when anyone click on the delete button and storing it in a variable named delete_alert
        var delete_alert = confirm("Would You really want to delete all the works You may not done them and want to remember think again before deleting them");
        // clearing the localstorage if confirm box returns true
        if (delete_alert) {
            localStorage.clear(); // clearing all works from the localstorage
            localStorage.clear(); // clearing all completed work data from the session storage
            showwork();
            showsuccess();
            console.log("all works are deleted"); // consoling that all the works are deleted
        }
        // Intialising what will hapeen if confirm box return false
        else {
            showwork();
            console.log("Deleting is cancled"); // consoling that deleting of the note has been cancaled
        }
    }
})


// adding an event on delete any one work button which have class delete-btn
$('.delete-btn').click(() => {
    let workes = localStorage.getItem('workes'); // getting all the works from the localstorage
    // what will hapen if there is no work in the works key in localstorage it means it is null
    if (workes == null) {
        // an alert that will be shown when the user had not added any work
        alert("You had not added any work first add some works and after that try to delete");
    }
    // what will hapen when there is some works in the works key in localstorage
    else {
        if (workes == null) {
            myworks = [];  // making mywork an new array if workes varaible is equal to null
        } else {
            myworks = JSON.parse(workes); // getting the works from the localstorage as an array by parsing it
        }
        var index = prompt("Write the number of the work you want to delete"); // taking the index of the work to be delete by a prompt box
        // if user pass the delete index
        if (index) {
            --index; // decrementing the index property we will get
            console.log("Deleting the array item on the index :- ", index); // consoling th index of the work to be deleted
            myworks.splice(index, 1); // splice myworks to delete the specified work
            localStorage.setItem("workes", JSON.stringify(myworks)); // setting the new array in the localstorage after deleting the specified array
            showwork(); // call the showwork function to show todowork container innerHTML after deleting the work
            var completedwork = localStorage.getItem('completed'); // getting completed works from its key
            if (completedwork == null) {
                var completed = []; // if there is no work then creating an new array in which I will store completed works
            } else {
                var completed = JSON.parse(completedwork); // getting completed works in an array
            }
            completed.splice(completed.indexOf(index),1); // delete the completed work id from the local storage completed array
            localStorage.setItem('completed', JSON.stringify(completed)); // setting the new works array after splicing the completed work
            showwork();
            showsuccess();
            }
        // if user cancel the deleting 
        else {
            showwork();
            console.log("Deleting of the work is been cancled"); // consoling that deleting of the work has been cancaled
            showsuccess();
        }
    }
    autoclear(); // calling autoclear to clear localstorage when myworks array is empty
})


// function to delete an work that I will call when anyone click on the delete icon
function deletework(e) {
    let workes = localStorage.getItem('workes'); // getting all the works from the localstorage
    // console.log(workes)
    if (workes == null) {
        myworks = [];  // making mywork an new array if workes varaible is equal to null
    } else {
        myworks = JSON.parse(workes); // getting the works from the localstorage as an array by parsing it
    }
    let workcompleted = document.getElementById(e).nextElementSibling;  
    console.log("Work `", workcompleted.innerHTML, "` is completed and removed from the to do list"); // consoling that which work you completed
    myworks.splice(e, 1); // splicing completed work from the array
    localStorage.setItem('workes', JSON.stringify(myworks)); // setting the new works array after splicing the completed work
    var completedwork = localStorage.getItem('completed'); // getting completed works from its key
    if (completedwork == null) {
        var completed = []; // if there is no work then creating an new array in which I will store completed works
    } else {
        var completed = JSON.parse(completedwork); // getting completed works in an array
    }
    completed.splice(completed.indexOf(e),1);
    localStorage.setItem('completed', JSON.stringify(completed)); // setting the new works array after splicing the completed work
    showwork(); // showing the works after deleting the completed work
    autoclear(); // calling autoclear to clear localstorage when myworks array is empty
}

// function to add completed works in our localstorage
function complete(element) {
    var completedwork = localStorage.getItem('completed'); // getting completed works from its key
    if (completedwork == null) {
        var completed = []; // if there is no work then creating an new array in which I will store completed works
    } else {
        var completed = JSON.parse(completedwork); // getting completed works in an array
    }
    var exist = completed.includes(element.id); // checking that if the clicked checkbox work alreafy exist or not
    // what to do if it is already exist
    if (exist) {
        console.log('it exist'); // consoling that it exist
        var index = completed.indexOf(element.id); // getting the index of work if it exist
        completed.splice(index, 1); // splicing that work
    }
    // what to do if it is not exist
    else {
        console.log('it not exist'); // consoling that it not exist
        completed.push(element.id); // pushing the work in that
    }
    localStorage.setItem('completed', JSON.stringify(completed));
    showsuccess();
}

// function to set green background of all completed works
function showsuccess() {
    var completedwork = localStorage.getItem('completed'); // getting completed works from its key
    if (completedwork == null) {
        var completed = []; // if there is no work then creating an new array in which I will store completed works
    } else {
        var completed = JSON.parse(completedwork); // getting completed works in an array
    }
    // running forin loop for completed array
    console.log("Number of works completed are ",completed.length,"from",myworks.length);
    for (const value in completed) {
        console.log("Work ", document.getElementById(completed[value]).nextElementSibling.innerHTML, ' is completed');
        // document.getElementById(completed[value]).parentElement.style.background = '#32ff7e'; // setting green background for the completed works
        document.getElementById(completed[value]).setAttribute('checked', '');
        // $(`#${completed[value]}`).click();
    }
    var checkboxes = document.querySelectorAll('input'); // targetting all the checkboxes in the document to to later target to do work div
    Array.from(checkboxes).forEach((element) => {
        if (element.checked == true) {
            element.parentElement.classList.add('completed'); // adding completed class to the parentElement of the check box
        } else {
            element.parentElement.classList.remove('completed'); // removing completed class to the parentElement of the check box
        }
    })
    // console.log(completed);
    // var successelement = document.getElementById(element).parentElement;
    // successelement.classList = '#32ff7e';
    // $(`#${element}`).click();
}

    // showsuccess(); // calling the show success function to set green background of completed works