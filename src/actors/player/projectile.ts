import { Actor, CircleCollider, CollisionType, Engine, vec, Vector } from 'excalibur'
import { ImageResources } from '../../resources'


class Projectile extends Actor {
    constructor(x: number, y: number, pointerCoordinates: Vector) {
        super({ x: x, 
              y: y,
              z: 3,
              name: 'Projectile',
              radius: 5,
              vel: vec(1, 1),
              collider: new CircleCollider({radius: 5, offset: new Vector(0, 0)}),
              collisionType: CollisionType.Passive,
            })
        
            this.actions.moveTo(pointerCoordinates, 300)
        setTimeout(() => {
            this.kill()
        }, 1000)
    }
  
    public onInitialize(engine: Engine) {
        this.graphics.use(ImageResources.PebbleSheet.toSprite())
    }

    public onPreUpdate(engine: Engine, delta: number) {
        if(this.vel.x === 0 || this.vel.y === 0) this.kill()
    }
  }

export default Projectile