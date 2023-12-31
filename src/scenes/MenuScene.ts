export class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

    constructor() {
        super({
            key: 'MenuScene',
        })
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.startKey.isDown = false
        this.registry.set('score', 0)
        this.registry.set('tank', 0)
    }

    create(): void {
        this.cameras.main.setBackgroundColor('rgba(131, 105, 83)')

        const tankText = this.add
            .bitmapText(120, 0, 'font', 'TANK', 150)
            .setAlpha(0)
            .setScale(3)
            .setOrigin(0.5, 0.5)

        this.add.tween({
            targets: tankText,
            scale: 1,
            alpha: 1,
            ease: 'sine.inout',
            duration: 500,
            onComplete: () => {
                this.add.tween({
                    targets: playText,
                    x: 10,
                    y: 120,
                    alpha: 1,
                    ease: 'sine.inout',
                    duration: 500,
                })
            },
        })

        const playText = this.add.bitmapText(10, 1000, 'font', 'PRESS S TO PLAY', 30)

        this.bitmapTexts.push(tankText, playText)

        const _container = this.add.container(
            this.sys.canvas.width / 2 - 120,
            this.sys.canvas.height / 2 - 100,
            this.bitmapTexts
        )
    }

    update(): void {
        if (this.startKey.isDown) {
            const targetScene = this.scene.get('GameScene') // sleeping
            const targetCam = targetScene.cameras.main
            //this.scene.start('GameScene')

            this.scene.transition({
                target: 'GameScene',
                sleep: true,
                duration: 2000,
                onUpdate: (progress: number) => {
                    const t = Phaser.Math.Easing.Quadratic.InOut(progress)
                    this.cameras.main.setViewport(0, 0, (1 - t) * 1600, this.cameras.main.height)
                    this.cameras.main.setScroll(t * 1600, 0)
                    targetCam.setViewport((1 - t) * 1600, 0, t * 1600, targetCam.height)
                },
            })
        }
    }
}
