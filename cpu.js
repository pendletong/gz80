import {Registers} from './registers.js';
export class CPU {
    constructor() {
        this.reg = new Registers();
    }

    debug() {
        this.reg.debug();
    }
}
