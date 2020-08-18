
// import {CPU} from './simple/cpu.js';

// const cpu = new CPU();
// console.log(cpu.debug());
// cpu.reg.setRegister('bc',12345);
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());
// cpu.reg.setRegister('bc',54321);
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());

// cpu.reg.setRegister('af',34343);
// console.log(cpu.debug());
// cpu.reg.switchAF();
// console.log(cpu.debug());
// cpu.reg.setRegister('af',21212);
// console.log(cpu.debug());
// cpu.reg.switchAF();
// console.log(cpu.debug());
// cpu.reg.switchAF();
// console.log(cpu.debug());

import { Spectrum } from './spectrum.js';

const speccy = new Spectrum();
const st = process.hrtime();
while(speccy.cpu.reg.getRegister('pc') != 4578) {
    speccy.cpu.step();
    //speccy.cpu.debug();
}

const et = process.hrtime();
let ns = et[1]-st[1];
if(ns < 0) ns += 1000000000;
console.log(et[0]-st[0],ns);
speccy.cpu.debug();
