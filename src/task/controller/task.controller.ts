import {
    Body,
    Controller,
    Get,
    ParseArrayPipe,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import {
    CreateTaskDto,
    EditTaskDto,
    FindTaskInUser,
} from '../../dto/CreateTask.dto';
import { TaskService } from '../service/task.service';

@Controller('api/task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    async viewAllTasks() {
        return this.taskService.findTasks();
    }

    @Get('/getByTaskId/:taskId')
    async getSubmissionByTaskId(@Param('taskId') taskId: number) {
        return this.taskService.findSubmissionByTaskId(taskId);
    }

    // @Get("")
    // async viewTask(task)

    @Get('/viewByDisPlayName/:displayName')
    async viewTaskByDisplayName(@Param('displayName') displayName: string) {
        return this.taskService.findTaskByDisplayName(displayName);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        const challeneTitle = createTaskDto.challengeTitle;
        return this.taskService.createTask(createTaskDto, challeneTitle);
    }

    @Put('/:taskId')
    editeTask(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Body() editTaskDto: EditTaskDto,
    ) {
        console.log(`PUT /${taskId}`);
        return this.taskService.editedTask(taskId, editTaskDto);
    }

    @Delete('/:taskId')
    deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
        console.log(`DELETE /${taskId}`);
        return this.taskService.deleteTask(taskId);
    }
}
