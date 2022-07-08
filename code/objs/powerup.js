import { tween, easings, tweentypes } from "../plugins/easings";

export function addPowerUP(powerPos) {
	let p = add([
		sprite("milkyCookie"),
		pos(powerPos),
		origin("center"),
		body(),
		area(),
		rotate(rand(-15, 15)),
		"powerup",
	])

	tween(p, ["angle"], 0.8, -15, 15, easings.easeInQuad, tweentypes.PINGPONG);		
}