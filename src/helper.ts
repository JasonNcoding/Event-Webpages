/**
 * Convert minutes into an 'hour(s) minutes(s)' format
 * @function
 * @param {number} time 
 * @returns converted hours and minutes string
 */
export function convertMinutesToHours(time: number) {
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
};

/**
 * Get the end date time and format it by using formatDate function
 * @param {Date} date 
 * @param {Number} minute 
 * @returns formatted date string
 */
export function getFormattedEndDate(startDate: string, minute: number): string {
    let parsedStartdate = new Date(startDate)
    var newDate = new Date(parsedStartdate);
    newDate.setMinutes(parsedStartdate.getMinutes() + minute);
    return newDate.toLocaleString();
}

export function formatDate(date: string) {
    return new Date(date).toLocaleString()
  }