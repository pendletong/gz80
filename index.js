
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

for(let i = 0; i < 50; i++) {
    speccy.cpu.step();
    speccy.cpu.debug();
}
