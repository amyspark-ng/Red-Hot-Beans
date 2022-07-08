import { HEIGHT, WIDTH } from "../main"
import { bulletsText, layers, data, music } from "../scenes/gamescene";

import { tween, tweentypes, easings } from '../plugins/easings.js'

let player;

export function addPlayer() {

	player = add([
		sprite("bean"),
		origin("center"),
		pos(),
		area(),
		body(),
		opacity(1),
		health(5),
		z(layers.entity),
		"player",
		"fireDestroyer",
		{
			speed: 190,
			jumpingForce: 460,
			damage: 1,
			canJump: true,
			canBeHurt: true,
			canMove: true,
			facingLeft: false,
			dead: false,

			hasPowerup: false,
			powerup: 'none',

			reachedEnd: false,

			lastShoot: 0, // the time that has passed since last shoot
			fireRate: 0.18, // the time you have to wait betweeen each shoot
			milkDroplets: 15, // bullets
			
			milkShoot() {
				this.lastShoot = 0
				
				this.milkDroplets--

				play("playerShoot")
				
				bulletsText.text = player.milkDroplets;

				let droplet = add([
					pos(gun.pos.clone()),
					sprite("milkShoot"),
					color(WHITE),
					area( { scale: 0.5 }),
					cleanup(),
					rotate(mousePos().angle(gun.pos)),
					move(mousePos().angle(gun.pos), this.speed * 2.5),
					origin("center"),
					opacity(1),
					z(layers.bullets),
					"bullet"
				])

				droplet.onCollide("bulletDestroyer", () => {
					destroy(droplet)
				})

				droplet.onCollide("enemy", (enemy) => {
					destroy(droplet)
					enemy.hurt(this.damage)
				})

				droplet.onCollide("conveyor", (conveyor) => {
					conveyor.hurt(1)
				})

				wait(1.15, () => {
					droplet.use(body( { solid: false }))

					droplet.onUpdate(() => {
						droplet.angle += 5
						droplet.opacity -= 0.18
					
						if (droplet.opacity < 0) {
							destroy(droplet)
						}
					})
				})
			},
		
			superMilkShoot() {
				this.lastShoot = 0
				
				this.milkDroplets -= 5

				// play("playerShoot")
				play("superBullet")
				
				bulletsText.text = player.milkDroplets;

				let superDroplet = add([
					pos(gun.pos.clone()),
					sprite("superMilkShoot"),
					color(WHITE),
					area( { scale: 0.5 }),
					cleanup(),
					rotate(mousePos().angle(gun.pos)),
					move(mousePos().angle(gun.pos), this.speed * 1.5),
					origin("center"),
					opacity(1),
					z(layers.bullets),
					"bullet",
					{
						destroyed: 0
					}
				])

				superDroplet.onCollide("bulletDestroyer", () => {
					superDroplet.destroyer++
					if (superDroplet.destroyer >= 2) {
						destroy(superDroplet)
					}
				})

				superDroplet.onCollide("enemy", (enemy) => {
					destroy(superDroplet)
					enemy.hurt(5)
				})

				wait(1.15, () => {
					superDroplet.use(body( { solid: false }))

					superDroplet.onUpdate(() => {
						superDroplet.angle += 5
						superDroplet.opacity -= 0.18
					
						if (superDroplet.opacity < 0) {
							destroy(superDroplet)
						}
					})
				})				
			}
		}
	])

	let gun = add([
		sprite("gun"),
		pos(),
		origin("left"),
        follow(player, 0),
		z(layers.entity),
        rotate(mousePos().angle(player.pos.add(0, -23))),
	]);

	// #region player region
	player.onUpdate(() => {
		// #region movement
		if (isKeyDown("a") && player.canMove) {
			player.move(-player.speed, 0)
			player.facingLeft = true
			player.flipX(true)
		}

		if (isKeyDown("d") && player.canMove) {
			player.move(player.speed, 0)
			player.facingLeft = false
			player.flipX(false)
		}

		if ( ( isKeyPressed("w") || isKeyPressed("space") ) && player.canJump && player.canMove) {
			player.jump(player.jumpingForce)
			play("jump")
		}

		if (isMousePressed("left") && player.lastShoot > player.fireRate) {
			if (player.milkDroplets >= 1) {
				player.milkShoot()
			}

			else {
				shake(1)
				play("noBullets")
			}
		}

		if (isMousePressed("right") && player.lastShoot > player.fireRate) {
			if (player.milkDroplets >= 5) {
				player.superMilkShoot()
			}

			else {
				shake(1)
				play("noBullets")
			}
		}

		// #endregion

		// some other stuff
		if (player.is("body")) {
			if (player.isGrounded()) {
				player.canJump = true
			}

			else {
				player.canJump = false
			}
		}

		if (player.dead) {
			funnyAngly += 5.4
			player.angle += funnyAngly * dt()
		}

		player.lastShoot += dt()
	})
	
	// events
	player.onCollide("enemy", (enemy) => {
		if (player.canBeHurt && !enemy.dead) {
			player.hurt(1)
		}
	})

	player.onCollide("fireShoot", (fire) => {
		if (player.canBeHurt) {
			player.hurt(1)
		}
	})

	// when colliding with a powerup
	player.onCollide("powerup", (powerup) => {
		destroy(powerup)
		play("powerupPickup")
		player.milkDroplets += 10
		player.setHP(5)
	})

	player.on('hurt', () => {
		player.canBeHurt = false
		play("playerHurt")
		shake(2)
		player.opacity = 0.5
		
		wait(1, () => {
			player.canBeHurt = true			
			player.opacity = 1
		})
	})
	
	// triggers when hp reaches 0
	player.on('death', () => {
		player.canMove = false
		player.use(body( { solid: false }))
		player.jump(450)

		wait(0.8, () => {
			go("deadscene")
			play("playerDeath")
			music.stop()
		})
	})
	// #endregion

	onMouseMove((pos) => {
        gun.angle = pos.angle(gun.pos);

        if (gun.angle < -90) gun.flipY(true);
        if (gun.angle > -90) gun.flipY(false);
    });

	return player;
}