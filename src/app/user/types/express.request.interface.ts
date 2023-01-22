import { Request } from "express";
import { User } from "../user.entity";

export interface ExpressRequest extends Request{

    user?: User
}