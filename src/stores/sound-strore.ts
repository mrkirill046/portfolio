import {makeAutoObservable, runInAction} from "mobx"

class SoundStore {
    soundEnabled = true
    hasHydrated = false

    constructor() {
        makeAutoObservable(this)
    }

    hydrate() {
        const saved = localStorage.getItem("sound_enabled")

        if (saved !== null) {
            runInAction(() => {
                this.soundEnabled = JSON.parse(saved)
                this.hasHydrated = true
            })
        } else {
            this.hasHydrated = true
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled
        this.save()
    }

    save() {
        localStorage.setItem("sound_enabled", JSON.stringify(this.soundEnabled))
    }
}

export const soundStore = new SoundStore()
