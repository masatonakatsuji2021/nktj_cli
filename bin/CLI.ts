import * as readline from "readline";
import { Color, ColorRGB } from "./Color";
 
/**
 * ***CLI***
 */
export class CLI {

    private static indent: number = 0;

    private static waitSst : NodeJS.Timeout;

    private static waitString : string;

    private static getIndentBr() : string{
        if (!this.indent) return "\n";
        let indentStr : string = "\n";
        for(let n = 0 ; n < this.indent ; n++){
            indentStr += " ";
        }
        return indentStr;
    }

    private static __getArgs() {

        let options = {
            _any : [],
        };

        let field = null;
        for(let n = 0 ; n < process.argv.length ; n++){
            if (n == 0 || n == 1) continue;
            let a = process.argv[n];

            if(a.indexOf("--") === 0){
                if(field){
                    options[field] = true;
                }
                field = a.substring(2);
            }
            else{
                if(!field){
                    options._any.push(a);
                    continue;
                }
                options[field] = a;
                field = null;
            }
        }

        if(field) options[field] = true;
        return options;
    }

    /**
     * ***getArgsOPtion*** : Get option setting value from command argument value.
     * @returns 
     */
    public static getArgsOPtion() : object {
        return this.getArgsOption();
    }

    /**
     * ***getArgsOption*** : Get option setting value from command argument value.
     * @returns 
     */
    public static getArgsOption(): Object {
        const args = this.__getArgs();
        delete args._any;
        return args;
    }

    /**
     * ***getArgs*** : Get command argument value.
     * @returns 
     */
    public static getArgs() : Array<string>{
        return this.__getArgs()._any;
    }

    /**
     * ***setIndent*** : Setting the indent amount  
     * Used when changing the number of indents after opening
     * @param {number} indent Indent
     * @returns 
     */
    public static setIndent(indent : number) : typeof CLI{
        this.indent = indent;
        return CLI;
    }

    public static setColorOrigin(string : string, rgb : number[]) : string{
        return "\x1b[38;2;" + rgb[0] + ";" + rgb[1] + ";" + rgb[2] + "m" + string + "\x1b[39m";
    }

    /**
     * ***setColor*** : Get standard output code for colored characters
     * @param {string} outputText OUtput Text 
     * @param {Color} color Text color [Color Enumeration](Color.ts)
     * @returns {string}
     */
    public static setColor(outputText : string, color: Color) : string;

    public static setColor(string : string, color: Color) : string{
        return this.setColorOrigin(string, ColorRGB[color]);
    }

    /**
     * ***out*** : Text to standard output.
     * @param {string} outputText Output Text
     */
    public static out(outputText : string) : typeof CLI;

    /**
     * ***out*** : Text to standard output.  
     * The second argument specifies the color.
     * @param {string} outputText Output Text
     * @param {Color} color Text color [Color Enumeration](Color.ts)
     */
    public static out(outputText : string, color: Color) : typeof CLI;

    public static out(string : string, color? : Color) : typeof CLI{
        if(color) string = this.setColor(string, color);
        process.stdout.write(string);
        return CLI;
    };

    /**
     * ***outn*** : Text to standard output, with a newline at the end
     * @param {string} outputText Output Text
     */
    public static outn(outputText : string) :typeof CLI;

    /**
     * ***outn*** : Text to standard output, with a newline at the end  
     * The second argument specifies the color.
     * @param {string} outputText Output Text
     * @param {Color} color Text color [Color Enumeration](Color.ts)
     */
    public static outn(outputText : string, color : Color) : typeof CLI;

    public static outn(string : string, color? : Color) : typeof CLI{
        string = string + this.setBr();       
        return CLI.out(string, color);
    }

    /**
     * ***br*** : Newline stdout.
     * @returns {CLI}
     */
    public static br() : typeof CLI{
        return CLI.out(this.getIndentBr());
    }

    public static setBr() : string {
        return this.getIndentBr();
    }

    /**
     * ***in*** : Prompts for standard input.  
     * Pressing Enter after typing a key will return the entered value.
     */
    public static in() : Promise<unknown>;

    /**
     * ***in*** : Prompts for standard input.  
     * Pressing Enter after typing a key will return the entered value.
     * @param {string} outputText Output Text
     */
    public static in(outputText : string) : Promise<unknown>;

    /**
     * ***in*** : Prompts for standard input.  
     * Pressing Enter after typing a key will return the entered value.
     * @param {string} outputText Output Text
     * @param {Color} color Text color [Color Enumeration](Color.ts)
     */
    public static in(outputText : string, color: Color) : Promise<unknown>;

    public static in(string? : string, color?: Color) : Promise<unknown>{

        if(string) CLI.out(string, color);

        CLI.out(" :", color);

        const readInterface = readline.createInterface({
            input: process.stdin,
        });

        return new Promise(function(resolve){
            readInterface.question(" : ", (input : string) => {
                readInterface.close();
                resolve(input.trim());
            });
        });
    };

    /**
     * ***outData** : Parse object data to standard output.
     * @param {Object} data The object data to parse 
     * @returns 
     */ 
    public static outData(data : Object) : CLI{

        let c = Object.keys(data);

        let maxKeyLength = 0;

        for(let n = 0 ; n < c.length ; n++){
            let key = c[n];
            if(maxKeyLength < key.length){
                maxKeyLength = key.length;
            }
        }

        for(let n = 0 ; n < c.length ; n++){
            let key = c[n];
            let val = data[key];
            if(typeof val != "string"){
                val = val.toString();
            }
            val = val.split("\n").join("\n"+ " ".padEnd(this.indent + maxKeyLength + 3));

            let keystr = key.padEnd(maxKeyLength) + " : ";

            CLI.outn(keystr + val);
        }

        return this;
    }

    /**
     * ***wait*** : Waiting Output
     */
    public static wait() : typeof CLI;
    
    /**
     * ***wait*** : Waiting Output
     * @param {string} outputText Output Text 
     */
    public static wait(string : string) : typeof CLI;

    public static wait(string? : string){
        if (!string) string = "";
        this.waitString = string;
        let ind : number = 0;
        const animation = ["/", "-", "\\", "|"];
        this.waitSst = setInterval(()=>{
            this.out("\r" + this.waitString + animation[ind]);
            ind = (ind + 1) % animation.length;
        }, 100);
        return CLI;
    }

    public static waitClose() : typeof CLI;

    public static waitClose(string: string) : typeof CLI;

    public static waitClose(string?: string) {
        clearInterval(this.waitSst);
        if (string) this.outn("\r" + this.waitString + string);
        return CLI;
    }
};