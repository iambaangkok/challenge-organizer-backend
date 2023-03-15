import { 
    Body,
    Controller, 
    Get,
    Delete,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { CreateTabDto } from '../../dto/CreateTab.dto';
import { EditTabDto } from '../../dto/EditTab.dto';
import { TabsService } from '../service/tabs.service';

@Controller('api/tabs')
export class TabsController {
    constructor(private tabService: TabsService) { }

    @Get('/')
    getAllTab(){
        console.log(`GET /`);
        return this.tabService.findAllTab();
    }

    @Get('/:challengeTitle')
    getAllTabByChallenge(@Param('challengeTitle') challengeTitle: string){
        console.log(`GET /${challengeTitle}`);
        return this.tabService.findAllTabByChallenge(challengeTitle);
    }

    @Get('/:challengeTitle/:tabName')
    getTabByName(
        @Param('tabName') tabName: string, 
        @Param('challengeTitle') challengeTitle: string
    ){
        console.log(`GET /${tabName}`);
        return this.tabService.findTabByName(tabName, challengeTitle);
    }

    @Post('/')
    createTab(@Body() createTab: CreateTabDto){
        console.log(`POST /${createTab.tabName} in challenge ${createTab.challengeTitle}`);
        return this.tabService.createTab(createTab);
    }

    @Put('/:challengeTitle/:tabName')
    editTab(
        @Param('tabName') tabName: string, 
        @Param('challengeTitle') challengeTitle: string,
        @Body() editTab: EditTabDto
    ){
        console.log(`PUT /${tabName} in challenge ${challengeTitle}`);
        return this.tabService.editTab(tabName, challengeTitle, editTab);
    }

    @Delete('/:challengeTitle/:tabName')
    deleteTab(
        @Param('tabName') tabName: string,
        @Param('challengeTitle') challengeTitle: string
    ){
        console.log(`DELETE /${tabName} in challenge ${challengeTitle}`);
        return this.tabService.deleteTab(tabName, challengeTitle);
    }
}
