import { Actor, Animation, AnimationStrategy, CircleCollider, CollisionType, Vector } from 'excalibur'
import Game from '../../game'
import { KeySpriteSheet } from '../../resources'

class Key extends Actor {
    constructor(x: number, y: number) {

        super({ x: x, 
              y: y,
              z: 3,
              name: 'Key',
              radius: 15,
              collider: new CircleCollider({radius: 14, offset: new Vector(0,-6)}),
              collisionType: CollisionType.Active,
            })
    }
  
    public onInitialize(engine: Game) {
      const idle = Animation.fromSpriteSheet(KeySpriteSheet, [0, 1, 2], 100)
      idle.strategy = AnimationStrategy.PingPong
      this.graphics.use(idle)
      engine.ui.updateObjective('Objective: Get the key!')
    }

  }

export default Key