function generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === 0) ? generateRandom(min, max) : num;
}

let generateID = generateRandom(1,99);

export default function() {
    return generateID;
}

// let id = 0;

// export default function() {
//     return id++;
// }