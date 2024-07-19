/**
 * Format a date object
 * @function
 * @param {Date} date 
 * @returns formatted date string
 */
function formatDate(date) {
    return date.toLocaleString()
};

/**
 * Set the end date time and format it by using formatDate function
 * @param {Date} date 
 * @param {Number} minute 
 * @returns formatted date string
 */
function setFormatEndDateTime(date, minute) {
  var newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() + minute);
  return formatDate(newDate);
}

/**
 * Convert minutes into an 'hour(s) minutes(s)' format
 * @function
 * @param {Number} time 
 * @returns converted hours and minutes string
 */
function convertMinutesToHours(time) {
    var formattedTime = ""
    var hours = (time / 60);
    var roundedHours = Math.floor(hours);
    var minutes = (hours - roundedHours) * 60;
    var roundedMins = Math.round(minutes);
    formattedTime+= roundedHours.toString() + " hour(s) ";
    if (roundedMins) {
        formattedTime+= roundedMins.toString() + " minute(s)";
    }
    return formattedTime
}

/**
 * Generate new ID
 * @param {String} suffix 
 * @returns 
 */
function generateId(suffix) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randNumber = Math.floor(1000 + Math.random() * 9000);
    let randLetters = () =>
      alphabet[Math.floor(Math.random() * alphabet.length)];
    return suffix + randLetters().concat(randLetters()) + "-" + randNumber;
  }

module.exports = { formatDate, setFormatEndDateTime, convertMinutesToHours, generateId }