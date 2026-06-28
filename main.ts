/**
 * This extension provides ASR blocks for the Smart AI Lens.
 */
//% color=#0031AF icon="\uf06e"
//% groups='["ASR"]'
//% block="PlanetX_ASR"
namespace PlanetX_ASR {
    export enum vocabularyList {
        //% block="Hi, Shaun"
        Hi_Shaun = 1,
        //% block="Lights on"
        Turn_on_lights = 16,
        //% block="Lights off"
        Turn_off_lights = 17,
        //% block="Turn left"
        Turn_left = 18,
        //% block="Turn right"
        Turn_right = 19,
        //% block="Full speed ahead"
        Go_forward = 20,
        //% block="Reversing"
        Go_Backwards = 21,
        //% block="Line Tracking"
        Line_tacking = 22,
        //% block="Avoid object"
        Avoid_object = 23,
        //% block="Stop"
        Stop_car = 24,
        //% block="Start device"
        Start_device = 32,
        //% block="Turn off device"
        Close_device = 33,
        //% block="Pause"
        Pause_device = 34,
        //% block="Keep going"
        Keep_going = 35,
        //% block="Raise a level"
        Add_a_level = 36,
        //% block="Lower a level"
        Lower_a_level = 37,
        //% block="Music on"
        Music_on = 38,
        //% block="Music off"
        Music_off = 39,
        //% block="Switch music"
        Switch_music = 40,
        //% block="Execute function one"
        Execute_function_one = 49,
        //% block="Execute function two"
        Execute_function_two = 50,
        //% block="Learning entry 1"
        Learning_entry_1 = 80,
        //% block="Learning entry 2"
        Learning_entry_2 = 81,
        //% block="Learning entry 3"
        Learning_entry_3 = 82,
        //% block="Learning entry 4"
        Learning_entry_4 = 83,
        //% block="Learning entry 5"
        Learning_entry_5 = 84,
        //% block="Learning entry 6"
        Learning_entry_6 = 85,
        //% block="Learning entry 7"
        Learning_entry_7 = 86,
        //% block="Learning entry 8"
        Learning_entry_8 = 87,
        //% block="Learning entry 9"
        Learning_entry_9 = 88,
        //% block="Learning entry 10"
        Learning_entry_10 = 89
    }

    let asrEventId = 3500
    let lastvoc = 0
    let vocInitFlag = 0

    //% block="ASR sensor hear %vocabulary"
    //% subcategory=ASR group="IIC Port"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% color=#00B1ED
    export function onASR(vocabulary: vocabularyList, handler: () => void) {
        control.onEvent(asrEventId, vocabulary, handler)
        if (!vocInitFlag) {
            vocInitFlag = 1
            control.inBackground(() => {
                while (true) {
                    const voc = pins.i2cReadNumber(0x0B, 1)
                    if (voc != lastvoc) {
                        lastvoc = voc
                        control.raiseEvent(asrEventId, lastvoc)
                    }
                    basic.pause(50)
                }
            })
        }
    }

    //% block="ASR sensor enter learning-model"
    //% subcategory=ASR group="IIC Port"
    //% color=#00B1ED
    export function setASRLearn(): void {
        pins.i2cWriteNumber(0x0B, 0x50, NumberFormat.Int8LE)
    }

    //% block="ASR sensor clear learned entrys"
    //% subcategory=ASR group="IIC Port"
    //% color=#00B1ED
    export function delASRLearn(): void {
        pins.i2cWriteNumber(0x0B, 0x60, NumberFormat.Int8LE)
    }
}