
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

while(speccy.cpu.reg.getRegister('pc') != 4578) {
    speccy.cpu.step();
    if(speccy.cpu.reg.getRegister('hl') > 16380 && speccy.cpu.reg.getRegister('hl') < 16386) {
        speccy.cpu.debug();
        
    }
    if(speccy.cpu.reg.getRegister('hl') > 0 && speccy.cpu.reg.getRegister('hl') < 16380) {
        console.log('WTF');break;}
    //speccy.cpu.debug();
}
speccy.cpu.debug();
