import { Actor, CircleCollider, CollisionType, Color, Engine, ImageSource, Input, Loader, range, Shape, Sprite, SpriteSheet, Vector } from 'excalibur'
import Game from '../../game'
import Player from '../player/player'
import Projectile from '../player/projectile'
import Enemy from './enemy'

class AgroArea extends Actor {
    private subject: Enemy

    constructor(subject: Enemy, radius: number) {
        
        super({ x: subject.pos.x, 
              y: subject.pos.y - 32,
              z: 2,
              name: 'AgroArea',
              radius: radius,
              collider: new CircleCollider({radius: radius, offset: new Vector(0,-6)}),
              collisionType: CollisionType.Passive,
            })
        this.subject = subject
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    public onPreUpdate(engine: Game, delta: number) { 
      this.pos.x = this.subject.pos.x
      this.pos.y = this.subject.pos.y + 32
    }


    private onPreCollision(evt: ex.PreCollisionEvent) {
      if (evt.other instanceof Player || evt.other instanceof Projectile) {
        this.subject.isActive = true
      }
    }
  }

export default AgroArea