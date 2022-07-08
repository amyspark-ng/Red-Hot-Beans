import { HEIGHT, WIDTH } from "../main"

export function addButton(txt, p, f) {
	const btn = add([
		text(txt, {
			size: 15
		}),
		pos(p),
		area(),
		scale(1),
		origin("center"),
	])

	btn.onUpdate(() => {
		if (btn.isHovering()) btn.scale = vec2(1.2, 1.2)
		else btn.scale = vec2(1, 1)
	})

	btn.onClick(() => {
		f()
		play("select")
	})

	return btn;
}

function playBtnFunc() {
	go("gamescene")
}

function howToBtnFunc() {
	go("howtoscene")
}
				
export function scene_menuscene() {
	return scene("menuscene", () => {
		add([
			sprite("background"),
			fixed(),
			pos(0,0),
			z(layers.background)
		])
		
		let mainText = add([
			text("[Red].red\n [Hot].hot\n[Beans].beans", {
				size: 30,
				styles: {
					"red": {
						color: rgb(242, 35, 31)
					},
					"hot": {
						color: rgb(255, 211, 122)
					},
					"beans": {
						color: rgb(204, 245, 252)
					}
				}
			}),
			pos(87, 6),
		])

		let fireBean = add([
			sprite("badBean"),
			pos(81, 40),
			scale(1.8)
		])

		let milkBean = add([
			sprite("bean"),
			pos(186, 45),
			scale(1.8)
		])

		add([
			origin("left", {
				size: 2
			}),
			pos(5, HEIGHT - 5),
			scale(0.6),
			text("AmySparkNG - Music by Viraxor")
		])

		let playBtn = addButton("Play!!", vec2(WIDTH / 2, HEIGHT / 2 + 20), playBtnFunc)
		let howToBtn = addButton("How to play??", vec2(playBtn.pos.x, playBtn.pos.y + 20), howToBtnFunc)
	})
}