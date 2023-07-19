(()=>{"use strict";var e,t={99:(e,t,s)=>{s.d(t,{v:()=>x}),s(260);class i extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("MenuScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class a extends Phaser.GameObjects.Container{constructor(e){super(e.scene,e.x,e.y),this.scaleRatio=e.scale,this.button=e.scene.add.sprite(0,0,e.key).setInteractive(),this.button.setScale(this.scaleRatio),this.add(this.button),this.text=e.scene.add.bitmapText(0,0,"font",e.text,27),this.text.setOrigin(.5),this.add(this.text),this.callback=e.callback,e.scene.add.existing(this),this.button.on("pointerdown",this.onPointerDown,this).on("pointerover",this.onPointerOver,this).on("pointerup",this.onPointerUp,this).on("pointerout",this.onPointerOut,this)}onPointerDown(){this.button.setScale(.9*this.scaleRatio)}onPointerOver(){this.button.setAlpha(.8)}onPointerUp(){this.button.setScale(this.scaleRatio),this.button.setAlpha(1),this.callback()}onPointerOut(){this.button.setAlpha(1)}enableBounce(){this.scene.tweens.add({targets:this,scale:.9,yoyo:!0,repeat:-1,duration:250,ease:"Quad.easeInOut"})}setTexture(e){this.button.setTexture(e)}}class h extends Phaser.Scene{constructor(){super({key:"GameOverScene"}),localStorage.getItem("high-score")||localStorage.setItem("high-score","0")}create(){this.cameras.main.setBackgroundColor("rgba(131, 105, 83)");const e=this.add.bitmapText(-240,0,"font","GAME OVER",100),t=this.add.bitmapText(-210,150,"font","POINTS:\nDESTROYED:\nSCORE:\nBEST SCORE:",50,0),s=this.add.text(200,150,this.registry.get("score"),{fontSize:"50px",color:"#fff"}),i=this.add.text(200,210,this.registry.get("tank"),{fontSize:"50px",color:"#fff"}).setAlpha(0),h=this.add.text(200,270,"0",{fontSize:"50px",color:"#fff"}).setAlpha(0),n=this.add.text(200,330,localStorage.getItem("high-score"),{fontSize:"50px",color:"#fff"}).setAlpha(0);this.tweens.add({targets:{score:"0"},score:this.registry.get("score"),duration:1e3,autoDestroy:!0,ease:"Power1",onUpdate:function(e){s.text=Math.round(e.targets[0].score).toString()},onComplete:()=>{i.setAlpha(1),this.tweens.add({targets:{tank:"0"},tank:this.registry.get("tank"),duration:500,autoDestroy:!0,ease:"sine.in",onUpdate:function(e){i.text=Math.round(e.targets[0].tank).toString()+" x20"},onComplete:()=>{const e=parseInt(localStorage.getItem("high-score")),t=this.registry.get("score")+20*this.registry.get("tank");h.setText(t.toString()).setAlpha(1),e<t?(localStorage.setItem("high-score",t),n.setText(t.toString()).setAlpha(1)):n.setText(e.toString()).setAlpha(1),this.retryButton.enableBounce()}})}}),this.retryButton=new a({scene:this,x:30,y:500,key:"restart",text:"",scale:.25,callback:()=>{this.scene.bringToTop("HUDScene"),this.scene.transition({target:"GameScene",duration:1e3,moveBelow:!0,onUpdate:this.transitionOut})}}),this.add.container(800,300,[e,t,s,i,n,h,this.retryButton])}transitionOut(e){this.cameras.main.y=1e3*e}}class n extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.rotation=e.rotation,this.initImage(),this.scene.add.existing(this)}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}update(){}}class r extends Phaser.GameObjects.Image{getBullets(){return this.bullets}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.initImage(),this.scene.add.existing(this)}initImage(){this.health=1,this.lastShoot=0,this.speed=200,this.setOrigin(.5,.5),this.setDepth(0),this.angle=180,this.barrel=this.scene.add.image(this.x,this.y,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.barrel.angle=180,this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.cursors=this.scene.input.keyboard.createCursorKeys(),this.upKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.downKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.leftKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.rightKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),this.rotateKeyLeft=this.cursors.left,this.rotateKeyRight=this.cursors.right,this.shootingKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleInput(),this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleInput(){this.upKey.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.speed,this.body.velocity):this.downKey.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,-this.speed,this.body.velocity):this.body.setVelocity(0,0),this.leftKey.isDown?(console.log(11),this.rotation-=.1):this.rightKey.isDown&&(this.rotation+=.1),this.scene.input.on("pointermove",(e=>{if(this.scene){const t=Phaser.Math.Angle.BetweenPoints(this,{x:e.x+this.scene.cameras.main.scrollX,y:e.y+this.scene.cameras.main.scrollY});this.barrel.rotation=t+Math.PI/2}}))}handleShooting(){this.scene&&this.shootingKey.isDown&&this.scene.time.now>this.lastShoot&&(this.scene.cameras.main.shake(20,.005),x.soundManager.playSound("beam"),this.scene.tweens.add({targets:this,props:{alpha:.8},delay:0,duration:5,ease:"Power1",easeParams:null,hold:0,repeat:0,repeatDelay:0,yoyo:!0,paused:!1}),this.bullets.getLength()<10&&(this.bullets.add(new n({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+80))}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(x.soundManager.playSound("pickup"),this.health-=.05,this.redrawLifebar()):(x.soundManager.playSound("death"),this.health=0,this.active=!1)}}class o extends Phaser.GameObjects.Image{getBarrel(){return this.barrel}getBullets(){return this.bullets}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.initContainer(),this.scene.add.existing(this)}initContainer(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelRed"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(x.soundManager.playSound("beam"),this.bullets.add(new n({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+400)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.scene.events.emit("scoreChanged",5),this.health-=.05,this.redrawLifebar()):(x.soundManager.playSound("explosion"),this.scene.registry.values.tank+=1,this.health=0,this.active=!1)}}class l extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}class c extends Phaser.Scene{constructor(){super({key:"GameScene"})}init(){}create(){this.cameras.main.fadeIn(500,0,0,0),x.soundManager.addSound("beam",this.sound.add("beam")),x.soundManager.addSound("explosion",this.sound.add("explosion")),x.soundManager.addSound("pickup",this.sound.add("pickup")),x.soundManager.addSound("death",this.sound.add("death")),this.events.emit("resetScore"),this.map=this.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),this.layer=this.map.createLayer("tileLayer",this.tileset,0,0).setPipeline("Light2D"),this.layer.setCollisionByProperty({collide:!0}),this.obstacles=this.add.group({runChildUpdate:!0}),this.enemies=this.add.group({}),this.convertObjects(),this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player,this.obstacles),this.physics.add.collider(this.player.getBullets(),this.layer,(e=>this.bulletHitLayer(e)),void 0,this),this.physics.add.collider(this.player.getBullets(),this.obstacles,((e,t)=>this.bulletHitObstacles(e,t)),void 0,this),this.enemies.children.each((e=>{this.physics.add.overlap(this.player.getBullets(),e,((e,t)=>this.playerBulletHitEnemy(e,t)),void 0,this),this.physics.add.overlap(e.getBullets(),this.player,((e,t)=>this.enemyBulletHitPlayer(e,t)),void 0),this.physics.add.collider(e.getBullets(),this.obstacles,((e,t)=>this.bulletHitObstacles(e,t)),void 0),this.physics.add.collider(e.getBullets(),this.layer,(e=>this.bulletHitLayer(e)),void 0)}),this),this.cameras.main.startFollow(this.player,!1,1,1,-480,-360),this.minimap=this.cameras.add(1400,1e3,200,200).setZoom(.15).setName("mini"),this.minimap.setBackgroundColor(8772),this.minimap.startFollow(this.player,!1,1,1,-420,-360).setBackgroundColor("rgba(255,255,0,0.5)"),this.lights.enable(),this.lights.setAmbientColor(8421504);const e=this.lights.addLight(400,300,200).setIntensity(3);this.input.on("pointermove",(t=>{e.x=t.x+this.cameras.main.scrollX,e.y=t.y+this.cameras.main.scrollY})),this.input.on("pointerdown",(t=>{e.setColor(16777215)}))}update(){this.player.update(),this.enemies.children.each((e=>{if(e.update(),this.player.active&&e.active){const t=Phaser.Math.Angle.Between(e.body.x,e.body.y,this.player.body.x,this.player.body.y);e.getBarrel().angle=(t+Math.PI/2)*Phaser.Math.RAD_TO_DEG}}),this)}convertObjects(){this.map.getObjectLayer("objects").objects.forEach((e=>{if("player"===e.type)this.player=new r({scene:this,x:e.x,y:e.y,texture:"tankBlue"});else if("enemy"===e.type){const t=new o({scene:this,x:e.x,y:e.y,texture:"tankRed"});this.enemies.add(t)}else{const t=new l({scene:this,x:e.x,y:e.y-40,texture:e.type});this.obstacles.add(t)}}))}bulletHitLayer(e){e.destroy()}bulletHitObstacles(e,t){e.destroy()}enemyBulletHitPlayer(e,t){e.destroy(),t.updateHealth(),0==t.active&&(this.events.emit("gameover"),this.cameras.main.fadeOut(1e3,0,0,0),this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(()=>{this.time.delayedCall(1e3,(()=>{this.scene.moveDown("HUDScene"),this.scene.start("GameOverScene")}))})))}playerBulletHitEnemy(e,t){e.destroy(),t.updateHealth()}}class d extends Phaser.Scene{constructor(){super({key:"HUDScene"})}create(){this.pauseButton=new a({scene:this,x:70,y:50,key:"pause",text:"",scale:.15,callback:()=>{this.scene.pause("GameScene"),this.scene.pause("HUDScene"),this.scene.launch("PauseScene"),this.pauseButton.setAlpha(0)}}),this.scoreLabel=this.add.text(1300,30,"Score: 0",{fontSize:"44px",color:"#000"});const e=this.scene.get("GameScene");e.events.on("scoreChanged",(e=>{const t=this.registry.values.score+e;this.registry.values.score+=e,this.scoreLabel.setText(`Score: ${t}`)})),e.events.on("resetScore",(()=>{this.registry.values.score=0,this.registry.values.tank=0,this.scoreLabel.setText("Score: 0")})),e.events.on("gameover",(()=>{this.pauseButton.setAlpha(0),this.time.delayedCall(2e3,(()=>this.pauseButton.setAlpha(1)))})),this.scene.get("PauseScene").events.on("resume",(()=>{this.pauseButton.setAlpha(1)}))}}class u extends Phaser.Scene{constructor(){super({key:"MenuScene"}),this.bitmapTexts=[]}init(){this.startKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.startKey.isDown=!1,this.registry.set("score",0),this.registry.set("tank",0)}create(){this.cameras.main.setBackgroundColor("rgba(131, 105, 83)");const e=this.add.bitmapText(120,0,"font","TANK",150).setAlpha(0).setScale(3).setOrigin(.5,.5);this.add.tween({targets:e,scale:1,alpha:1,ease:"sine.inout",duration:500,onComplete:()=>{this.add.tween({targets:t,x:10,y:120,alpha:1,ease:"sine.inout",duration:500})}});const t=this.add.bitmapText(10,1e3,"font","PRESS S TO PLAY",30);this.bitmapTexts.push(e,t),this.add.container(this.sys.canvas.width/2-120,this.sys.canvas.height/2-100,this.bitmapTexts)}update(){this.startKey.isDown&&(this.scene.start("HUDScene"),this.scene.start("GameScene"),this.scene.bringToTop("HUDScene"))}}class p extends Phaser.Scene{constructor(){super({key:"PauseScene"})}create(){this.cameras.main.setBackgroundColor("rgba(255,255,255,0.4)");const e=this.add.text(-150,0,"PAUSED",{fontSize:"84px",color:"#000",fontStyle:"bold"});this.resumeButton=new a({scene:this,x:0,y:250,key:"button",text:"CONTINUE",scale:1.35,callback:()=>{this.scene.stop("PauseScene"),this.scene.resume("HUDScene"),this.scene.resume("GameScene"),this.events.emit("resume")}}),this.restartButton=new a({scene:this,x:0,y:350,key:"button",text:"RESTART",scale:1.35,callback:()=>{this.scene.stop("PauseScene"),this.scene.start("HUDScene"),this.scene.start("GameScene"),this.events.emit("resume")}}),this.soundButton=new a({scene:this,x:0,y:450,key:this.sound.mute?"sound-off":"sound-on",text:"",scale:.3,callback:()=>{this.handleUpdateSound()}}),this.add.container(800,300,[e,this.resumeButton,this.restartButton,this.soundButton])}handleUpdateSound(){this.sound.mute?(this.sound.mute=!1,this.soundButton.setTexture("sound-on")):(this.sound.mute=!0,this.soundButton.setTexture("sound-off"))}}const y={title:"Tank",url:"https://github.com/digitsensitive/phaser3-typescript",version:"2.0",width:1600,height:1200,zoom:.6,type:Phaser.AUTO,parent:"game",scene:[i,u,c,d,p,h],input:{keyboard:!0},scale:{parent:"phaser-game",mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},backgroundColor:"#000000",render:{pixelArt:!1,antialias:!0}};class g{constructor(){this.soundList=new Map}static getInstance(){return g.instance||(g.instance=new g),g.instance}addSound(e,t){this.soundList.set(e,t)}getSound(e){return this.soundList.has(e)&&this.soundList.get(e),null}playSound(e){var t;this.soundList.has(e)&&(null===(t=this.soundList.get(e))||void 0===t||t.play())}}class m{constructor(){this.soundManager=g.getInstance()}static getInstance(){return m.instance||(m.instance=new m),m.instance}}class b extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new b(y)}));const x=m.getInstance()}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var h=s[e]={exports:{}};return t[e].call(h.exports,h,h.exports,i),h.exports}i.m=t,e=[],i.O=(t,s,a,h)=>{if(!s){var n=1/0;for(c=0;c<e.length;c++){for(var[s,a,h]=e[c],r=!0,o=0;o<s.length;o++)(!1&h||n>=h)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(r=!1,h<n&&(n=h));if(r){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}h=h||0;for(var c=e.length;c>0&&e[c-1][2]>h;c--)e[c]=e[c-1];e[c]=[s,a,h]},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,h,[n,r,o]=s,l=0;if(n.some((t=>0!==e[t]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(o)var c=o(i)}for(t&&t(s);l<n.length;l++)h=n[l],i.o(e,h)&&e[h]&&e[h][0](),e[h]=0;return i.O(c)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[216],(()=>i(99)));a=i.O(a)})();