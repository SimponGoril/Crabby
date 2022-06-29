import { Actor, Animation, AnimationStrategy, CircleCollider, CollisionType, Engine, Input, vec, Vector } from 'excalibur'
import { CrabSpriteSheet, SoundResources } from '../../resources'
import Pile from '../items/pile'
import Projectile from './projectile'
import Spider from '../enemies/spider'
import Game from '../../game'
import Key from '../items/key'

class Player extends Actor {
    private isAttacking = false
    private isReloading = false
    private isDying = false
    private isHurt = false
    private isOnStonePile = false
    public hasKey = false
    public maxAmmo = 15
    public ammo = 5
    public health = 3

    constructor(x: number, y: number) {
        super({ x: x, 
              y: y,
              z: 4,
              name: 'Player',
              width: 54,
              height: 30,
              collider: new CircleCollider({radius: 20, offset: new Vector(0, 30)}),
              collisionType: CollisionType.Active,
            })
    }
  
    public onInitialize(engine: Game) {

        const idle = Animation.fromSpriteSheet(CrabSpriteSheet, [0,1,2,3], 100)
        idle.scale = new Vector(3, 3)
        const moving = Animation.fromSpriteSheet(CrabSpriteSheet, [4,5,6,7], 100);
        moving.scale = new Vector(3, 3)
        moving.events.on('loop', (evt) => {
            SoundResources.WalkingSound.play(0.2)
        })
        const dying = Animation.fromSpriteSheet(CrabSpriteSheet, [8,9,10,11], 100);
        dying.scale = new Vector(3, 3)
        dying.strategy = AnimationStrategy.Freeze

        const reloading = Animation.fromSpriteSheet(CrabSpriteSheet, [8,9,10,11], 100);
        reloading.scale = new Vector(3, 3)
        reloading.strategy = AnimationStrategy.PingPong
        reloading.events.on('loop', (evt) => {
            this.ammo += 1
            SoundResources.ReloadSound.play(0.2)
            engine.ui.updateAmmo(this.ammo, this.maxAmmo)
        })
        const attackRight = Animation.fromSpriteSheet(CrabSpriteSheet, [12,13,14,15], 100);
        attackRight.strategy = AnimationStrategy.Loop
        attackRight.events.on('loop', (evt) => {
            if (this.ammo) {
                this.ammo -= 1
                engine.ui.updateAmmo(this.ammo, this.maxAmmo)
                SoundResources.ProjectileSound.play(0.5)
                engine.currentScene.add(new Projectile(this.pos.x + 19, this.pos.y + 20, engine.input.pointers.primary.lastWorldPos))
            }
            
        })
        attackRight.scale = new Vector(3, 3)

        this.graphics.add('moving', moving);
        this.graphics.add('idle', idle);
        this.graphics.add('reloading', reloading);
        this.graphics.add('dying', dying);
        this.graphics.add('attackRight', attackRight);

        this.on('precollision', (evt) => this.onPreCollision(engine, evt));
        this.on('collisionend', (evt) => this.onCollisionEnd(evt))

        engine.ui.updateAmmo(this.ammo, this.maxAmmo)
        engine.ui.updateHealth(this.health)
    }

    onPreUpdate(engine: Engine, delta: number) {
        // Reset x velocity
        if (!this.isHurt) {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        if (this.isDying) return

        // Player input
        if(engine.input.keyboard.isHeld(Input.Keys.A) || 
           engine.input.keyboard.isHeld(Input.Keys.Left)) {
            this.vel.x = -170
        }

        if(engine.input.keyboard.isHeld(Input.Keys.D) || 
           engine.input.keyboard.isHeld(Input.Keys.Right)) {
            this.vel.x = 170
        }       
        
        if(engine.input.keyboard.isHeld(Input.Keys.W) || 
           engine.input.keyboard.isHeld(Input.Keys.Up)) {
            this.vel.y = -170
        }

        if(engine.input.keyboard.isHeld(Input.Keys.S) || 
           engine.input.keyboard.isHeld(Input.Keys.Down)) {
            this.vel.y = 170
        }        
        
        if(engine.input.pointers.isDown(0) && this.ammo) {
            this.isAttacking = true
            this.graphics.use('attackRight');
        } else {
            this.isAttacking = false
        }        
        
        if(engine.input.keyboard.isHeld(Input.Keys.R) && this.isOnStonePile && this.ammo < this.maxAmmo) {
            this.isReloading = true
            this.graphics.use('reloading');
        } else {
            this.isReloading = false
        }

        // Change animation based on velocity
        if (!this.isAttacking && (this.vel.x < 0 || this.vel.x > 0 || this.vel.y < 0 || this.vel.y > 0)) {
            this.graphics.use('moving');
        }
        if (!this.isAttacking && !this.isReloading && this.vel.x === 0 && this.vel.y === 0) {
            this.graphics.use('idle')
        }
    }

    private onPreCollision(engine: Game, evt: ex.PreCollisionEvent) {
        if (evt.other instanceof Spider && !this.isHurt) {
            this.health--
            engine.ui.updateHealth(this.health)
            
            if (this.health === 0) {
                SoundResources.DeathSound.play(1)
                this.graphics.use('dying')
                this.isDying = true
                this.body.collisionType = CollisionType.PreventCollision
                engine.ui.updateInfo('Game over - Press ENTER to restart')
                engine.currentScene.camera.clearAllStrategies()
            } else {
                this.isHurt = true
                SoundResources.DamageSound.play(1)
                setTimeout(() => {this.isHurt = false}, 1000)
            }
        }

        if (evt.other instanceof Pile) { 
            this.isOnStonePile = true
        }        
        
        if (evt.other instanceof Key) {
            engine.ui.updateKey('Key acquired!')
            engine.ui.updateObjective('Objective: Loot the treasure!')
            SoundResources.ReloadSound.play(0.2)
            this.hasKey = true
            evt.other.kill()
        }
    }

    private onCollisionEnd(evt: ex.CollisionEndEvent) {
        if (evt.other instanceof Pile) { 
            this.isOnStonePile = false
        }
    }
  }

export default Player