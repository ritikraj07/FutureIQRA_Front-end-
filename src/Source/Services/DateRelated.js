function formatReadableDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    // Case 1: Date is of today
    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        const options = { hour: "numeric", minute: "numeric", second: "numeric" };
        return date.toLocaleTimeString("en-US", options);
    }

    // Case 2: Date is of yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return "Yesterday";
    }

    // Case 3: Date is of the same year
    if (date.getFullYear() === today.getFullYear()) {
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        return `${day} ${month}`;
    }

    // Case 4: Date is not from the same year
    const options = { month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}



export {formatReadableDate}