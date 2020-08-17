import { CPU } from './cpu.js'

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

    62: {
        name: 'LD a,*',
         /**
         * 
         * @param {CPU} cpu 
         */
        fn: function (cpu) {
            const a = cpu.readMemory8();
            cpu.reg.setRegister('a',a);
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
            cpu.reg.setRegister('b',a);
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


    243: {
        name: 'DI',
        /**
         * 
         * @param {CPU} cpu 
         */
        fn: function (cpu) {
            cpu.iff1 = 0;
            cpu.iff2 = 0;
            console.log('DI!!!');
            return 4;
        }
    }
};