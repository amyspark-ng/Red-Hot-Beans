import { HEIGHT } from "../main"
import { addButton } from "./menuscene"

export function scene_howto() {
	return scene("howtoscene", () => {
		add([
			sprite("howto"),
			fixed(),
			pos(0,0),
		])

		let gobackbtn = addButton("Back", vec2(35, HEIGHT - 10), () => { go("menuscene") })
	})
}