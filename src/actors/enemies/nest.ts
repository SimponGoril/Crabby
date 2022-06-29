import { Animation, CircleCollider, CollisionType, Engine, PreCollisionEvent } from 'excalibur'
import { NestSpriteSheet, SoundResources } from '../../resources'
import Spider from './spider'
import Stone from '../items/stone'
import Enemy from './enemy'
import AgroArea from './agroArea'

class Nest extends Enemy {
    private spawningInterval: number = 0
    private spawnedSpiders = 0
    private MAX_SPIDERS = 7

    constructor(x: number, y: number) {
        super({ x: x, 
              y: y,
              z: 2,
              name: 'Nest',
              width: 32,
              height: 32,
              collider: new CircleCollider({radius: 32}),
              collisionType: CollisionType.Passive,
            })
        this.on('precollision', (evt) => this.onPreCollision(evt))
        this.agroArea = new AgroArea(this, 300)
    }
  
    public onInitialize(engine: Engine) {
        this.spawningInterval = setInterval(() => {
            if (this.isActive) {
              engine.currentScene.add(new Spider(this.pos.x, this.pos.y - 40, true))
              this.spawnedSpiders += 1
              SoundResources.SpiderSpawnSound.play(1)
            }

            if (this.spawnedSpiders === this.MAX_SPIDERS) {
              this.destroy()
            }
        }, 2000)

        const open = Animation.fromSpriteSheet(NestSpriteSheet, [0], 100)
        this.graphics.add('open', open)
        
        const closed = Animation.fromSpriteSheet(NestSpriteSheet, [1], 100)
        this.graphics.add('closed', closed)
        this.graphics.use('open')

        engine.currentScene.add(this.agroArea)
    }

    private onPreCollision(evt: PreCollisionEvent) {
      if (evt.other instanceof Stone) {
        evt.other.kill()
        this.destroy()
      }
    }

    public destroy() {
      SoundResources.NestDeathSound.play(1)
      this.graphics.use('closed')
      clearInterval(this.spawningInterval)
      this.body.collisionType = CollisionType.PreventCollision
    }
  }

export default Nest