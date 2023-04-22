import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{
  lists!:List[];
  tasks!:Task[];
  selectedListId!:string;
  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router)
  {

    
  }

  ngOnInit()
    {
       this.route.params.subscribe((params:Params)=>{
        console.log(params);
        if(params['listId'])
        {

          this.selectedListId=params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks:any)=>{
            this.tasks=tasks;

       })
        }
        else{
          this.tasks=[];
        }
      
       })
     
       this.taskService.getLists().subscribe((lists:any)=>{
        this.lists=lists;

       })
    }


    // We want to set the tasks to be completed
    onTaskClick(task:Task)
    {
      this.taskService.complete(task).subscribe(()=>{
        console.log("Completed Task Successfully");

      });
      task.completed=!task.completed;
    }

    onDeleteListClick()
    {

      this.taskService.deleteList(this.selectedListId).subscribe((res:any)=>{
            this.router.navigate(['lists/']);
            console.log(res); 
      });
    }
    onTaskDeleteClick(id:string)
    {

      this.taskService.deleteTask(this.selectedListId,id).subscribe((res:any)=>{
          this.tasks=this.tasks.filter(val=>val._id!==id);
            console.log(res); 
      });
    }
}
