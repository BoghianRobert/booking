export const formatDate = (stDate) => {
    let date = ("0" + stDate.getDate()).slice(-2);

    // current month
    let month = ("0" + (stDate.getMonth() + 1)).slice(-2);
    
    // current year
    let year = stDate.getFullYear();
    
    // prints date in YYYY-MM-DD format
    let goodOne = year + "-" + month + "-" + date;
    return goodOne
  }