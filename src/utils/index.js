function Camel2Normal(str) {
    if(str === undefined || typeof str !== 'string') {
        console.warn(`[warn] the string is invalid!`);
        return str;
    }

    const newStr = str.replace(/([A-Z])/g, "-$1").toLowerCase();
    
    return newStr; 
}

export {
    Camel2Normal
}