const form = document.querySelector("form");
const input = document.querySelector(".input");
const todolists = document.querySelector(".todolists");
let arr = [];
if (JSON.parse(localStorage.getItem("todo"))) {
  arr = JSON.parse(localStorage.getItem("todo"));
  arr.forEach((td) => addToDo(td));
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todo = input.value;
  if (!todo) return;
  const item = document.createElement("li");
  item.classList.add("todoitem");
  let str = `<b>${new Date().toDateString()} 
    <br/>
    ${new Date().toTimeString().replace("GMT+0530 (India Standard Time)", " ")} 
      </b>       
  <br/>
  <br/>
  <h4>${todo}</h4>`;
  item.innerHTML = str;
  todolists.insertAdjacentElement("beforeend", item);
  input.value = "";
  UpdateLocalStorage();
});
function addToDo(str) {
  const item = document.createElement("li");
  item.classList.add("todoitem");
  item.innerHTML = str;
  todolists.insertAdjacentElement("beforeend", item);
  if (item.querySelector("h4").classList.contains("strick")) {
    item.querySelector(".closebtn").addEventListener("click", function (e) {
      e.target.closest(".todoitem").remove();
      UpdateLocalStorage();
    });
  }
}
todolists.addEventListener("click", function (e) {
  const todoitem = e.target.closest(".todoitem");
  if (!todoitem) return;
  if (todoitem.querySelector("h4").classList.contains("strick")) {
    return;
  }
  todoitem.querySelector("h4").classList.add("strick");
  todoitem.insertAdjacentHTML("afterbegin", `<span class="closebtn">X</span>`);
  UpdateLocalStorage();
  todoitem.querySelector(".closebtn").addEventListener("click", function (e) {
    e.target.closest(".todoitem").remove();
    UpdateLocalStorage();
  });
});

const timer = function () {
  const time = document.querySelector(".time");
  time.textContent = new Date();
};
timer();
setInterval(timer, 1000);

function UpdateLocalStorage() {
  let notesEl = document.querySelectorAll("li");
  notesEl = Array.from(notesEl);
  notesEl = notesEl.map((el) => el.innerHTML);
  localStorage.setItem("todo", JSON.stringify(notesEl));
}
