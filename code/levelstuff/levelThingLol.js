import { HEIGHT, WIDTH } from "../main"
import { layers } from "../scenes/gamescene"

export const LEVEL = [
	[
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
        "                 ",
        "                 ",
        "                 ",
        "                 ",
		"                 ",
		"       [==]      ",
		"                 ",
		" [==]        [==]",
        "                  ",
		"                  ",
	   "[=================]",
	]
]

export const levelConf = {	
	width: 16,
	height: 12,
	"[": () => [
		sprite("tile", { anim: 'left'}),
		area(),
		solid(),
		origin("bot"),
		"bulletDestroyer",
		"fireDestroyer",
		z(layers.tiles)
	],

	"=": () => [
		sprite("tile", { anim: 'middle'}),
		area(),
		solid(),
		origin("bot"),
		"bulletDestroyer",
		"fireDestroyer",
		z(layers.tiles)
	],

	"]": () => [
		sprite("tile", { anim: 'right'}),
		area(),
		solid(),
		origin("bot"),
		"bulletDestroyer",
		"fireDestroyer",
		z(layers.tiles)
	],
} 