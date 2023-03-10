import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/CreateTask.dto';
import { TaskService } from 'src/task/service/task/task.service';

@Controller('api/task')
export class TaskController {

    constructor(private taskService : TaskService){}




    @Get()
    async viewAllTasks(){
        return this.taskService.findTasks();
    }


    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto){
        const challeneTitle = createTaskDto.challengeTitle
        return this.taskService.createTask(createTaskDto , challeneTitle);
    }




    


}
