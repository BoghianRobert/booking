
export const getSeats = (theater) => {
    let nr = theater.numberOfSeats
    let arrOfSeats = []
    for(let i=0; i<nr; i++){
        arrOfSeats.push(i+1)
    }
    return arrOfSeats
}
