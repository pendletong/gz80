import { Registers } from '../registers.js';
import { instructions } from './instructions.js';

export class CPU {
    /**
     * 
     * @param {DataView} mem 
     */
    constructor(mem) {
        this.reg = new Registers();
        this.iff1 = 0;
        this.iff2 = 0;
        this.ticks = 0;
        this.currentState = null;
        this.mem = mem;
    }

    debug() {
        this.reg.debug();
        console.log(`t-state: ${this.ticks}`);
        console.log(`iff 1: ${this.iff1}, 2: ${this.iff2}`);
    }

    step() {
        
        const opcode = this.readMemory8();
        const ref = this.reg.getRegister('r');
        this.reg.setRegister('r', ref + 1);
        const inst = instructions[opcode];
        
        if (inst === undefined) {
            throw new Error(`Undefined opcode ${opcode.toString(16).padStart(2, '0')}`);
        }
        if(typeof inst.fn === 'function') {
            const ticks = inst.fn(this);
            this.ticks += ticks;
        }
        else {
            const opcode2 = this.readMemory8();
            const inst2 = inst[opcode2];

            if (inst2 === undefined) {
                throw new Error(`Undefined opcode ${opcode.toString(16).padStart(2, '0')}${opcode2.toString(16).padStart(2, '0')}`);
            }
            inst2.fn(this);
        }
         
    }

    readMemory8() {
        const pc = this.reg.getRegister('pc');
        const memVal = this.mem.getUint8(pc);
        this.reg.setRegister('pc', pc + 1);
        return memVal;
    }

    readMemory16() {
        const pc = this.reg.getRegister('pc');
        const memVal = this.mem.getUint16(pc, true);
        this.reg.setRegister('pc', pc + 2);
        return memVal;
    }

    writeMemory(loc, val) {
        this.mem.setUint8(val);
    }
}
