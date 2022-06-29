import { Actor, CircleCollider, CollisionType, Vector } from 'excalibur'
import Game from '../../game'
import { ImageResources } from '../../resources'

class Stone extends Actor {
    constructor(x = 700, y = 300) {

        super({ x: x, 
              y: y,
              z: 3,
              name: 'Stone',
              radius: 15,
              collider: new CircleCollider({radius: 14, offset: new Vector(0,-6)}),
              collisionType: CollisionType.Active,
            })
    }
  
    public onInitialize(game: Game) {
        const sprite = ImageResources.StoneSheet.toSprite()
        sprite.scale = new Vector(1, 1)
        this.graphics.use(sprite)
    }
  }

export default Stone