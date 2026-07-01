const dadd = document.getElementById("dialog-add");
const badd = document.getElementById("btn-add");
const abtn = document.getElementById("add-btn");
const bclose = document.getElementById("btn-close");
var boxs = [];
const i1 = document.getElementById("i1");
const i2 = document.getElementById("i2");
const container = document.getElementById("container");

badd.addEventListener("click", function(){
  dadd.showModal();
});
bclose.addEventListener('click', function(){
  dadd.close();
});

class Todolist {
  constructor(Title, Description){
    this.Title = Title;
    this.Description = Description;
  }
}

function RenderTodos(){
  container.innerHTML = ""; 
  
  if (boxs.length === 0){
    container.innerHTML = `
      <div class='box-vid'>
        <h3>No to do list here</h3>
        <p>try to create your first one</p>
        <button id="btn-empty-add">Ajouter</button>
      </div>`;
    document.getElementById("btn-empty-add").addEventListener("click", () => dadd.showModal());
  }
  else {
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
          <input type="checkbox" data-index="${index}" name="cards" ${isChecked}>
        </div>`;
    });
    
    container.innerHTML = allTodosHTML;
    setupboxes();
  }
}


function setupboxes(){
  const checkboxes = document.querySelectorAll("input[name='cards']");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function(){
      const index = this.getAttribute('data-index');
      const boxElement = this.closest('.box');

      if (this.checked){
        boxElement.classList.add('disabled');
        boxs[index].checked = true;
      }
      else{
        boxElement.classList.remove('disabled');
        boxs[index].checked = false;
      }
    });
  });
}

function Addbox(){
  let val1 = i1.value.trim();
  let val2 = i2.value.trim();
  
  if (val1 === "" && val2 === ""){
    alert("Il faut saisir tous les champs !!!");
  }
  else {
    var t1 = new Todolist(val1, val2);
    let dec = {
      "title" : t1.Title,
      "description" : t1.Description,
      "checked" : false
    };
    
    boxs.push(dec);
    RenderTodos();
    i1.value = "";
    i2.value = "";
    dadd.close();
  }
}

RenderTodos();
abtn.addEventListener("click", Addbox);
