import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import {PokeIOWorker} from "../workers/PokeIOWorker";

@JsonController("/player")
export class PlayerController
{
    @Get("/getProfile")
    public async getProfile()
    {
        var profile = await PokeIOWorker.getProfile();

        return {
            success: true,
            data: profile
        };
    }
}