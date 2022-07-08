import { HEIGHT, WIDTH } from "../main"
import { data } from "./gamescene"

export function scene_deadscene() {
	return scene("deadscene", () => {
		shake(4)
	
		add([
			sprite("background"),
			fixed(),
			pos(0,0),
			z(layers.background)
		])

		let mainText = add([
			text("YOU DIED!", {
				size: 20,
			}),
			pos(WIDTH / 2, HEIGHT / 2 - 50),
			origin("center")
		])
		
		let scoreText = add([
			text(`${data.score}`, {
				size: 25,
			}),
			pos(WIDTH / 2 + 5, mainText.pos.y + 35),
			origin("center"),
		])

		add([
			sprite("diana"),
			origin("center"),
			scale(2),
			pos(scoreText.pos.x - 30, scoreText.pos.y),
		])
		
		add([
			text("Press R to play again\nor backspace to go back", {
				size: 13.5,
			}),
			pos(WIDTH / 2, scoreText.pos.y + 60),
			origin("center"),
		])

		onUpdate(() => {
			if (isKeyPressed("backspace")) {
				go("menuscene")
				play("select")
			}

			if (isKeyPressed("r")) {
				go("gamescene")
				play("select")
			}
		})
	})
}