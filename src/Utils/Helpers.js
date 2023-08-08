const doCheckDigit = containerNumber => {
    if (!isAssigned(containerNumber) || containerNumber.length < 11)
        return false;

    var charYControl = containerNumber.substr(3, 1) != 'Y'; //4. karakter Y olamaz
    var toplamDeger = 0;
    var characters = new Array(
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    );
    var numberofCharacters = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        34,
        35,
        36,
        37,
        38,
    );
    for (var i = 0; i < containerNumber.length - 1; i = i + 1) {
        for (var j = 0; j < characters.length; j = j + 1) {
            if (containerNumber.substr(i, 1) == characters[j]) {
                toplamDeger += Math.pow(2, i) * numberofCharacters[j]; //2 ussu index ile numara degeri carpiyoruz
                break;
            }
        }
    }
    var bolumDouble = toplamDeger / 11; //once 11e bol
    var bolumInt = Math.floor(bolumDouble); //bolumun int degeri (423,7 -> 423 kabul edilecek)
    var checkDigitNumber = toplamDeger - bolumInt * 11; //bu int degeri tekrar 11 ile carpip toplamin farkini aliyoruz.
    if (checkDigitNumber == 10) checkDigitNumber = 0;
    const checkedDigit =
        checkDigitNumber ==
        parseInt(containerNumber.substr(containerNumber.length - 1, 1));
    return checkedDigit && charYControl;
};



function isAssigned(value) {
    return [undefined, null].indexOf(value) === -1;
}


export { isAssigned, doCheckDigit };