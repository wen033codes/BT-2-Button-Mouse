input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    Sound = 5
    showSound()
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    clear(showtime)
})
function showSound () {
    music.setVolume(Sound * 28)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.EighthNote)
    basic.showNumber(Sound)
    clear(1)
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    clear(showtime)
})
input.onButtonPressed(Button.A, function () {
    if (Speed < 9) {
        Speed += 1
    } else {
        Speed = 1
    }
    SpeedMem = Speed
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.Diamond)
    basic.showNumber(Speed)
    clear(1)
})
function showScroll () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . # # # .
        . . # . .
        `)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Sound > 1) {
        Sound += -1
    } else {
        Sound = 9
    }
    showSound()
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, function () {
    CurP = false
    Speed = 0
    music.stopAllSounds()
    music.setVolume(Sound * 28)
    basic.clearScreen()
})
function clear (num: number) {
    basic.pause(num * 100)
    basic.clearScreen()
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_PIN_EVT_PULSE_LO, function () {
    BtmP = true
})
input.onButtonPressed(Button.AB, function () {
    Speed = 2
    SpeedMem = Speed
    delay = 1
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.Diamond)
    basic.showNumber(Speed)
    clear(1)
    showScroll()
    basic.showNumber(Scroll)
    clear(1)
})
input.onButtonPressed(Button.B, function () {
    if (delay < 9) {
        delay += 1
    } else {
        delay = 1
    }
    showScroll()
    basic.showNumber(delay)
    clear(1)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    if (Scroll != 0 || PressH) {
        if (PressH) {
            PressH = false
        } else {
            Scroll = 0
        }
    } else {
        mouse.click()
    }
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
    basic.clearScreen()
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_PULSE_LO, function () {
    CurP = true
    Speed = SpeedMem / 2
    music.setVolume(Sound * 28 - 20)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.LoopingInBackground)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, function () {
    BtmP = false
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    if (Cur < 4) {
        Cur += 1
    } else {
        Cur = 1
    }
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
    if (Cur == 1) {
        DirX = 0
        DirY = -1
        basic.showArrow(ArrowNames.North)
    } else if (Cur == 2) {
        DirX = 1
        DirY = 0
        basic.showArrow(ArrowNames.East)
    } else if (Cur == 3) {
        DirX = 0
        DirY = 1
        basic.showArrow(ArrowNames.South)
    } else if (Cur == 4) {
        DirX = -1
        DirY = 0
        basic.showArrow(ArrowNames.West)
    }
    Speed = SpeedMem
})
let MoveY = 0
let MoveX = 0
let Btm = 0
let DirY = 0
let DirX = 0
let Cur = 0
let PressH = false
let Scroll = 0
let BtmP = false
let CurP = false
let delay = 0
let SpeedMem = 0
let Speed = 0
let Sound = 0
let showtime = 0
mouse.startMouseService()
showtime = 50
Sound = 5
Speed = 2
SpeedMem = Speed
delay = 5
let lastScroll = 1
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Resistive)
pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Resistive)
music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
for (let index = 0; index < 2; index++) {
    basic.showLeds(`
        . # . . .
        # # # . #
        . # # . #
        . # # # .
        . # . # .
        `)
    basic.showLeds(`
        . . . . #
        . # . . #
        # # # # .
        . # # # .
        . . # . .
        `)
    basic.showLeds(`
        . # . . .
        # # # . #
        . # # . #
        . # # # .
        # . . . #
        `)
}
clear(showtime)
basic.forever(function () {
    while (BtmP) {
        Btm += 1
        if (Btm == 1) {
            music.play(music.tonePlayable(131, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        } else if (Btm == 2) {
            music.play(music.tonePlayable(165, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        } else if (Btm == 3) {
            music.play(music.tonePlayable(196, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        } else if (Btm == 4) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        } else if (Btm == 5) {
            music.play(music.tonePlayable(330, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        } else {
            BtmP = false
            basic.clearScreen()
        }
        basic.pause(500)
    }
    if (Btm == 1) {
        mouse.click()
        basic.showString("L")
    } else if (Btm == 2) {
        PressH = true
        basic.showString("H")
    } else if (Btm == 3) {
        mouse.rightClick()
        basic.showString("R")
    } else if (Btm == 4) {
        Scroll = lastScroll * -1
        lastScroll = Scroll
        showScroll()
    } else if (Btm == 5) {
        mouse.click()
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        mouse.click()
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        basic.showString("D")
    }
    Btm = 0
    MoveX = Speed * DirX
    MoveY = Speed * DirY
    if (PressH) {
        mouse.send(
        MoveX,
        MoveY,
        true,
        false,
        false,
        0,
        true
        )
    } else if (Scroll != 0) {
        mouse.scroll(Scroll)
        basic.pause(delay * 100)
    } else {
        mouse.movexy(MoveX, MoveY)
    }
})
