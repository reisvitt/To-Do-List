
var ol

function loadData(){
  date = formatDate(new Date())
  data = document.getElementById("data")
  data.value = "What we have to  do today: "
  data.appendChild(document.createTextNode(date))

  console.log(date)
  
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function syncNotDoneTasks(){
  olNotDoneTask = document.getElementById("notCompletedTasks")

  for(i = 0; i < olNotDoneTask.children.length; i++){

    children = olNotDoneTask.children[i]
    id = children.getAttribute("id")


    buttonRemoveTask = document.getElementById(("removeTask" + id))
    buttonCheckTask = document.getElementById(("check" + id))


    children.setAttribute("id", i)

    buttonRemoveTask.setAttribute("id", ("removeTask" + i))
    buttonCheckTask.setAttribute("id", ("check" + i))

    buttonRemoveTask.setAttribute("onclick", "removeTask(" + i + ")")

    buttonCheckTask.setAttribute("onclick", "taskCompleted(" + i + ")")
  }
}

function syncDoneTasks(){
  olDoneTask = document.getElementById("doneTask")

  for(i = 0; i < olDoneTask.children.length; i++){

    children = olDoneTask.children[i]
    id = children.getAttribute("id")

    buttonRemoveTask = document.getElementById(("doneRemoveTask"+ id))
    buttonCheckTask = document.getElementById(("doneCheckTask" + id))


    children.setAttribute("id", i)

    buttonRemoveTask.setAttribute("id", ("doneRemoveTask" + i))
    buttonCheckTask.setAttribute("id", ("doneCheckTask" + i))

    buttonRemoveTask.setAttribute("onclick", "removeDoneTask(" + i + ")")

    buttonCheckTask.setAttribute("onclick", "unCheckTask(" + i + ")")

  }

}

function clean(){
  titleNode = document.getElementById("input_title_task")
  descriptionNode = document.getElementById("input_description_task")

  titleNode.value = ""
  descriptionNode.value = ""
}

function addTask(){
  ol = document.getElementById("notCompletedTasks")
  
  if(ol.children.length == 0){
    div = document.getElementById("notCompleted")
    div.setAttribute("class", "content")
  }

  titleNode = document.getElementById("input_title_task")
  descriptionNode = document.getElementById("input_description_task")
  dateNode = document.getElementById("inputDate")

  console.log(dateNode.value)

  if(titleNode.value != ""){
    createTask(titleNode.value, descriptionNode.value, dateNode.value)

    titleNode.value = ""
    descriptionNode.value = ""

  }

  syncNotDoneTasks()
  syncDoneTasks()

}

function createTask(title, description, data){
  
  itemID = ol.childElementCount

  var liNode = createLi(itemID, title, description, data)

  insertLiNotCompleted(liNode)

}

function insertLiNotCompleted(li){
  ol.appendChild(li)
}


function createLi(id, title, description, data){
  var li = document.createElement("li");

  li.setAttribute("id", id)

  divTitleButtons = createDivTitleButtons(id, title, data)
  
  
  labelDescription = document.createElement("label")
  labelDescription.setAttribute("class", "description_text")

  textDescription = document.createTextNode(description)

  labelDescription.appendChild(textDescription)


  li.appendChild(divTitleButtons)
  li.appendChild(labelDescription)

  return li

}


function createDivTitleButtons(id, value, data){
  div = document.createElement("div")

  div.setAttribute("style", "display: flex; flex-direction: row;")

  labelTitle = document.createElement("label")
  labelTitle.setAttribute("class", "title_text")

  title = document.createTextNode(value)
  
 
  labelTitle.appendChild(title)

  if(data != ""){
    labelTitle.appendChild(document.createTextNode((" ("+ data + ") ")))
  }

  buttons = createCheckAndRemoveButton(id)

  div.appendChild(labelTitle)
  div.appendChild(buttons)

  return div;


}


function createCheckAndRemoveButton(id){
  var div = document.createElement("div")
  div.setAttribute("class", "item_itern_div")

  //Check button
  var buttonCheck = document.createElement("input")
  buttonCheck.setAttribute("type", "checkbox")
  buttonCheck.setAttribute("id", ("check" + id))
  buttonCheck.setAttribute("value", "false")
  buttonCheck.setAttribute("onclick", "taskCompleted(" + id + ")")



  // Remove
  var buttonRemove = document.createElement("input")
  buttonRemove.setAttribute("type", "image")
  buttonRemove.setAttribute("src", "./resources/icone_lixeira.png")
  buttonRemove.setAttribute("width", "15")
  buttonRemove.setAttribute("height", "15")
  buttonRemove.setAttribute("style", "outline: none !important")
  buttonRemove.setAttribute("id", ("removeTask"+id))
  buttonRemove.setAttribute("onclick", "removeTask("+id+")")

  div.appendChild(buttonCheck)
  div.appendChild(buttonRemove)
  
  return div

}

function removeTask(id){
  ol = document.getElementById("notCompletedTasks")

  for(i = 0; i < ol.children.length; i++){
    if(ol.children[i].getAttribute("id") == id){
      ol.children[i].remove()
      syncNotDoneTasks()
      syncDoneTasks()
      limparTask()
    }
  }
    
}
//nId = task of not completed list
function taskCompleted(id){

  ol = document.getElementById("notCompletedTasks")

  task = moveNotDoneTask0(id)
  if(task != null){
    if(task.getAttribute("value") != "true"){
      task.setAttribute("style", "text-decoration: line-through;")
      task.setAttribute("value", "true")
    }else{
      task.setAttribute("style", "text-decoration: none;")
      task.setAttribute("value", "false")
    }

    moveNotDoneTask1(task, id)
    
  }
  
}


function moveNotDoneTask1(task, id){
  olDoneTask = document.getElementById("doneTask")

  if(olDoneTask.children.length == 0){
    div = document.getElementById("completed")
    div.setAttribute("class", "content")
  }

  newID = olDoneTask.childElementCount

  buttonRemoveTask = document.getElementById(("removeTask"+id))
  buttonCheckTask = document.getElementById(("check" + id))


  task.setAttribute("id", newID)

  buttonRemoveTask.setAttribute("id", ("doneRemoveTask"+newID))
  buttonCheckTask.setAttribute("id", ("doneCheckTask" + newID))

  buttonRemoveTask.setAttribute("onclick", "removeDoneTask(" + newID + ")")

  buttonCheckTask.setAttribute("onclick", "unCheckTask(" + newID + ")")

  olDoneTask = document.getElementById("doneTask")

  olDoneTask.appendChild(task)

  limparTask()
  syncNotDoneTasks()
  syncDoneTasks()

}

function moveNotDoneTask0(id){
  ol = document.getElementById("notCompletedTasks")

  for(i = 0; i < ol.children.length; i++){
    if(ol.children[i].getAttribute("id") == id){
      return ol.children[i]
    }
  }

  if(ol.children.length == 0){
    div = document.getElementById("notCompleted")
    div.setAttribute("class", "")
  }
}


function removeDoneTask(id){
  olDoneTask = document.getElementById("doneTask")

  for(i = 0; i < olDoneTask.children.length; i++){
    if(olDoneTask.children[i].getAttribute("id") == id){
      olDoneTask.children[i].remove()
      
      syncNotDoneTasks()
      syncDoneTasks()
      limparTask()
    }
  }
}

function unCheckTask(id){
  doneTask = moveDoneTask0(id)
  if(doneTask != null){
    if(doneTask.getAttribute("value") != "true"){
      doneTask.setAttribute("style", "text-decoration: line-through;")
      doneTask.setAttribute("value", "true")
    }else{
      doneTask.setAttribute("style", "text-decoration: none;")
      doneTask.setAttribute("value", "false")
    }

    moveDoneTask1(doneTask, id)
    
  }
}

function moveDoneTask1(task, id){
  ol = document.getElementById("notCompletedTasks")

  if(ol.children.length == 0){
    div = document.getElementById("notCompleted")
    div.setAttribute("class", "content")
  }

  newID = ol.childElementCount

  buttonRemoveTask = document.getElementById(("doneRemoveTask" + id))
  buttonCheckTask = document.getElementById(("doneCheckTask" + id))


  task.setAttribute("id", newID)

  buttonRemoveTask.setAttribute("id", ("removeTask" + newID))
  buttonCheckTask.setAttribute("id", ("check" + newID))

  buttonRemoveTask.setAttribute("onclick", "removeTask(" + newID + ")")

  buttonCheckTask.setAttribute("onclick", "taskCompleted(" + newID + ")")

  ol = document.getElementById("notCompletedTasks")

  ol.appendChild(task)
  limparTask()
  syncNotDoneTasks()
  syncDoneTasks()
}

// move task of DoneTask to notDoneTask
function moveDoneTask0(id){
  olDoneTask = document.getElementById("doneTask")

  for(i = 0; i < olDoneTask.children.length; i++){
    if(olDoneTask.children[i].getAttribute("id") == id){
      return olDoneTask.children[i]
    }
  }
  //limpar doneTask
}

function limparTask(){
  olNotDoneTask = document.getElementById("notCompletedTasks")

  if(olNotDoneTask.children.length == 0){
    div = document.getElementById("notCompleted")
    div.setAttribute("class", "")
  }

  olDoneTask = document.getElementById("doneTask")
  if(olDoneTask.children.length == 0){
    div = document.getElementById("completed")
    div.setAttribute("class", "")
  }
}