
const menuList = document.querySelector(".menu-list")
const eventList = document.querySelector(".event-list")
const modal = document.getElementById("menuModal")
const closeButton = document.querySelector(".close-button")
const modal2 = document.getElementById("eventModal")

const modalElements = {
	name: document.getElementById('modalName'),
	Description: document.getElementById('modalDescription'),
	price: document.getElementById('modalPrice'),
	image: document.getElementById('modalImage')
}


const modalElements2 = {
	name: document.getElementById('modalName2'),
	location: document.getElementById('modalLocation'),
	date: document.getElementById('modalDate'),
	time: document.getElementById('modalTime')
}

const getMenu = async () => {
	const response = await fetch('/api/v1/menu/')
	return await response.json()
}

const getEvents = async () => {
	const response = await fetch('/api/v1/events/')
	return await response.json()
}

/*const getEvent = async id => {
	const response = await fetch(`/api/v1/events/${id}`)
	return await response.json()
}*/

const showMenuList = menu => {
	menu?.forEach(({name, Description, price, image}) => {
		const menuItem = document.createElement("div")
		menuItem.className = "menu-item"
		menuItem.innerHTML = `
			<img src="${image}/" alt="${name}" height="200px" width="200px">
			<h2>${name}</h2>
			<p><strong>Description:</strong> ${Description} | <strong>Price:</strong> ${price}</p>
		`
		menuItem.onclick = () => showMenuDetails(id)
		menuList.appendChild(menuItem)
	})
}

const showMenuDetails = async id => {

	const {name, Description, price, image} = await getMenu(id)

	modalElements.name.textContent = name
	modalElements.Description.textContent = Description
	modalElements.price.textContent = price
	modalElements.image.src = image

	modal.style.display = 'flex'
}


const showEventList = event => {
	event?.forEach(({name, location, date, time}) => {
		const eventItem = document.createElement("div")
		eventItem.className = "event-item"
		eventItem.innerHTML = `
		
			<h2>${name}</h2>
			<p><strong>Location:</strong> ${location} | <strong>When:</strong> ${date}, ${time}</p>
		`
		eventItem.onclick = () => showEventDetails(id)
		eventList.appendChild(eventItem)
	})
}

const showEventDetails = async id => {

	const {name, location, date, time} = await getEvents(id)

	modalElements2.name.textContent = name
	modalElements2.location.textContent = location
	modalElements2.date.textContent = date
	modalElements2.time.src = time

	modal.style.display = 'flex'
}

closeButton.onclick = () => modal.style.display = 'none'

window.onclick = event => {
	if (event.target === modal) modal.style.display = 'none'
}


;(async () => {
	const menu = await getMenu()
	showMenuList(menu)
})()