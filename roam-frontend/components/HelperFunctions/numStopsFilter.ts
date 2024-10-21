export function getNumStops(stops: string): "0" | "1" | "2" | "2+" {
    const numStops = stops;

    if (numStops == 'Non-stop') {
        return "0";
    } else if (numStops == '1 Stop') {
        return "1";
    } else if (numStops == '2 Stop') {
        return "2";
    } else {
        return "2+";
    }
}