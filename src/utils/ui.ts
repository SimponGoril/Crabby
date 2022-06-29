class Ui {
    private uiWrapper = document.getElementById('ui')
    private uiScore = document.getElementById('ui-score')
    private uiHealth = document.getElementById('ui-health')
    private uiAmmo = document.getElementById('ui-ammo')
    private uiKey = document.getElementById('ui-key')
    private uiObjective = document.getElementById('ui-objective')
    private uiInfo = document.getElementById('ui-info')
    
    constructor() {
        this.showUi(false)
    }

    public showUi(show: boolean) {
        if (show) {
            this.uiWrapper.className = ''
        } else {
            this.uiWrapper.className = 'hide'
        }
    }

    public updateHealth(health: number) {
        if (health >= 0) this.uiHealth.innerHTML = String(`Health: ${'❤️'.repeat(health)}`)
    }

    public updateAmmo(ammo: number, maxAmmo: number) {
        this.uiAmmo.innerHTML = String(`Ammo: ${ammo}/${maxAmmo}`)
    }

    public updateScore(score: number) {
        this.uiScore.innerHTML = String(`Score: ${score}`)
    }

    public updateObjective(objective: string) {
        this.uiObjective.innerHTML = objective
    }

    public updateKey(key: string) {
        this.uiKey.innerHTML = key
    }

    public updateInfo(info: string) {
        this.uiInfo.innerHTML = info
    }
}

export default Ui