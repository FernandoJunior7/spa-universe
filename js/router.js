export class Router {
	routes = {};

	add(routeName, page) {
		this.routes[routeName] = page;
	}

	route(event) {
		event = event || window.event;
		event.preventDefault();

		const clickedElement = event.target;
		const previousActiveElement = document.querySelector('.active');

		clickedElement.classList.toggle('active');

		if (previousActiveElement) {
			previousActiveElement.classList.toggle('active');
		}

		window.history.pushState({}, '', event.target.href);

		this.handle();
	}

	handle() {
		const { pathname } = window.location;
		const route = this.routes[pathname] || this.routes[404];

		fetch(route)
			.then((data) => data.text())
			.then((html) => {
				document.getElementById('app').innerHTML = html;
			});
	}
}
