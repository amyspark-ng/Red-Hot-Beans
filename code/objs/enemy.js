import { blinkComp } from "../plugins/blink.js"
import { data, player } from "../scenes/gamescene"

export function addEnemy(enemyPos) {
	let funnyAngly = 0
	let dir = player.pos;
	
	let enemy = add([
		sprite("badBean"),
		origin("center"),
		pos(enemyPos),
		area(),
		color(),
		body(),
		opacity(1),
		health(3),  
		rotate(0), 
		"enemy",	
		"bulletDestroyer",
		"outviewer",
		{
			speed: 425,
			dead: false,
			canMove: true,
		
			fireShoot() {
				let ball = add([
					pos(this.pos),
					sprite("jalapeno"),
					area(),
					origin("center"),
					opacity(1),
					cleanup(),
					move(dir, this.speed / 2),
					rotate(0),
					"fireShoot",
				])
	
				ball.onUpdate(() => { ball.angle += 5 * dt() })

				ball.onCollide("fireDestroyer", () => {
					destroy(ball)
				})
				
				ball.onCollide("player", (player) => {
					player.hurt(1)
				})
			},
	
			/*fireBean() {
				let bean = add([
					pos(this.pos.x, this.pos.y),
					rect(50, 25),
					color(WHITE),
					area(),
					origin("center"),
					"bean",
				])
	
				wait(0.4, () => {
					destroy(bean)
				})
			}*/
		}
	])
		 
	wait(1, () => {		
		enemy.onUpdate(() => {
			dir = player.pos.sub(enemy.pos).unit()

			if (!enemy.dead) {
				if (enemy.canMove) {
					enemy.move(dir.scale(enemy.speed / 4))
				}
			}
			
			else {
				funnyAngly += 5.4
				enemy.angle += funnyAngly * dt()
				enemy.opacity -= 0.25 * dt()
			}

			if (enemy.pos.y > height() + 10) destroy(enemy)
		})
	})
	
	enemy.onCollide("bullet", () => {
		enemy.hurt(1)
	}) 

	enemy.on('hurt', () => {
		if (!enemy.dead) {
			enemy.color = WHITE
			enemy.opacity = 0.5
			shake(0.5)
			enemy.canMove = false

			wait(0.8, () => {
				enemy.canMove = true
				enemy.color = rgb()
				enemy.opacity = 1
			})	
		}
	})
				
	// triggers when hp reaches 0
	enemy.on('death', () => {
		data.score += 10
		enemy.dead = true
		enemy.use(body( { solid: false }))
		enemy.jump(450)
		play("enemyHurt")
		wait(0.1, () => {
			wait(0.8, () => {
				destroy(enemy)
			})
		})
	})

	wait(0.5, () => {
		loop(1.2, () => {
			if (!enemy.dead) {
				if (enemy.canMove) {
					enemy.jump(player.jumpingForce / 1.5)
				}
			}
		})
		loop(3, () => {
			if (!enemy.dead) {
				if (enemy.canMove) {
					enemy.fireShoot()
				}
			}
		})
	})

	return enemy;
}