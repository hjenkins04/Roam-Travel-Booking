export function getTimeCategory(time: string): "Morning" | "Afternoon" | "Evening" {
    const [hour, minutePart] = time.split(":");
    const [minutes, period] = minutePart.trim().split(" ");
    const hourNum = parseInt(hour);
    const isAM = period?.toLowerCase() === "am";

    if (isAM) {
        // Morning: 12:00 AM (midnight) to 11:59 AM
        return "Morning";
    } else {
        // Afternoon: 12:00 PM to 4:59 PM
        if (hourNum === 12 || (hourNum >= 1 && hourNum < 5)) {
            return "Afternoon";
        }
        // Evening: 5:00 PM to 11:59 PM
        return "Evening";
    }
}