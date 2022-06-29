import { Engine, Scene, TileMap } from 'excalibur'
import Nest from '../actors/enemies/nest';
import Player from '../actors/player/player';
import { parseActors, parseDecals, parseTerrain } from '../utils/utils';

type TiledLayer = {
    name: string,
    data: number[]
}

type TiledMap = {
    tileheight: number,
    tilewidth: number,
    width: number,
    height: number,
    layers: TiledLayer[],
}

class BaseScene extends Scene {
    public player!: Player
    private scene
    public nests: Nest[] = []

    constructor(scene: TiledMap) {
        super()
        this.scene = scene
    }

    public onDeactivate(_oldScene: Scene, _newScene: Scene): void {
        for (let n of this.nests) {
            n.destroy()
        }
    }

    public onInitialize(engine: Engine) {
        // Create a tilemap
        const tilemap = new TileMap({
            tileWidth: this.scene.tilewidth,
            tileHeight: this.scene.tileheight,
            rows: this.scene.width,
            columns: this.scene.height,
        });

        for (let l of this.scene.layers) {
            switch (l.name) {
                case 'terrain-ground': {
                    let x = 0, y = 0
                    for (let d of l.data) {
                        const tile = tilemap.getTile(x,y)
                        x++
                        
                        parseTerrain(d, tile)
    
                        if (x === this.scene.width) {
                            x = 0
                            y++
                        }
                        
                    }
                    break
                }                
                case 'terrain-decals': {
                    let x = 0, y = 0
                    for (let d of l.data) {
                        const tile = tilemap.getTile(x,y)
                        x++
                        
                        if (d !== 0 ) parseDecals(d, tile)
    
                        if (x === this.scene.width) {
                            x = 0
                            y++
                        }
                        
                    }
                    break
                }
                case 'actors': {
                    let x = 0, y = 0
                    for (let d of l.data) {
                        const tile = tilemap.getTile(x,y)
                        x++
                        
                        parseActors(d, tile, this)
    
                        if (x === this.scene.width) {
                            x = 0
                            y++
                        }
                        
                    }   
                }
            }
        }

        this.add(tilemap)
        if (this.player) this.camera.strategy.lockToActor(this.player)
    }
}

export default BaseScene