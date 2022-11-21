import _, { create, maxBy } from 'lodash';
const main = document.querySelector(".main");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal-form");
const addTaskBtn = document.querySelector("#add-task-btn");
const addListBtn = document.querySelector("#add-List-Btn");
const taskContainer = document.querySelector(".card-container");
const listContainer = document.querySelector(".project-list")

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let arrLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListID = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
const LOCAL_STORAGE_TASK_KEY = 'task.tasks'
let arrTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || []


const createTask = (task, notes, id) =>{
      return {task, notes, id}
  }
const createProject = (name, id) => {
  return {name: name, id: Date.now().toString(), tasks:[]}
}

const test = createTask("workout ", "do lots of press ups bizatch", 1);
const test2 = createTask("study ", "code that shiz", 2);

// const arrTasks = [test,test2];
console.log("taks : ", JSON.stringify(arrTasks))
console.log("lists : ", JSON.stringify(arrLists))
// const arrLists = [{name: "workout", id: 1}, {name: "shopping", id: 2}];

addTaskBtn.addEventListener("click", e => {
  e.preventDefault()
  getTask()
  save()
})

function getTask(){
  let inputTask =  document.querySelector('#input-task')
  let inputNotes = document.querySelector('#input-notes')
  let taskId = selectedListID
  console.log("inputtask.value :", inputTask.value)
  if(inputTask.value === ''){
    return
  }else
  addTaskToArr(inputTask.value, inputNotes.value, taskId)
  console.log("click work?", inputNotes.value, inputTask.value )
  console.log("taskid?", selectedListID, taskId )
  inputTask.value =  null
  inputNotes.value = null
}

function addTaskToArr(task ,notes, id){
  let taskObj = createTask(task ,notes, id )
  arrTasks.push(taskObj)
  console.log("arroftasks : ",arrTasks)
  renderTasks()
}

function renderTasks(){
  console.log(taskContainer)
  clear(taskContainer)
  arrTasks.forEach(arrTasks =>{

    if(arrTasks.id === selectedListID){

    const card = document.createElement('div')
    card.classList.add("card")
    taskContainer.appendChild(card)
    
    const taskDiv = document.createElement('div')
    taskDiv.classList.add("task")
    taskDiv.textContent = `Task: ${arrTasks.task}`
    card.appendChild(taskDiv)

    const notesDiv = document.createElement('div')
    notesDiv.classList.add("notes")
    notesDiv.textContent = `Notes: ${arrTasks.notes}`
    card.appendChild(notesDiv)
    }
  })
}

addListBtn.addEventListener("click", e => {
  e.preventDefault()
  getProject()
  save()
})

listContainer.addEventListener("click", e =>{
  if(e.target.tagName.toLowerCase() === 'li'){
    selectedListID = e.target.dataset.listId
    console.log("id : ", e.target.dataset.listId)
    console.log("idArr : ", selectedListID)
  }
  save()
  renderTasks()
  renderProjects()
})
function renderProjects(){
  clear(listContainer)
  arrLists.forEach(arrLists =>{
    console.log("hello render pro" + arrLists.id)
    const listEL = document.createElement('li')
    listEL.classList.add("new-list")
    listEL.dataset.listId = arrLists.id
    listEL.innerHTML= arrLists.name;
    if(selectedListID === arrLists.id){
      listEL.classList.add('active-list')
      }
    listContainer.appendChild(listEL);
  })
}

function getProject(){
  let inputList =  document.querySelector('.new-list-input')
  if(inputList.value !== '' ){
    addProjectToArr(inputList.value)
    console.log("click work?", inputList.value)
    inputList.value =  null
  }
}

function addProjectToArr(name, id){
  let proObj = createProject(name, id)
  arrLists.push(proObj)
  console.log(arrLists)
  save()
  renderProjects()
}

function clear(element){
  console.log("remove funciton" )
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(arrLists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListID)
  localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(arrTasks))
}

renderProjects();
renderTasks();

