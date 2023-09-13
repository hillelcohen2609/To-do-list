let draggables = document.querySelectorAll(".draggable");
let notes = ["task1", "task2", "task3", "task4"];
let id = 1;

notes.forEach((el) => addNewNoteToTheList(el)); //add the first elemnts to the list
addel()
function getNewNote() {
  let note = document.getElementById("add-note");
  //console.log("add btn"+note.value)
  addNewNoteToTheList(note.value);
  addel()
  note.value = "";
}

function addNewNoteToTheList(note) {
  const newId = "note" + id;
  id++;
  let newNote = document.createElement("div");
  newNote.setAttribute("class", "note draggable");
  newNote.setAttribute("id", newId);
  newNote.setAttribute("draggable", "true");
  let textNote = document.createElement("p");
  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("onclick", `verifyCheck(${newId})`);
  let removebtn = document.createElement("button");
  removebtn.innerText = "x";
  removebtn.setAttribute("onclick", `removeNote(${newId})`);
  removebtn.setAttribute("class", "rmbtn");
  textNote.innerText = note;
  console.log(newNote);
  document.getElementById("list").appendChild(newNote);
  newNote.appendChild(check);
  newNote.appendChild(textNote);
  newNote.appendChild(removebtn);
  let a = document.getElementById("add");
  a.disabled = true;
  draggables = document.querySelectorAll(".draggable");
  //console.log(draggables)
}

function removeNote(parId) {
  console.log("in remove part");
  let rmparent = document.getElementById(parId.id);
  rmparent.remove();
}

function dis() {
  let a = document.getElementById("add");
  let b = document.getElementById("add-note").value.length;
  console.log(b);
  if (b > 0) {
    a.disabled = false;
  }
}

function verifyCheck(idc) {
  if(document.getElementById(idc.id).children[0].checked==true){
    console.log("in : if() ");
    let deltext = document.createElement("del");
    deltext.innerText = document.getElementById(idc.id).children[1].innerText;
    //console.log(deltext);
    document.getElementById(idc.id).children[1].innerHTML = "";
    document.getElementById(idc.id).children[1].appendChild(deltext);

  }else{
    console.log("in : else() ");
    //need to rebuild the text
    console.log(document.getElementById(idc.id).children)
    let text = document.getElementById(idc.id).children[1].innerText;
    let tag = document.createElement("p");
    tag.innerText=text;
    document.getElementById(idc.id).children[1].innerHTML = "";
    //document.getElementById(idc.id).children[1].remove()
    document.getElementById(idc.id).children[1].replaceWith(tag);




  }
  //console.log("in : verifyCheck() ");
 // console.log(document.getElementById(idc.id).children);
  
  //children->[checkbox,p,btn]
  
  //return clear when its uncheck
}

//grabbbb


const container = document.getElementById("list");
//console.log(container)

function addel(){
  console.log(draggables)
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});
}

container.addEventListener("dragover", (e) => {
  //console.log("dragOver")
  e.preventDefault();
  const afterElemnet = getDragAfterElement(container, e.clientY);
  //console.log(afterElemnet)
  const draggable = document.querySelector(".dragging");
  console.log(draggable)
  if (afterElemnet == null) {
    container.appendChild(draggable);
  } else {
    console.log(typeof(draggable))
    container.insertBefore(draggable, afterElemnet);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  //console.log(draggableElements)
  return draggableElements.reduce(
    (closet, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      //console.log(offset)
      if (offset < 0 && offset > closet.offset) {
        return { offset: offset, element: child };
      } else {
        return closet;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
