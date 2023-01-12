/*
1) create the event listner ( Saving tasks to local storage)


   - make an array to save the todos
   - variable for storing the name
   - newTodoform variable 
   - username variable for location storage set to name or empty string
   - set nameInput as username using the value operator


   1.2) add an event listener for submit
       - set the item to local storage to username
       - grab the todo item
       - add it to the array using push by turning into json
       -reset the target
       - dont add if its an empty string



*/

//Do the following actions when the pages loads
window.addEventListener('load', () => {
    
    
   /* 
    - Create an array to save the todos
    - Create a variable to save name
        - put it into local storage

   */
     //global variable
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    var nameInput = document.getElementById("name");
    const username = localStorage.getItem('username') || '';
    const newTodoform = document.querySelector("#new-todo-form");
    nameInput.value = username;
    
    
    //if you find change in the name input print it out
    nameInput.addEventListener('change', e => {
        //saving it in to local storage
        localStorage.setItem('username', e.target.value);
        console.log(username);
    })

    //Submitting a new list
    newTodoform.addEventListener('submit', e =>{
        
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            created: new Date().getTime()
        }
        //only add if there is valid input
        if (e.target.elements.content.value !== "" && e.target.elements.category.value !== ""){
            console.log("Content and category is not empty");
            todos.push(todo);
            console.log("saving");
            localStorage.setItem('todos', JSON.stringify(todos));
        }else{
            alert("Please enter a valid task and category");
        }
        
        //reseting form and options after clicking the submit button
        e.target.reset();
        showTodos();

    })

    showTodos();
    
   
})

//Displaying lists app based on filter 
function showTodos(){
    const filterButton = document.getElementById('filt');
    filterButton.value = "OFF";
    unsorted = todos;
   
    showList(unsorted);
    //Sorting the function from newest to oldest or other way around
    filterButton.addEventListener('click', e =>{

        if (filterButton.value == "OFF"){
            console.log("Button is off");
            filterButton.value = "ON";
            filterButton.innerHTML = "Old to New";
            todos.sort(function(a, b) {return a.created - b.created});
            showList();
        }else{
            console.log("Button is on");
           // newest_Oldest = todos.sort(function(a, b) {return b.created - a.created});
            filterButton.innerHTML = "New to Old";
            todos.sort(function(a, b) {return b.created - a.created});
            showList();
            filterButton.value = "OFF"
        }
    })


}



//Functions to update the lists
function showList(){
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    //creating html format for each todo task
    todos.forEach(todo => {
        
        //creating the main div
        const todoItem = document.createElement('div');
        //using classlist to edit dom objects
        todoItem.classList.add('todo-item')
        //Create elements for todo
        const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
        //Checking if it is work or personal
        if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('work');
		}

        content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
		label.appendChild(span);
        //Adding buttons
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
	    todoItem.appendChild(content);
		todoItem.appendChild(actions);
        //add the todo element to the list
	    todoList.appendChild(todoItem);

        if (todo.done){
            todoItem.classList.add('done');
        }
        
        //Checking off functionality 
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            //saving it as done
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done){
                todoItem.classList.add('done');
            }else{
                todoItem.classList.remove('done');
            }
            showList();
        })

        //Edit button functionality 
        edit.addEventListener('click', e => {
            //When clicked allow change the content
            const input = content.querySelector('input');
            const lastInput = input.value;
           
        
            input.removeAttribute('readonly');

            input.focus();
            //If clicked outside of the input field it will stop editing
            input.addEventListener('blur', e => {
                //Saving the input
                // input.setAttribute('readonly', true);
                // todo.content = e.target.value;
                if (e.target.value !== ""){
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    console.log("saving new one");
                    //saving the new item
                    localStorage.setItem('todos', JSON.stringify(todos));
                }else{
                    //setting to previous value if user enters empty string
                    alert("New task cannot be empty");
                    todo.content = lastInput;
                    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
                }
            })
            
        })

        //Delete button functionality 
        deleteButton.addEventListener('click', e =>{
            console.log("detele button being pressed");
            //remove todo
            todos = todos.filter(t => t != todo);
            //update the storage
            localStorage.setItem('todos', JSON.stringify(todos));
            showList();
        })
    })

}
