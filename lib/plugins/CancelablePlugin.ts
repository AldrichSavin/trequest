import AbstractPlugin from "../AbstractPlugin";
import { Plugin } from "../Plugin"

export default class CancelablePlugin extends AbstractPlugin implements Plugin {
    name = "CancelablePlugin";
    constructor() {
        super();
    }

    onRegister(): void {
        console.log("onRegister", this.getContext());
        throw new Error("Method not implemented.");
    }

    onInit(): void {
        console.log("onInit", this.getContext());
        throw new Error("Method not implemented.");
    }
}