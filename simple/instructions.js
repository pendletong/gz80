import { CPU } from './cpu.js';
import { createFlag, getFlagBit, calcParity } from '../flags.js';

const exInstructions = {
    ex: true,

    71: {
        name: 'LD i,a',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const a = cpu.reg.getRegister('a');
            cpu.reg.setRegister('i', a);
            return 9;
        }
    }
};

export const instructions = {
    // nop
    0: {
        name: 'NOP',
        fn: function (cpu) {
            return 4;
        }
    },

    17: {
        name: 'LD de,**',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const mem = cpu.readMemory16();
            cpu.reg.setRegister('de', mem);
            return 10;
        }
    },

    32: {
        name: 'JR nz,*',
         /**
         * 
         * @param {CPU} cpu 
         */
        fn: function (cpu) {
            let jmp = cpu.readMemory8();
            
            const f = cpu.reg.getRegister('f');
            const nz = !getFlagBit(f, 'z');
            if(cpu.reg.getRegister('hl') < 16386) {
                console.log(`hl ${cpu.reg.getRegister('hl')} f ${f} and nz ${nz}`);
            }
            if(nz) {
                if(jmp & 128) {
                    jmp = -128 + (jmp & 127);
                }
                const pc = cpu.reg.getRegister('pc');
                cpu.reg.setRegister('pc', pc + jmp);
                return 12;
            }
            else {
                return 7;
            }
        }
    },

    43: {
        name: 'DEC hl',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const hl = cpu.reg.getRegister('hl');
            cpu.reg.setRegister('hl', hl - 1);
            return 6;
        }
    },

    54: {
        name: 'LD (hl),*',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const hl = cpu.reg.getRegister('hl');
            const val = cpu.readMemory8();
            cpu.writeMemory(hl, val);
            return 10;
        }
    },

    62: {
        name: 'LD a,*',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const a = cpu.readMemory8();
            cpu.reg.setRegister('a', a);
            return 7;
        }
    },

    71: {
        name: 'LD b,a',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const a = cpu.reg.getRegister('a');
            cpu.reg.setRegister('b', a);
            return 4;
        }
    },

    98: {
        name: 'LD h,d',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const d = cpu.reg.getRegister('d');
            cpu.reg.setRegister('h', d);
            return 4;
        }
    },

    107: {
        name: 'LD l,e',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const e = cpu.reg.getRegister('e');
            cpu.reg.setRegister('l', e);
            return 4;
        }
    },

    167: {
        name: 'AND a',
         /**
         * 
         * @param {CPU} cpu 
         */
        fn: function (cpu) {
            const a = cpu.reg.getRegister('a');
            const res = a && a;
            cpu.reg.setRegister('a', res);
            const flags = {
                s: (res & 128) >> 7,
                z: res == 0 ? 1 : 0,
                f5: (a & 32) >> 5,
                h: 1,
                f3: (a & 8) >> 3,
                p: calcParity(res),
                n: 0,
                c: 0
            };
            cpu.reg.setRegister('f', createFlag(flags));
            return 4;
        }
    },

    175: {
        name: 'XOR a',
        /**
         * 
         * @param {CPU} cpu 
         */
        fn: function (cpu) {
            const a = cpu.reg.getRegister('a');
            cpu.reg.setRegister('a', a ^ a);
            return 4;
        }
    },

    188: {
        name: 'CP h',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const a = cpu.reg.getRegister('a');
            const h = cpu.reg.getRegister('h');
            const res = a - h;
            const flags = {
                f5: (h & 32) >> 5,
                f3: (h & 8) >> 3,
                h: ((h & 15) + (a & 15)) > 15 ? 1 : 0,
                s: (res & 128) >> 7,
                n: 1,
                z: res == 0 ? 1 : 0,
                v: (h > 0 && a > 0 && res < 0) || (h < 0 && a < 0 && res > 0) ? 1 : 0,
                c: res > 255 || res < -255 ? 1 : 0
            };
            cpu.reg.setRegister('f', createFlag(flags));
            return 4;
        }
    },

    195: {
        name: 'JP **',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const jp = cpu.readMemory16();
            cpu.reg.setRegister('pc', jp);
            return 10;
        }
    },

    211: {
        name: 'OUT (*),a',
        /**
        * 
        * @param {CPU} cpu 
        */
        fn: function (cpu) {
            const a = cpu.readMemory8();
            // TODO: OUT?
            return 11;
        }
    },

    237: exInstructions,

    243: {
        name: 'DI',
        /**
         * 
         * @param {CPU} cpu 
         */
        fn: function (cpu) {
            cpu.iff1 = 0;
            cpu.iff2 = 0;
            return 4;
        }
    }
};
