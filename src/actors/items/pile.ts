import { Actor, CircleCollider, CollisionType, Vector } from 'excalibur'
import Game from '../../game'
import { ImageResources } from '../../resources'

class Pile extends Actor {
    constructor(x: number, y: number) {

        super({ x: x, 
              y: y,
              z: 2,
              name: 'Pile',
              width: 32,
              height: 32,
              collider: new CircleCollider({radius: 28, offset: new Vector(0,-6)}),
              collisionType: CollisionType.Passive,
            })
    }
  
    public onInitialize(engine: Game) {
        const sprite = ImageResources.PileSheet.toSprite()
        sprite.scale = new Vector(1, 1)
        this.graphics.use(sprite)
    }
  }

export default Pile