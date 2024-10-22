export function getTimeCategory(time: string): "Morning" | "Afternoon" | "Evening" {
    const [hour, minutePart] = time.split(":");
    const [period] = minutePart.split(" ");
    const hourNum = parseInt(hour);
    const isAM = period.toLowerCase() === "am";

    if (isAM) {
        if (hourNum < 12) {
            return "Morning"; // 12:00 AM - 11:59 AM
        } else {
            return "Afternoon"; // 12:00 PM
        }
    } else {
        if (hourNum >= 1 && hourNum < 5) {
            return "Afternoon"; // 1:00 PM - 4:59 PM
        } else {
            return "Evening"; // 5:00 PM - 11:59 PM
        }
    }
}