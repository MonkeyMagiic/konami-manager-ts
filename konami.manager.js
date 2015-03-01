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
var KonamiManager = (function () {
    /**
     * Konami Manager
     * @param target
     */
    function KonamiManager(target) {
        var _this = this;
        this.target = target;
        /**
         * Collection of Konami objects.
         * @type {any[]}
         */
        this._konamis = new Array();
        target.addEventListener('keydown', function (event) { return _this.target_keydown(event); }, false);
    }
    /**
     *
     * @param result
     * @param combination
     */
    KonamiManager.prototype.add = function (result, combination) {
        this._konamis.push(new Konami(result, combination));
    };
    /**
     * Window Keydown
     * @param event
     */
    KonamiManager.prototype.target_keydown = function (event) {
        var i = 0;
        do {
            this._konamis[i].testSequence(event.keyCode);
            i++;
        } while (i < this._konamis.length);
    };
    return KonamiManager;
})();
var Konami = (function () {
    /**
     * Konami
     *
     * @param result {function} handler/callback when the combination has successfully executed.
     * @param combination {array} sequence to test against.
     * @constructor
     */
    function Konami(result, combination) {
        this.result = result;
        this.combination = combination;
        /**
         * Current position in the <code>combination</code>.
         * @type {number}
         * @private
         */
        this.position = 0;
    }
    /**
     * Test a given code against the current <code>position</code>
     * within the <code>combination</code>.
     *
     * @param code symbol to test against the current <code>position</code> within the <code>combination</code>
     */
    Konami.prototype.testSequence = function (code) {
        if (this.combination[this.position++] == code) {
            if (this.position === this.combination.length) {
                this.result();
                this.position = 0;
            }
        }
        else {
            this.position = 0;
        }
    };
    return Konami;
})();
//# sourceMappingURL=konami.manager.js.map