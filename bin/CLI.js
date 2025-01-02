"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const readline = require("readline");
const Color_1 = require("./Color");
/**
 * ***CLI***
 */
class CLI {
    static getIndentBr() {
        if (!this.indent)
            return "\n";
        let indentStr = "\n";
        for (let n = 0; n < this.indent; n++) {
            indentStr += " ";
        }
        return indentStr;
    }
    static __getArgs() {
        let options = {
            _any: [],
        };
        let field = null;
        for (let n = 0; n < process.argv.length; n++) {
            if (n == 0 || n == 1)
                continue;
            let a = process.argv[n];
            if (a.indexOf("--") === 0) {
                if (field) {
                    options[field] = true;
                }
                field = a.substring(2);
            }
            else {
                if (!field) {
                    options._any.push(a);
                    continue;
                }
                options[field] = a;
                field = null;
            }
        }
        if (field)
            options[field] = true;
        return options;
    }
    /**
     * ***getArgsOPtion*** : Get option setting value from command argument value.
     * @returns
     */
    static getArgsOPtion() {
        return this.getArgsOption();
    }
    /**
     * ***getArgsOption*** : Get option setting value from command argument value.
     * @returns
     */
    static getArgsOption() {
        const args = this.__getArgs();
        delete args._any;
        return args;
    }
    /**
     * ***getArgs*** : Get command argument value.
     * @returns
     */
    static getArgs() {
        return this.__getArgs()._any;
    }
    /**
     * ***setIndent*** : Setting the indent amount
     * Used when changing the number of indents after opening
     * @param {number} indent Indent
     * @returns
     */
    static setIndent(indent) {
        this.indent = indent;
        return CLI;
    }
    static setColorOrigin(string, rgb) {
        return "\x1b[38;2;" + rgb[0] + ";" + rgb[1] + ";" + rgb[2] + "m" + string + "\x1b[39m";
    }
    static setColor(string, color) {
        return this.setColorOrigin(string, Color_1.ColorRGB[color]);
    }
    static out(string, color) {
        if (color)
            string = this.setColor(string, color);
        process.stdout.write(string);
        return CLI;
    }
    ;
    static outn(string, color) {
        string = string + this.setBr();
        return CLI.out(string, color);
    }
    /**
     * ***br*** : Newline stdout.
     * @returns {CLI}
     */
    static br() {
        return CLI.out(this.getIndentBr());
    }
    static setBr() {
        return this.getIndentBr();
    }
    static in(string, color) {
        if (string)
            CLI.out(string, color);
        CLI.out(" :", color);
        const readInterface = readline.createInterface({
            input: process.stdin,
        });
        return new Promise(function (resolve) {
            readInterface.question(" : ", (input) => {
                readInterface.close();
                resolve(input.trim());
            });
        });
    }
    ;
    /**
     * ***outData** : Parse object data to standard output.
     * @param {Object} data The object data to parse
     * @returns
     */
    static outData(data) {
        let c = Object.keys(data);
        let maxKeyLength = 0;
        for (let n = 0; n < c.length; n++) {
            let key = c[n];
            if (maxKeyLength < key.length) {
                maxKeyLength = key.length;
            }
        }
        for (let n = 0; n < c.length; n++) {
            let key = c[n];
            let val = data[key];
            if (typeof val != "string") {
                val = val.toString();
            }
            val = val.split("\n").join("\n" + " ".padEnd(this.indent + maxKeyLength + 3));
            let keystr = key.padEnd(maxKeyLength) + " : ";
            CLI.outn(keystr + val);
        }
        return this;
    }
    static wait(string) {
        if (!string)
            string = "";
        this.waitString = string;
        let ind = 0;
        const animation = ["/", "-", "\\", "|"];
        this.waitSst = setInterval(() => {
            this.out("\r" + this.waitString + animation[ind]);
            ind = (ind + 1) % animation.length;
        }, 100);
        return CLI;
    }
    static waitClose(string) {
        clearInterval(this.waitSst);
        if (string)
            this.outn("\r" + this.waitString + string);
        return CLI;
    }
}
exports.CLI = CLI;
CLI.indent = 0;
;
