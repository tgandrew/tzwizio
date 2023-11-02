var moment = require('moment-timezone');

// Get all the timezones
var timezones = moment.tz.names();

// Filter the timezones based on the UTC offset
var offset = Number("-7"); // UTC offset in hours
var matchingTimezones = timezones.filter(name => {
    var timezoneOffset = moment.tz(name).utcOffset() / 60;
    return timezoneOffset === offset;
});


var time = moment.tz({hours: 3, minutes: 20}, matchingTimezones[0]);
console.log();

console.log(time.utc().format('hh:mm a z'));
console.log(time.tz('America/Los_Angeles').format('hh:mm a z'));
console.log(time.tz('America/New_York').format('hh:mm a z'));
console.log(time.tz('Asia/Shanghai').format('hh:mm a z'));

