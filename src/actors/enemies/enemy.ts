import { Actor, ActorArgs, Engine } from "excalibur";
import AgroArea from "./agroArea";


class Enemy extends Actor {
    public agroArea!: AgroArea
    public isActive: boolean = false

    constructor(args: ActorArgs) {
        super(args)
    }
}

export default Enemy