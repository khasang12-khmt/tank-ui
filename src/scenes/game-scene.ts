import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'
import { Obstacle } from '../objects/obstacles/obstacle'
import { Bullet } from '../objects/bullet'

export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private target: Phaser.Math.Vector2

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    init(): void {
        return
    }

    create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })

        this.tileset = this.map.addTilesetImage('tiles')
        this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0)
        this.layer.setCollisionByProperty({ collide: true })

        this.obstacles = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true,
        })

        this.enemies = this.add.group({
            /*classType: Enemy*/
        })
        this.convertObjects()

        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer)
        this.physics.add.collider(this.player, this.obstacles)

        // collider for bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.layer,
            (a) => this.bulletHitLayer(a as Bullet),
            undefined,
            this
        )

        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            (a, b) => this.bulletHitObstacles(a as Bullet, b as Obstacle),
            undefined,
            this
        )

        this.enemies.children.each((enemy: any) => {
            this.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                (a, b) => this.playerBulletHitEnemy(a as Bullet, b as Enemy),
                undefined,
                this
            )
            this.physics.add.overlap(
                enemy.getBullets(),
                this.player,
                (a, b) => this.enemyBulletHitPlayer(a as Bullet, b as Player),
                undefined
            )

            this.physics.add.collider(
                enemy.getBullets(),
                this.obstacles,
                (a, b) => this.bulletHitObstacles(a as Bullet, b as Obstacle),
                undefined
            )
            this.physics.add.collider(
                enemy.getBullets(),
                this.layer,
                (a) => this.bulletHitLayer(a as Bullet),
                undefined
            )
        }, this)

        this.cameras.main.startFollow(this.player)
    }

    update(): void {
        this.player.update()

        this.enemies.children.each((enemy: any) => {
            enemy.update()
            if (this.player.active && enemy.active) {
                const angle = Phaser.Math.Angle.Between(
                    enemy.body.x,
                    enemy.body.y,
                    this.player.body.x,
                    this.player.body.y
                )

                enemy.getBarrel().angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
            }
        }, this)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects').objects as any[]

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue',
                })
            } else if (object.type === 'enemy') {
                const enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed',
                })

                this.enemies.add(enemy)
            } else {
                const obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type,
                })

                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer(bullet: Bullet): void {
        bullet.destroy()
    }

    private bulletHitObstacles(bullet: Bullet, obstacle: Obstacle): void {
        bullet.destroy()
    }

    private enemyBulletHitPlayer(bullet: Bullet, player: Player): void {
        bullet.destroy()
        player.updateHealth()
    }

    private playerBulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
        bullet.destroy()
        enemy.updateHealth()
    }
}
