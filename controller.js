// Style-specific JS
function setNewSize(textarea) {
   textarea.style.height = "0px";
   textarea.style.height = textarea.scrollHeight + 12 + "px";
 }
 
 const textarea = document.querySelector(".task--add .new");
 textarea.addEventListener("input", () => {
   setNewSize(textarea);
 });
 
 // Functionality-specific JS
 const todoContainer = document.querySelector(".todo__tasks");
 let tasks = document.querySelectorAll(".todo__tasks .task");
 const addBtn = document.querySelector(".new--btn");
 const searchField = document.querySelector(".field--search");
 const tasksArray = [];
 
 const appendTask = function (task, container) {
   if (task.length) {
      tasksArray.unshift(task.toLowerCase());
     const template = `<li class="task">
       <input type="checkbox" />
       <p>${task}</p>
       <button class="btn--delete">Delete</button>
       </li>`;
     container.insertAdjacentHTML("afterbegin", template);
     tasks = document.querySelectorAll(".todo__tasks .task");
     const el = tasks[tasks.length - 1];
     const btn = el.querySelector(".btn--delete");
     btn.addEventListener("click", function () {
       removeTask(this.parentNode);
     });
   }
 };
 
 const removeTask = function (taskEl) {
   taskEl.remove();
   tasksArray.shift();
   return taskEl;
 };
 
 addBtn.addEventListener("click", function () {
   const task = textarea.value.trim();
   appendTask(task, todoContainer);
   textarea.value = "";
 });
 
 textarea.addEventListener("keydown", function (e) {
   if ((e.key === "Enter" && e.shiftKey) || e.key === "Enter") {
     e.preventDefault();
     const task = textarea.value.trim();
     appendTask(task, todoContainer);
     textarea.value = "";
   }
 });

searchField.addEventListener("keyup", function(e) {
   const search = e.target.value.toLowerCase();
   if(search){
      tasksArray.forEach(function(el, index) {
         if(!el.includes(search)) {
            tasks[index].style.display = "none";
         } else {
            tasks[index].style.display = "flex";
         }
      });
   } else {
      tasksArray?.forEach(function(el, index) {
         tasks[index].style.display = "flex";
      });
   }
});
