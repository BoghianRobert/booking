
export const getSeatPrice = (seat) => {
    if([1,2,3,4].includes(seat))
        return 24.99
    else
        return 14.99
}
