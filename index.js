(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();

  const taskContent = document.querySelector(".task__contents");
  const taskModel = document.querySelector(".task_model_body");

  const state = {
    tasklist:[],
  };

  const htmlTaskcontent = ({id,title,description,type,url })=>`
  <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
    
      <div class='card-header d-flex justify-content-end task__card__header'>
          <button type='button' class='btn btn-outline-primary mr-1.5' name=${id} onclick = EditTask.apply(this,arguments)>
              <i class='fas fa-pencil-alt name=${id}'></i>
          </button>
           <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} onclick=DeletTask.apply(this,arguments)>
              <i class='fas fa-trash-alt name=${id}' ></i>
          </button>
      </div>
      <div class='card-body'>
          ${
            url &&
            `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'>${type}</span>
          </div>
      </div>
      <div class='card-footer'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick=openTask.apply(this,arguments)  >Open Task</button>
      </div>
    </div>
  </div>
  `;

  const htmlModelContent = ({id,title,description,url}) =>{
    const date = new Date(parseInt(id));
  return `
  <div id=${id}>
     ${
       //  url &&
       //  //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
       //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
       url
         ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
         : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
     }
     <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
     <h2 class='my-3'>${title}</h2>
     <p class='text-muted'>${description}</p>
  </div>
  `;
};

const updateLocalStorage = () =>{
  localStorage.setItem("task",JSON.stringify({tasks: state.tasklist,})
);
};

//  const LoadInetialdata = () =>{
//   const localStoragecopy = JSON.parse(localStorage.task);
//   if(localStoragecopy) state.tasklist = localStoragecopy.tasks;

//    state.tasklist.map((cardData)=>{
//     taskContent.insertAdjacentHTML("beforeend", htmlTaskcontent(cardData))
//   })
//  };

  const LoadInetialdata = () =>{
    const localStoragecopy = JSON.parse(localStorage.task);
    if(localStoragecopy) state.tasklist = localStoragecopy.tasks;

    state.tasklist.map((card)=>{
      taskContent.insertAdjacentHTML("beforeend", htmlTaskcontent(card))
    })
  }


 const handelsubmit = (event)=>{
  const id = `${Date.now()}`;
  const input = {
    url:document.getElementById("s").value,
    title:document.getElementById("validationCustom02").value,
    type: document.getElementById("validationCustomUsername").value,
    description:document.getElementById("validationCustom03").value,
  };
  taskContent.insertAdjacentHTML("beforeend", htmlTaskcontent({...input,id}));
  state.tasklist.push({...input,id});
  updateLocalStorage();
 };

 
//  const openTask = (e) => {
//   if (!e) e = window.Event;

//   const getTask = state.tasklist.find(({ id }) => id === e.target.id);
//   taskModel.innerHTML = htmlModelContent(getTask);
// };


 const DeletTask = (e) =>{
  if(!e) e = window.Event;

  const targetId = e.target.getAttribute("name");
  const type = e.target.tagName;
  console.log(targetId);
  // console.log(type);
  const removetask = state.tasklist.filter(({id})=> id !== targetId);

  state.tasklist = removetask;
  updateLocalStorage();

  if (type === "BUTTON") {
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
    
  }
  
 }

 const EditTask = (e) =>{
  if(!e) e = window.Event;
  
  
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

   taskTitle = parentNode.childNodes[3].childNodes[3];
   taskDescription = parentNode.childNodes[3].childNodes[5];
   taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
   submitButton = parentNode.childNodes[5].childNodes[1];

   taskTitle.setAttribute("contenteditable", "true");
   taskDescription.setAttribute("contenteditable", "true");
   taskType.setAttribute("contenteditable", "true");
 
   submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
   submitButton.removeAttribute("data-bs-toggle");
   submitButton.removeAttribute("data-bs-target");
   submitButton.innerHTML = "Save Changes";

 };


 const saveEdit = (e) =>{
  if(!e) window.Event;

  const targetId = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  
  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitbutton = parentNode.childNodes[5].childNodes[1];
  console.log(taskTitle,taskDescription,taskType,submitbutton);

  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };
  let stateCopy = state.tasklist;

  const stateCo = stateCopy.map((task) =>(
    task.id === targetId
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task
  )
  );
  
   

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  // submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitbutton.setAttribute("data-bs-toggle", "modal");
  submitbutton.setAttribute("data-bs-target", "#showTask");
  submitbutton.innerHTML = "Open Task";
  
};