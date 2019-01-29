// Keys to generate scrambled words from
const keys = [
    "irene", 
    "seulgi", 
    "wendy", 
    "joy", 
    "yeri", 
    "happiness", 
    "bongya", 
    "parksooyoung", 
    "byong", 
    "yerim",
    "sometimesyougottabebold",
    "rookie",
    "redflavour",
    "dumbdumb",
    "russianroulette",
    "badboy",
    "icecreamcake"
];

// Shuffles letters in a word around randomly
function shuffleWord(word) {
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}

// Shuffle the keys and put them in an array
let shuffledFromKeys = [];
function putShuffledWordIntoArray() {
    for (let i = 0 ; i < keys.length; i++) {
        shuffledFromKeys.push(shuffleWord(keys[i]));
    }
}
putShuffledWordIntoArray();

// TODO: dynamically reshuffle array, because the shuffled words stay the same during current bot instance
exports.keys = keys;
exports.shuffled = shuffledFromKeys;
