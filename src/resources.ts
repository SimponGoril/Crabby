import { ImageSource, Loadable, Resource, Sound, SpriteSheet } from 'excalibur'
import crabSheetImage from './actors/player/crab.png'
import spiderSheetImage from './actors/enemies/spider.png'
import stoneSheetImage from './actors/items/stone.png'
import pebbleImage from './actors/player/pebble.png'
import treasureImage from './actors/items/treasure.png'
import nestImage from './actors/enemies/nest.png'
import keyImage from './actors/items/key.png'
import pileImage from './actors/items/pile.png'
import terrainSheetImage from './scenes/terrain.png'
import projectileSoundFile from './actors/player/projectile.wav'
import reloadSoundFile from './actors/player/reload.wav'
import damageSoundFile from './actors/player/damage.wav'
import treasureSoundFile from './actors/items/treasure.wav'
import walkingSoundFile from './actors/player/walking.wav'
import deathSoundFile from './actors/player/death.wav'
import spiderDeathFile from './actors/enemies/spiderDeath.wav'
import nestDeathFile from './actors/enemies/nestDeath.wav'
import spiderSpawnFile from './actors/enemies/spiderSpawn.wav'

type SoundResourceType = {
    [key: string]: Sound
 }
 
type ImageResourceType = {
    [key: string]: ImageSource
 }

const SoundResources: SoundResourceType = {
  ProjectileSound: new Sound(projectileSoundFile),
  ReloadSound: new Sound(reloadSoundFile),
  WalkingSound: new Sound(walkingSoundFile),
  DamageSound: new Sound(damageSoundFile),
  TreasureSound: new Sound(treasureSoundFile),
  DeathSound: new Sound(deathSoundFile),
  SpiderDeathSound: new Sound(spiderDeathFile),
  SpiderSpawnSound: new Sound(spiderSpawnFile),
  NestDeathSound: new Sound(nestDeathFile),
}

const ImageResources: ImageResourceType = {
    CrabSheet: new ImageSource(crabSheetImage),
    StoneSheet: new ImageSource(stoneSheetImage),
    TerrainSheet: new ImageSource(terrainSheetImage),
    PebbleSheet: new ImageSource(pebbleImage),
    KeySheet: new ImageSource(keyImage),
    TreasureSheet: new ImageSource(treasureImage),
    SpiderSheet: new ImageSource(spiderSheetImage),
    NestSheet: new ImageSource(nestImage),
    PileSheet: new ImageSource(pileImage),
}


const CrabSpriteSheet = SpriteSheet.fromImageSource({
    image:ImageResources.CrabSheet, 
    grid: { 
        columns: 4,
        rows: 4, 
        spriteWidth: 32,
        spriteHeight: 32,
    }
})

const SpiderSpriteSheet = SpriteSheet.fromImageSource({
    image:ImageResources.SpiderSheet, 
    grid: { 
        columns: 9,
        rows: 16, 
        spriteWidth: 32,
        spriteHeight: 32,
    }
})

const TerrainSpriteSheet = SpriteSheet.fromImageSource({
    image:ImageResources.TerrainSheet, 
    grid: { 
        columns: 9,
        rows: 12, 
        spriteWidth: 32,
        spriteHeight: 32
    }
})

const NestSpriteSheet = SpriteSheet.fromImageSource({
    image:ImageResources.NestSheet, 
    grid: { 
        columns: 2,
        rows: 1, 
        spriteWidth: 32,
        spriteHeight: 32
    }
})

const TreasureSpriteSheet = SpriteSheet.fromImageSource({
    image:ImageResources.TreasureSheet, 
    grid: { 
        columns: 2,
        rows: 1, 
        spriteWidth: 32,
        spriteHeight: 32
    }
})

const KeySpriteSheet = SpriteSheet.fromImageSource({
    image:ImageResources.KeySheet, 
    grid: { 
        columns: 3,
        rows: 1, 
        spriteWidth: 32,
        spriteHeight: 32
    }
})

export { ImageResources, SoundResources, CrabSpriteSheet, TerrainSpriteSheet, KeySpriteSheet, TreasureSpriteSheet, NestSpriteSheet, SpiderSpriteSheet }