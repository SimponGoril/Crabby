import { Animation, AnimationStrategy, CircleCollider, CollisionType, Engine, PreCollisionEvent, Vector } from 'excalibur'
import { SpiderSpriteSheet, SoundResources } from '../../resources'
import { getRandomIntInclusive } from '../../utils/utils'
import AgroArea from './agroArea'
import Enemy from './enemy'
import Projectile from '../player/projectile'
import Game from '../../game'

class Spider extends Enemy {
    public isActive = false
    private isDying = false

    constructor(x: number, y: number, isActive: boolean = false) {
        super({
              x: x, 
              y: y,
              z: 3,
              name: 'Spider',
              width: 32,
              height: 32,
              collider: new CircleCollider({radius: 10, offset: new Vector(0, 32)}),
              collisionType: CollisionType.Active,
            })
        this.agroArea = new AgroArea(this, 150)
        this.isActive = isActive
    }
  
    public onInitialize(engine: Game) {
        const idle = Animation.fromSpriteSheet(SpiderSpriteSheet, [0,1,2,3,4], 100)
        idle.scale = new Vector(3, 3)
        const moving = Animation.fromSpriteSheet(SpiderSpriteSheet, [9,10,11,12,13,14], 100);
        moving.scale = new Vector(3, 3)
     
        const death = Animation.fromSpriteSheet(SpiderSpriteSheet, [54,55,56,57,58,59,60], 100);
        death.scale = new Vector(3, 3)
        death.strategy = AnimationStrategy.Freeze

        this.graphics.add('idle', idle);
        this.graphics.add('death', death);
        this.graphics.add('moving', moving);
        this.graphics.use('idle')

        engine.currentScene.add(this.agroArea)
        this.on('precollision', (evt) => this.onPreCollision(engine, evt))

        setInterval(() => {
            if (!this.isDying && this.isActive) this.move(engine)
        }, getRandomIntInclusive(2000, 3000))
    }

    public onPreUpdate(engine: Game, delta: number) {
        if (this.isDying) {
            this.actions.clearActions()     
            this.graphics.use('death')
            return
        }
        // Change animation based on velocity
        if (this.vel.x < 0 || this.vel.x > 0) {
            this.graphics.use('moving');
        } 

        if (this.vel.x === 0 && this.vel.y === 0) {
            this.graphics.use('idle')
        }
    }

    private onPreCollision(engine: Game, evt: PreCollisionEvent) {
        if (evt.other instanceof Projectile) {
            this.isDying = true
            this.body.collisionType = CollisionType.PreventCollision
            evt.other.kill()
            engine.updateScore(100)
            SoundResources.SpiderDeathSound.play(1)
            setTimeout(() => {
                this.kill()
                this.agroArea.kill()
            }, 2000)
        }
    }

    private move(engine: Game) {
        if (this.isDying) {
            this.actions.clearActions()
        } else {
            this.actions.meet(engine.currentScene.player, 100)
        }   
    }
  }

export default Spider