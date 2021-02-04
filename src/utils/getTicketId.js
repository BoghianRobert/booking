
export const getTicketId = (tickets, selectedSeats, play) => {
    let ticketIds = []
    for(let i in tickets){
        if(tickets[i].playId === play.id && selectedSeats?.includes(tickets[i].seatNumber))
            ticketIds.push(tickets[i].id) 
    }
    return ticketIds
}
