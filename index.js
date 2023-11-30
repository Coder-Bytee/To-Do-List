document.addEventListener("DOMContentLoaded",function()
{
    document.getElementById("add-task-btn").addEventListener("click",function()
    {
        addTask();
    })

    displayTask();
  
});
function addTask()
{
    var task=document.getElementById("task").value;
    console.log(task);
    if(task)
    {
        if(localStorage.getItem("taskList"))
        {
            var taskList=JSON.parse(localStorage.getItem("taskList"));
            taskList.push({id:Math.floor(Math.random() * 100),task:task,flag:true});
            localStorage.setItem("taskList",JSON.stringify(taskList));
        }
        else
        {
            localStorage.setItem("taskList", JSON.stringify([{ id: 0, task: task,flag:true}]));        
        }
    }
    else{
        alert("Please Enter the Task!!...")
    }
    displayTask();
}
function displayTask()
{
    var taskList=localStorage.getItem("taskList")?JSON.parse(localStorage.getItem("taskList")):[];
    var content="";
    taskList.forEach(function(taskEle) {
        content+=htmlRenderTask(taskEle.id,taskEle.task,taskEle.flag);
    });
    document.getElementById("task-container").innerHTML=content;
    document.getElementById("task").value="";
    document.querySelectorAll(".deleteTask").forEach(function(deleteEle){
        deleteTask(deleteEle);
     

    })
    document.querySelectorAll(".taskDone").forEach(function(doneTaskEle){
        taskDone(doneTaskEle);

    })
}
function htmlRenderTask(id, task, flag) {
    var checkboxChecked = flag ? '' : 'checked';
    var spanAppend = flag ? '<span>' + task + '</span>' : '<span style="text-decoration: line-through;">' + task + '</span>';
    return (
        '<div class="task" data-id="' +
        id +
        '"><p class="para-content"><input type="checkbox" ' + checkboxChecked + ' class="taskDone" data-taskDoneId="' +
        id +
        '">' + spanAppend + '</p><div class="btn-box"><button class="deleteTask" data-deleteId="' +
        id +
        '">X</button></div></div>'
    );
}
function deleteTask(deleteEle)
{
    deleteEle.addEventListener("click",function(event)
    {
        var id=event.currentTarget.getAttribute("data-deleteId");
        var taskList=JSON.parse(localStorage.getItem("taskList"));
        taskList=taskList.filter(function(taskEle)
        {
            return taskEle.id!=id;
        })
        localStorage.setItem("taskList",JSON.stringify(taskList));
        displayTask();
      
    });
}
function taskDone(doneTaskEle)
{
    doneTaskEle.addEventListener("change",function(event)
    {
        var id=event.currentTarget.getAttribute("data-taskDoneid");
        var taskList=JSON.parse(localStorage.getItem("taskList"));
        taskList=taskList.map(function(taskEle)
        {
            if(id==taskEle.id)
            {
                taskEle.flag=!taskEle.flag;
            }
            return taskEle;
        })
        localStorage.setItem("taskList",JSON.stringify(taskList));
        displayTask();
    });

}