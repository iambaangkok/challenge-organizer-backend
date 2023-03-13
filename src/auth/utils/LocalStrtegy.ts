import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { ServicesService } from "../services/services.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {


    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: ServicesService,
    ) {
        super();

    }


    async validate(username: string, password: string){
        this.authService.validateUser(username, password);
    }

}