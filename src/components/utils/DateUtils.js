
export function addDays(date, daysToAdd) {
    const dateClone = new Date(date.getTime());
    dateClone.setDate(dateClone.getDate() + daysToAdd);

    return dateClone;
}

export function getWeek(forDate, daysOffset = 0) {
    const date = addDays(forDate, daysOffset);
    const day = date.getDay();

    return {
        date,
        start: addDays(date, -day),
        end: addDays(date, 6 - day)
    }
}