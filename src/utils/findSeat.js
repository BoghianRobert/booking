
export const findSeat = (play, tickets) => {
    let takenSeats = []
    for(let i in tickets){
        if(play.id === tickets[i].playId && tickets[i].paymentId !== null){
            takenSeats.push(tickets[i].seatNumber)
        }
    }
    return takenSeats
}
