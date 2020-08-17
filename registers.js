import { createMemory } from './memory.js';
export class Registers {
    constructor() {
        this.regAccNames = [
            { name: 'af', size: 2, split: true }
        ];
        this.regMuxNames = [
            { name: 'bc', size: 2, split: true }, 
            { name: 'de', size: 2, split: true }, 
            { name: 'hl', size: 2, split: true }
        ];
        this.regOthNames = [
            { name: 'wz', size: 2, split: true }, 
            { name: 'ix', size: 2 }, 
            { name: 'iy', size: 2 }, 
            { name: 'sp', size: 2 }, 
            { name: 'pc', size: 2 }, 
            { name: 'i', size: 1 }, 
            { name: 'r', size: 1 }
        ];
        this.regNames = [...this.regAccNames, ...this.regMuxNames, ...this.regOthNames];

        

        let j = 0;
        this.regMap = this.regNames.reduce((map, reg, i) => {
            map[reg.name] = j;
            if(reg.split) {
                map[reg.name.substring(0, 1)] = j;
                map[reg.name.substring(1, 2)] = j + 1;
            }
            j += reg.size;
            return map;
        }, {});

        this.regMem = createMemory(this.regNames.length * 2);
        this.xregMem = createMemory(6);
        this.xAcc = createMemory(2);

    }

    debug() {
        this.regNames.forEach((reg) => {
            console.log(`${reg.name}: 0x${this.getRegister(reg.name).toString(16).padStart(reg.size*2, '0')}`);
        });
    }

    swapReg(sp, ep, regs, mem) {
        const muxRegs = new DataView(this.regMem.buffer.slice(sp, ep));
        regs.forEach((reg, i) => {
            this.setRegister(reg.name, mem.getUint16(i * 2));
        });
        return muxRegs;
    }
    mux() {
        const sp = this.regMap[this.regMuxNames[0].name];
        const ep = this.regMap[this.regMuxNames[this.regMuxNames.length - 1].name] + 2;

        this.xregMem = this.swapReg(sp, ep, this.regMuxNames, this.xregMem);
    }

    switchAF() {
        const sp = this.regMap[this.regAccNames[0].name];
        const ep = this.regMap[this.regAccNames[this.regAccNames.length - 1].name] + 2;

        this.xAcc = this.swapReg(sp, ep, this.regAccNames, this.xAcc);
    }

    getRegister(name) {
        if (!(name in this.regMap)) {
            throw new Error(`getRegister: No such register as '${name}'`);
        }
        const pos = this.regMap[name];
        if (name.length === 1) {
            return this.regMem.getUint8(pos);
        }
        else {
            return this.regMem.getUint16(pos);
        }
    }

    setRegister(name, value) {
        if (!(name in this.regMap)) {
            throw new Error(`setRegister: No such register as '${name}'`);
        }
        const pos = this.regMap[name];
        if (name.length === 1) {
            this.regMem.setUint8(pos, value);
        }
        else {
            this.regMem.setUint16(pos, value);
        }
    }
}