
export const getTicketId = (tickets, takenTickets, play) => {
    let ticketIds = []
    for(let i in tickets){
        if(tickets[i].playId === play.id && takenTickets?.includes(tickets[i].seatNumber))
            ticketIds.push(tickets[i].id) 
    }
    return ticketIds
}
