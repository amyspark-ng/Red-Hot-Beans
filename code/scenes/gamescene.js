import { LEVEL, levelConf } from "../levelstuff/levelThingLol"
import { HEIGHT, WIDTH } from "../main"
import { addEnemy } from "../objs/enemy"
import { addPlayer } from "../objs/player"
import { addPowerUP } from "../objs/powerup"

import { tween, tweentypes, easings } from '../plugins/easings.js'

export let layers = {
	pause: 5,
	ui: 4,
	entity: 3,
	bullets: 2,
	tiles: 1,
	background: 0,
}

export let data = {
	score: 0,
	wave: 0,
}

export let player;

let gamePause = false;

export let scoreText;
export let healthText;
export let bulletsText;

export let music;

function pauseManager() {
	gamePause = !gamePause;

	// if (gamePause) music.pause()
	// else music.play()

	every((obj) => {
		obj.paused = gamePause
	})

	every("pauseMenu", (pauseMenu) => {
		pauseMenu.hidden = !gamePause
	})
}

function addingUi() {
	add([
		sprite("diana"),
		pos(11, 11),
		origin("center"),
		fixed(),
		z(layers.ui),
	])
	
	scoreText = add([
		text(data.score, {
			size: 12,
		}),
		rotate(0),
		fixed(),
		origin("left"),
		pos(25, 12),
		z(layers.ui),
	])

	add([
		sprite("heart"),
		pos(11, 31),
		origin("center"),
		fixed(),
		z(layers.ui),		
	])
		
	healthText = add([
		text(player.hp(), {
			size: 12,
		}),
		rotate(0),
		fixed(),
		origin("center"),
		pos(scoreText.pos.x, scoreText.pos.y + 20),
		z(layers.ui),
	])

	add([
		sprite("bullet"),
		pos(11, 51),
		origin("center"),
		fixed(),
		z(layers.ui),		
	])
	
	bulletsText = add([
		text(player.milkDroplets, {
			size: 12,
		}),
		rotate(0),
		fixed(),
		origin("left"),
		pos(scoreText.pos.x - 8, healthText.pos.y + 20),
		z(layers.ui),
	])
}

export function scene_gamescene() {
	return scene("gamescene", () => {
        /*onKeyDown("down", () => {
		    camScale(camScale().sub(vec2(dt())));
	    });

        onKeyDown("up", () => {
		    camScale(camScale().add(vec2(dt())));
	    });*/

		music = play("music", {
			loop: true
		})
        
		data.score = 0
		gravity(3000)
		player = addPlayer();
		let level = addLevel(LEVEL[0], levelConf)
		player.pos = level.getPos(8, 5)

		// #region walls
		add([
			rect(3, HEIGHT),
			pos(1, HEIGHT),
			origin("bot"),
			color(WHITE),
			solid(),
			area(),
			// opacity(0)
		])
		
		add([
			rect(3, HEIGHT),
			pos(WIDTH, HEIGHT),
			origin("bot"),
			solid(),
			area(),
			opacity(0)
		])

		addingUi()

		add([
			sprite("background"),
			fixed(),
			pos(0,0),
			z(layers.background)
		])
		// #endregion

		wait(1.2, () => {
			loop(3.5, () => {
				// addEnemy(level.getPos(0, 10))
				addEnemy(vec2(rand(20, width()) - 20, -10))
			})

			loop(6, () => {
				addPowerUP(vec2(rand(20, width()) - 20, -10))
			})
		})

		// #region events
		onUpdate(() => {
			if (isKeyPressed("backspace")) go("menuscene") 
		
			scoreText.text = data.score;			
			bulletsText.text = player.milkDroplets;			
			healthText.text = player.hp();			
		})
		// #endregion
	})
}