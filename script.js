const dadd = document.getElementById("dialog-add");
const badd = document.getElementById("btn-add");
const abtn = document.getElementById("add-btn");
const bclose = document.getElementById("btn-close");
const scloseb = document.getElementById("sec-close-btn");
var boxs = loadList();
const i1 = document.getElementById("i1");
const i2 = document.getElementById("i2");
const container = document.getElementById("container");

const messagebox = document.getElementById("message-dialog");
const messagep = document.getElementById("message");

const deld = document.getElementById("del-dialog");
const nob = document.getElementById("btn-no");
const yesb = document.getElementById("btn-yes");
var itosp = 0;

const timediv = document.getElementById("time");
setInterval(() => {
  var date = new Date();
  timediv.innerHTML = `${getDayName(date)} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()}`;
}, 1000);



function getDayName(d) {
  const day = d.getDay();
  let dayn = "";
  switch (day) {
    case 0:
      dayn = "San";
      break;
    case 1:
      dayn = "Mon";
      break;
    case 2:
      dayn = "Tue";
      break;
    case 3:
      dayn = "Wed";
      break;
    case 4:
      dayn = "Thu";
      break;
    case 5:
      dayn = "Fri";
      break;
    case 6:
      dayn = "Sat";
      break;
  }

  return dayn;
}


function loadList() {
  const savedList = localStorage.getItem("todolist");
  return savedList ? JSON.parse(savedList) : [];
}

badd.addEventListener("click", function () {
  dadd.showModal();
});
bclose.addEventListener("click", function () {
  dadd.close();
});
scloseb.addEventListener("click", function () {
  dadd.close();
});

class Todolist {
  constructor(Title, Description) {
    this.Title = Title;
    this.Description = Description;
  }
}

function RenderTodos() {
  container.innerHTML = "";

  if (boxs.length === 0) {
    container.innerHTML = `
      <div class='box-vid'>
        <h3>No to do list here</h3>
        <p>try to create your first one</p>
        <button id="btn-empty-add">Ajouter</button>
      </div>`;
    container.style.margin = "auto";
    document
      .getElementById("btn-empty-add")
      .addEventListener("click", () => dadd.showModal());
  } else {
    let allTodosHTML = "";

    boxs.forEach((box, index) => {
      const isDisabled = box.checked ? "disabled" : "";
      const isChecked = box.checked ? "checked" : "";

      allTodosHTML += `
        <div class="box ${isDisabled}">
          <div class='detail'>
            <h4>${box.title}</h4>
            <p>${box.description}</p>
          </div>
          <div class="actions">
          <button class="supp-btn" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
          <input type="checkbox" data-index="${index}" name="cards" ${isChecked}></div>
        </div>`;
    });

    container.innerHTML = allTodosHTML;
    setupboxes();
    setupSupp();
  }
}

function setupboxes() {
  const checkboxes = document.querySelectorAll("input[name='cards']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const index = this.getAttribute("data-index");
      const boxElement = this.closest(".box");

      if (this.checked) {
        boxElement.classList.add("disabled");
        boxs[index].checked = true;
      } else {
        boxElement.classList.remove("disabled");
        boxs[index].checked = false;
      }
      saveList();
    });
  });
}

function setupSupp() {
  const suppButtons = document.querySelectorAll(".supp-btn");
  suppButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      let currentBtn = e.target.closest(".supp-btn");
      itosp = currentBtn.getAttribute("data-index");
      deld.showModal();
    });
  });
}

nob.addEventListener("click", function () {
  deld.close();
});
yesb.addEventListener("click", function () {
  if (itosp !== null) {
    boxs.splice(itosp, 1);
    saveList();
    RenderTodos();
    deld.close();
  }
});

function Addbox() {
  let val1 = i1.value.trim();
  let val2 = i2.value.trim();

  if (val1 === "" && val2 === "") {
    messagep.innerHTML= "You must fill in all the inputs!!!"
    messagebox.showModal();
  } else {
    var t1 = new Todolist(val1, val2);
    let dec = {
      title: t1.Title,
      description: t1.Description,
      checked: false,
    };

    boxs.push(dec);
    RenderTodos();
    saveList();
    i1.value = "";
    i2.value = "";
    dadd.close();
  }
}

document.getElementById("btn-message").addEventListener("click", function(){
  messagebox.close();
})

function saveList() {
  localStorage.setItem("todolist", JSON.stringify(boxs));
}

RenderTodos();
abtn.addEventListener("click", Addbox);
