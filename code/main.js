import kaboom from "kaboom"

import { loadEverything } from './loader'

kaboom({
	width: 272,
	logMax: 5,
	height: 176,
	scale: 3.45,
	// debug: true,
	stretch: true,
	letterbox: true,
	font: 'sinko_fixed',
})

export const WIDTH = width()
export const HEIGHT = height()

loadEverything()

go("menuscene")

volume(0.8)

// go("gamescene")
// go("deadscene")
