export const getTimeAxe = (hour, minute) => {
	let min = minute / 60
	return ((parseInt(hour) + min)*100)/24
}
  
export const getVanueAxe = (value, columns) => {
	let k = 0
	for(let i=0;i<columns.length;i++){
		if (value.theaterId === columns[i].id){
			k = i
		}
	}
	const columnNumber = k
	const columnWidth = 100 / columns.length

	return columnNumber * columnWidth
}

export const getCurrentTime = () => {
	const currentTime = new Date()
	const currentHour = currentTime.getHours()
	const currentMinute = currentTime.getMinutes()

	return ((currentHour + currentMinute/60)*100)/24
}

export const betterColors = () => {
	let items = [
	'#3cb679',
	'#2b8144',
	'#4058b5',
	'#039be5',
	'#7986cb',
	'#616161',
	'#e67c73',
	'#9058ab'
	]
	

	let item = items[Math.floor(Math.random() * items.length)];
	return item
}