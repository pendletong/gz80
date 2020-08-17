import * as fs from 'fs';

export function createMemory(sizeInBytes) {
    const ab = new ArrayBuffer(sizeInBytes);
    const dv = new DataView(ab);
    return dv;
}

export function loadMemory(memory, filename, location) {

    let fd = fs.openSync(filename, 'r');
    var buffer = Buffer.alloc(1);
    let i = 0;
    while (true) {
        var num = fs.readSync(fd, buffer, 0, 1, null);
        if (num === 0) {
            return i;
        }

        memory.setUint8(i + location, buffer.readUInt8(0));
        i++;
    }
    return i;

}

