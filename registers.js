import {createMemory} from './memory.js';
export class Registers {
    constructor() {
        this.regAccNames = ['af'];
        this.regMuxNames = ['bc','de','hl','wz'];
        this.regOthNames = ['ix','iy','sp','pc'];
        this.regNames = [...this.regAccNames, ...this.regMuxNames, ...this.regOthNames];

        this.regMem = createMemory(this.regNames.length * 2);
        this.xregMem = createMemory(10);
        this.xAcc = createMemory(2);

        this.regMap = this.regNames.reduce((map,name,i) => {
            map[name] = i * 2;
            if(this.regAccNames.indexOf(name) !== -1 || this.regMuxNames.indexOf(name) !== -1) {
                map[name.substring(0,1)] = i * 2;
                map[name.substring(1,2)] = i * 2 + 1;
            }
            return map;
        }, {});

    }

    debug() {
        this.regNames.forEach((name) => {
            console.log(`${name}: 0x${this.getRegister(name).toString(16).padStart(4,'0')}`)
        });
    }

    swapReg(sp, ep, regs, mem) {
        const muxRegs = new DataView(this.regMem.buffer.slice(sp, ep));
        regs.forEach((name, i) => {
            this.setRegister(name, mem.getUint16(i*2));
        });
        return muxRegs;
    }
    mux() {
        const sp = this.regMap[this.regMuxNames[0]];
        const ep = this.regMap[this.regMuxNames[this.regMuxNames.length - 1]] + 2;
        
        this.xregMem = this.swapReg(sp, ep, this.regMuxNames, this.xregMem);
    }

    switchAF() {
        const sp = this.regMap[this.regAccNames[0]];
        const ep = this.regMap[this.regAccNames[this.regAccNames.length - 1]] + 2;
        
        this.xAcc = this.swapReg(sp, ep, this.regAccNames, this.xAcc);
    }

    getRegister(name) {
        if(!(name in this.regMap)) {
            throw new Error(`getRegister: No such register as '${name}'`);
        }
        const pos = this.regMap[name];
        if(name.length === 1) {
            return this.regMem.getUint8(pos);
        }
        else {
            return this.regMem.getUint16(pos);
        }
    }

    setRegister(name, value) {
        if(!(name in this.regMap)) {
            throw new Error(`setRegister: No such register as '${name}'`);
        }
        const pos = this.regMap[name];
        if(name.length === 1) {
            this.regMem.setUint8(pos, value);
        }
        else {
            this.regMem.setUint16(pos, value);
        }
    }
}