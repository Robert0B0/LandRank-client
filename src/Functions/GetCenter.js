export const getCenter = (markers) => {
	let center = { lat: 0, lng: 0 };

	let min_X = Math.min.apply(
		Math,
		markers.map(function (o) {
			return o.lat;
		})
	);
	let max_X = Math.max.apply(
		Math,
		markers.map(function (o) {
			return o.lat;
		})
	);
	let min_Y = Math.min.apply(
		Math,
		markers.map(function (o) {
			return o.lng;
		})
	);
	let max_Y = Math.max.apply(
		Math,
		markers.map(function (o) {
			return o.lng;
		})
	);

	center.lat = min_X + (max_X - min_X) / 2;
	center.lng = min_Y + (max_Y - min_Y) / 2;

	return center;
};
