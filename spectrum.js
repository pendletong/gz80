import { CPU } from './simple/cpu.js';
import { createMemory, loadMemory } from './memory.js'

const memory = createMemory(49152);
console.log('initialised memory');


const n = loadMemory(memory, '48.rom', 0);
console.log(`loaded rom ${n} bytes`);

export class Spectrum {
    constructor() {
        this.cpu = new CPU();
    }
}