import { Actor, Animation, CircleCollider, CollisionType, PreCollisionEvent, Vector } from 'excalibur'
import Game from '../../game'
import { SoundResources, TreasureSpriteSheet } from '../../resources'
import Player from '../player/player'

class Treasure extends Actor {
    constructor(x: number, y: number) {
      super({ x: x, 
              y: y,
              z: 3,
              name: 'Treasure',
              radius: 15,
              collider: new CircleCollider({radius: 14, offset: new Vector(0,-6)}),
              collisionType: CollisionType.Active,
            })
    }
  
    public onInitialize(engine: Game) {
      const open = Animation.fromSpriteSheet(TreasureSpriteSheet, [1], 100)
      this.graphics.add('open', open)
      const closed = Animation.fromSpriteSheet(TreasureSpriteSheet, [0], 100)
      this.graphics.add('closed', closed)
      this.graphics.use('closed')
      this.on('precollision', (evt) => this.onPreCollision(engine, evt));
    }

    private onPreCollision(engine: Game, evt: PreCollisionEvent) {
      if (evt.other instanceof Player) { 
          if (evt.other.hasKey) {
            this.graphics.use('open')
            this.body.collisionType = CollisionType.PreventCollision
            SoundResources.TreasureSound.play(1)
            engine.ui.updateInfo('Level completed!')
            setTimeout(() => {
              engine.nextLevel()
            }, 2000)
            
          }
      }
    }
  }

export default Treasure