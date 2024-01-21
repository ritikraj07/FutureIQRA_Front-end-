export default function calculateExpirationTime(originalDate) {
    // Parse the original date string
    const originalDateTime = new Date(originalDate);

    // Calculate one month from the original date
    const expirationDateTime = new Date(originalDateTime);
    expirationDateTime.setMonth(originalDateTime.getMonth() + 1);

    // Format the expiration date to the same format
    const expirationDateFormatted = expirationDateTime.toISOString().slice(0, 19).replace("T", " ");

    return expirationDateFormatted;
}
