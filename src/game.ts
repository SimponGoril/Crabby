import { Color, Engine, Input } from 'excalibur'
import '../index.css'
import Ui from './utils/ui'
import { prepareLoader } from './utils/utils'
import BaseScene from './scenes/baseScene'
import map1 from './scenes/maps/1.json'
import map2 from './scenes/maps/2.json'
import map3 from './scenes/maps/3.json'
import map4 from './scenes/maps/4.json'
import map5 from './scenes/maps/5.json'

class Game extends Engine {
    public ui: Ui = new Ui()
    public score: number = 0
    public currentScene!: BaseScene
    private currentLevel = 1

    public nextLevel() {
        this.currentLevel++
        this.goToScene(`level${this.currentLevel}`)
        this.ui.updateInfo('')
        this.ui.updateKey('')
    }

    public initialize() {
        const level1 = new BaseScene(map1)
        const level2 = new BaseScene(map2)
        const level3 = new BaseScene(map3)
        const level4 = new BaseScene(map4)
        const level5 = new BaseScene(map5)
        this.add('level1', level1)
        this.add('level2', level2)
        this.add('level3', level3)
        this.add('level4', level4)
        this.add('level5', level5)
        this.goToScene('level1')
        const loader = prepareLoader()

        this.backgroundColor = Color.fromHex('#1FB3FF')
        this.start(loader).then(()=> {
            this.ui.updateScore(this.score)
            this.ui.showUi(true)
        })
    }

    public updateScore(score: number) {
        this.score += score
        this.ui.updateScore(this.score)
    }

    public onPreUpdate(engine: Engine, delta: number) {
        // Game restart with ENTER button
        if (engine.input.keyboard.isHeld(Input.Keys.Enter)) {
            window.location.reload()
        }
    }
  }

new Game({canvasElementId: 'game'}).initialize()

export default Game