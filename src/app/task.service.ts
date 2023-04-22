import { Injectable, OnInit } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit{
  updateTask(listId:string,taskId: string, title: string) {
   
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`,{title});
  }
  

  constructor(private webRequestService:WebRequestService) { }
  ngOnInit(){
    
  }
  createList(title:string)
  {
    //we want to send a web request to create a list
    return this.webRequestService.post('lists',{title});
  }

  updateList(id:string,title:string)
  {
    //we want to send a web request to create a list
    return this.webRequestService.patch(`lists/${id}`,{title});
  }

  deleteTask(listId:string,taskId:string)
  {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }
  
  deleteList(id:string)
  {
    return this.webRequestService.delete(`lists/${id}`);
  }
  getLists() {
    return this.webRequestService.get('lists');
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTasks(title:string,listId:string)
  {
    return this.webRequestService.post(`lists/${listId}/tasks`,{title});
  }
  
  complete(task: Task)
  {
    return this.webRequestService.patch(`lists/${task._listid}/tasks/${task._id}`,{
      completed:!task.completed
    })




  }
}
