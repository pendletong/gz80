import { Registers } from '../registers.js';
import { instr } from './instructions.js';

export class CPU {
    constructor() {
        this.reg = new Registers();
        this.ticks = 0;
        this.currentState = null;

    }

    debug() {
        this.reg.debug();
    }

    step() {
        const pc = this.reg.getRegister('pc');
        console.log('PC: ', pc);
    }
}
