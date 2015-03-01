/*
 * Konami Manager
 * Copyright 2012-2014
 * Authors: Tyrone Neill.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Tyrone Neill
 *
 * Project: https://github.com/MonkeyMagiic/konamiManager
 */
class KonamiManager {

    /**
     * Konami Manager
     * @param target
     */
    constructor(private target:EventTarget) {
        target.addEventListener('keydown', (event:KeyboardEvent) => this.target_keydown(event), false);
    }

    /**
     * Collection of Konami objects.
     * @type {any[]}
     */
    private _konamis:Array<Konami> = new Array<Konami>();

    /**
     *
     * @param result
     * @param combination
     */
    private add(result:Function, combination:Array<number>):void {
        this._konamis.push(new Konami(result, combination));
    }

    /**
     * Window Keydown
     * @param event
     */
    private target_keydown(event:KeyboardEvent) {
        var i = 0;
        do {
            this._konamis[i].testSequence(event.keyCode);
            i++;
        } while (i < this._konamis.length);
    }
}

class Konami {

    /**
     * Current position in the <code>combination</code>.
     * @type {number}
     * @private
     */
    private position:number = 0;

    /**
     * Konami
     *
     * @param result {function} handler/callback when the combination has successfully executed.
     * @param combination {array} sequence to test against.
     * @constructor
     */
    constructor(private result:Function, private combination:Array<number>) {
    }

    /**
     * Test a given code against the current <code>position</code>
     * within the <code>combination</code>.
     *
     * @param code symbol to test against the current <code>position</code> within the <code>combination</code>
     */
    public testSequence(code:number):void {
        if (this.combination[this.position++] == code) {
            if (this.position === this.combination.length) {
                this.result();
                this.position = 0;
            }
        }
        else {
            this.position = 0;
        }
    }

}