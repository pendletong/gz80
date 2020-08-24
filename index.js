


import { Spectrum } from './spectrum.js';

const speccy = new Spectrum();
const st = process.hrtime.bigint();
while(true) {
    speccy.cpu.step();
    //speccy.cpu.debug();
}

const et = process.hrtime.bigint();
console.log(et-st);
speccy.cpu.debug();
