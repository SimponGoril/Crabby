import { Color, Loader, Resource, Sprite, Tile } from 'excalibur'
import Nest from '../actors/enemies/nest'
import Pile from '../actors/items/pile'
import Player from '../actors/player/player'
import Spider from '../actors/enemies/spider'
import Stone from '../actors/items/stone'
import { SoundResources, ImageResources, TerrainSpriteSheet } from '../resources'
import { LOADER_LOGO } from '../../logo'
import Treasure from '../actors/items/treasure'
import Key from '../actors/items/key'
import BaseScene from '../scenes/baseScene'

export const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

export const prepareLoader = (): Loader => {
    const loader = new Loader()
    loader.backgroundColor = '#00B6FF'
    loader.loadingBarColor = Color.fromHex('#5F5153')
    loader.logo = LOADER_LOGO
    loader.logoWidth = 600
    loader.logoHeight = 320
    loader.startButtonFactory = () => {
        let startButton = document.createElement('button')
        startButton.textContent = 'Play'
        return startButton
    }

    for (let r in SoundResources) {
        loader.addResource(SoundResources[r])
    }    
    
    for (let i in ImageResources) {
        loader.addResource(ImageResources[i])
    }

    return loader
}

export const parseDecals = (n: number, tile: Tile) => {
    const decalMapping: any = {
        56: TerrainSpriteSheet.getSprite(1, 6),
        57: TerrainSpriteSheet.getSprite(2, 6),
        65: TerrainSpriteSheet.getSprite(1, 7),
        66: TerrainSpriteSheet.getSprite(2, 7),
        91: TerrainSpriteSheet.getSprite(0, 10),
        93: TerrainSpriteSheet.getSprite(2, 10),
        92: TerrainSpriteSheet.getSprite(1, 10),
        75: TerrainSpriteSheet.getSprite(2, 8),
        82: TerrainSpriteSheet.getSprite(0, 9),
        84: TerrainSpriteSheet.getSprite(2, 9),
        73: TerrainSpriteSheet.getSprite(0, 8),
        74: TerrainSpriteSheet.getSprite(1, 8),
        83: TerrainSpriteSheet.getSprite(1, 9),
    }

    const sprite = decalMapping[n]

    if (sprite) {
        tile.addGraphic(sprite)
    }
}

export const parseTerrain = (n: number, tile: Tile) => {
    const tileMapping: any = {
        shoreLeftCornerUp: TerrainSpriteSheet.getSprite(3, 8),
        shoreLeft: TerrainSpriteSheet.getSprite(3, 9),
        shoreLeftCornerDown: TerrainSpriteSheet.getSprite(3, 10),
        shoreRightCornerUp: TerrainSpriteSheet.getSprite(5, 8),
        shoreRight: TerrainSpriteSheet.getSprite(5, 9),
        shoreRightCornerDown: TerrainSpriteSheet.getSprite(5, 10),
        shoreTop: TerrainSpriteSheet.getSprite(4, 8),
        shoreBottom: TerrainSpriteSheet.getSprite(4, 10),
        innerShoreRightBottom: TerrainSpriteSheet.getSprite(4, 6),
        innerShoreLeftBottom: TerrainSpriteSheet.getSprite(5, 6),
        innerShoreRightTop: TerrainSpriteSheet.getSprite(4, 7),
        innerShoreLeftTop: TerrainSpriteSheet.getSprite(5, 7),
        sand: TerrainSpriteSheet.getSprite(4, 9),     
    }

    switch (n) {
        case 76: {
            tile.addGraphic(tileMapping['shoreLeftCornerUp'])
            tile.solid = true
            break
        } 
        case 77: {
            tile.addGraphic(tileMapping['shoreTop'])
            tile.solid = true
            break
        }
        case 78: {
            tile.addGraphic(tileMapping['shoreRightCornerUp'])
            tile.solid = true
            break
        }
        case 85: {
            tile.addGraphic(tileMapping['shoreLeft'])
            tile.solid = true
            break
        } 
        case 86: {
            tile.addGraphic(tileMapping['sand'])
            break
        }         
        case 87: {
            tile.addGraphic(tileMapping['shoreRight'])
            tile.solid = true
            break
        }                 
        case 59: {
            tile.addGraphic(tileMapping['innerShoreRightBottom'])
            tile.solid = true
            break
        }                  
        case 60: {
            tile.addGraphic(tileMapping['innerShoreLeftBottom'])
            tile.solid = true
            break
        }                  
        case 68: {
            tile.addGraphic(tileMapping['innerShoreRightTop'])
            tile.solid = true
            break
        }                  
        case 69: {
            tile.addGraphic(tileMapping['innerShoreLeftTop'])
            tile.solid = true
            break
        }                 
        case 94: {
            tile.addGraphic(tileMapping['shoreLeftCornerDown'])
            tile.solid = true
            break
        }                 
        case 95: {
            tile.addGraphic(tileMapping['shoreBottom'])
            tile.solid = true
            break
        }                 
        case 96: {
            tile.addGraphic(tileMapping['shoreRightCornerDown'])
            tile.solid = true
            break
        } 
        default: {
            break                    
        }
    }
}

export const parseActors = (n: number, tile: Tile, scene: BaseScene) => {
    switch (n) {
        case 109: {
            scene.player = new Player(tile.pos.x + 16, tile.pos.y - 16)
            scene.add(scene.player)
            break
        }
        case 110: {
            const spider = new Spider(tile.pos.x + 16, tile.pos.y - 16)
            scene.add(spider)
            break
        }
        case 111: {
            const nest = new Nest(tile.pos.x + 16, tile.pos.y + 16)
            scene.nests.push(nest)
            scene.add(nest)
            break
        }
        case 112: {
            const stone = new Stone(tile.pos.x + 16, tile.pos.y + 16)
            scene.add(stone)
            break
        }
        case 113: {
            const pile = new Pile(tile.pos.x + 16, tile.pos.y + 16)
            scene.add(pile)
            break
        }        
        case 114: {
            const treasure = new Treasure(tile.pos.x + 16, tile.pos.y + 16)
            scene.add(treasure)
            break
        }        
        case 115: {
            const key = new Key(tile.pos.x + 16, tile.pos.y + 16)
            scene.add(key)
            break
        }
    }
}