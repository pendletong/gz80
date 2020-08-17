import {Registers} from './registers.js';
import {instr} from './instructions.js';

export class CPU {
    constructor() {
        this.reg = new Registers();
        this.ticks = 0;
        this.currentState = null;
        this.refreshRegister = new Uint8Array(1);
        this.interruptVector = new Uint8Array(1);
    }

    debug() {
        this.reg.debug();
        console.log(`i : 0x${this.interruptVector[0].toString(16).padStart(2,'0')}`);
        console.log(`r : 0x${this.refreshRegister[0].toString(16).padStart(2,'0')}`)
    }

    tick() {

    }
}
