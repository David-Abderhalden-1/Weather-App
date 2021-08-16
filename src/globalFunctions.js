function toTitleCase(string) {
    string = string.toLowerCase();
    string = string.split(' ');
    for (var i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }
    return string.join(' ');
}

export {
    toTitleCase,
}