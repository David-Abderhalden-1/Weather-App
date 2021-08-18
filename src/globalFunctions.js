function toTitleCase(string) {
    string = string.toLowerCase()
    string = string.split(' ')
    for (var i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1)
    }
    return string.join(' ')
}

function splitName(string) {
    let newString = string.split(', ')
    let result = []
    result.push(newString[0], newString[1])
    return result
}

function shortenName(name, maxLength) {
    if(name === undefined) return name
    if(name.length > maxLength){
        name = name.slice(0, maxLength)
        return name + "..."
    }return name
}

function getFormatedTime(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
}

// Return API Day index as String of Day
function getDayByIndex(apiIndex) {
    let weekDays = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
    ]
    let todayIndex = new Date().getDay();
    let weeklyindex = todayIndex + apiIndex;
    if (apiIndex == 0) {
        return "Heute";
    }
    if (weeklyindex >= 7) {
        weeklyindex = weeklyindex - 7;
    }
    return weekDays[weeklyindex];
}

export {
    toTitleCase,
    getFormatedTime,
    getDayByIndex,
    splitName,
    shortenName,
}