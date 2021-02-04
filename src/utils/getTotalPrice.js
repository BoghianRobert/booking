
export const getTotalPrice = (selectedSeats) => {
    let total = 0
    for (let i=0; i<selectedSeats.length; i++) {
        if( [1,2,3,4].includes(selectedSeats[i])) {
            total += 24.99
        }
        else {
            total += 14.99
        }
    }
    return total
}
