
const bits = {
    s: 128,
    z: 64,
    f5: 32,
    h: 16,
    f3: 8,
    v: 4,
    p: 4,
    n: 2,
    c: 1
}

export function createFlag(bitObj) {
    let flag = 0;
    Object.keys(bitObj).forEach((k, i) => {
        if(bitObj[k]) {
            const val = bits[k];
            
            flag += val | 0;
        }
    });
    return flag;
}

export function getFlagBit(val, flag) {
    var bitVal = bits[flag];
    if(bitVal === undefined) {
        throw new Error(`Bit ${bit} does not exist`);
    }

    return (val & bitVal) > 0;
}