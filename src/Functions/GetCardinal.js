export function getCardinal(center, point) {
	let lat1 = center.lat;
	let lng1 = center.lng;
	let lat2 = point.lat;
	let lng2 = point.lng;

	let margin = Math.PI / 90; // 2 degree tolerance for cardinal directions
	let o = lat1 - lat2;
	let a = lng1 - lng2;
	let angle = Math.atan2(o, a);

	if (angle > -margin && angle < margin) return "East";
	else if (angle > Math.PI / 2 - margin && angle < Math.PI / 2 + margin)
		return "North";
	else if (angle > Math.PI - margin && angle < -Math.PI + margin) return "West";
	else if (angle > -Math.PI / 2 - margin && angle < -Math.PI / 2 + margin)
		return "South";

	if (angle > 0 && angle < Math.PI / 2) return "NorthEast";
	else if (angle > Math.PI / 2 && angle < Math.PI) return "NorthWest";
	else if (angle > -Math.PI / 2 && angle < 0) return "SouthEast";
	else return "SouthWest";
}
