import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseInterceptors,
    UploadedFile

} from '@nestjs/common';
import { FilesService } from '../service/files.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Body } from '@nestjs/common/decorators';
import { CreateFile } from 'src/dto/CreateFile';

@Controller('api/files')
export class FilesController {


    constructor(private fileService: FilesService) { }


    @Get()
    async viewAllFiles() {
        return this.fileService.fildFiles();
    }




    @Get(':/fileId')
    async getFileById(
        @Param('fileId', ParseIntPipe) fileId: number
    ) {
        console.log(`GET/${fileId}`);
        return this.fileService.getFileById(fileId);
    }





    //TODO รับ string ที่บอกว่าเก็บของอะไร เช่น user , submission , challenge , item
    @Post('/uploadfile')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './client/uploads/files',
            filename: (req, file, cb) => {
                const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${suffix}${ext}`);
            }
        })
    }))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() createFileDetile: CreateFile
    ) {
        // console.log('file', file)
        console.log(createFileDetile)
        createFileDetile.path  = file.path
        this.fileService.createFile(createFileDetile)
        return file.path;
    }




}
