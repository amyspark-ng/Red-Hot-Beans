import { scene_deadscene } from "./scenes/deadscene";
import { scene_gamescene } from "./scenes/gamescene";
import { scene_howto } from "./scenes/howtoscene";
import { scene_menuscene } from "./scenes/menuscene";

export function loadEverything() {
	//#region sprites
	loadSprite("bean", "./sprites/bean.png")
	loadSprite("badBean", "./sprites/badBean.png")

	loadSprite("background", "./sprites/backgroundNew.png")
	loadSprite("tile", "./sprites/tileset.png", {
		sliceX: 3,
		anims: {
			left: 0,
			middle: 1,
			right: 2,
		}
	})
	loadSprite("conveyor", "./sprites/conveyorbelt.png")
	loadSprite("diana", "./sprites/diana.png")
	loadSprite("bullet", "./sprites/bullet.png")
	loadSprite("heart", "./sprites/heart.png")
		
	loadSprite("milkShoot", "./sprites/milkShoot.png")
	loadSprite("superMilkShoot", "./sprites/superMilkShoot.png")
	loadSprite("milkbean", "./sprites/milkbean.png")
	loadSprite("jalapeno", "./sprites/jalapeno.png")
	
	loadSprite("milkyCookie", "./sprites/cookieMilk.png")

	loadSprite("gun", "./sprites/gun.png")
	
	loadSprite("howto", "./sprites/howto.png")
	// #endregion

	// #region sounds
	loadSound("playerHurt", "./sounds/playerHurt.wav")
	loadSound("playerDeath", "./sounds/death.wav")
	loadSound("enemyHurt", "./sounds/enemyHurt.wav")
	loadSound("playerShoot", "./sounds/playerShoot.wav")
    loadSound("jump", "./sounds/jump.wav");
    loadSound("playerShoot", "./sounds/playerShoot.wav");
    loadSound("powerupPickup", "./sounds/powerupPickup.wav");
    loadSound("scoreNew", "./sounds/scoreNew.wav");
    loadSound("select", "./sounds/select.wav");
	loadSound("noBullets", "./sounds/noBullets.wav")
	loadSound("superBullet", "./sounds/superBullet.wav")
    loadSound("music", "sounds/those_were_the_days.mp3");
	// #endregion

    // fonts
	loadFont("sinko_fixed", "sprites/sinko_fixed.png", 10, 12)
	
	// scenes
	scene_menuscene()
	scene_howto()
	scene_gamescene()
	scene_deadscene()
}