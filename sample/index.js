"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
(() => __awaiter(void 0, void 0, void 0, function* () {
    __1.CLI
        .out("# ")
        .outn("CLI Text Sample....")
        .outn("........");
    __1.CLI
        .outn("Red Text ...... OK", __1.Color.Red)
        .outn("Yellow Text ...... OK", __1.Color.Yellow)
        .outn("Green Text ...... OK", __1.Color.Green)
        .outn("Blue Text ...... OK", __1.Color.Blue)
        .outn("Gray Text ...... OK", __1.Color.Gray)
        .outn("Orange Text ...... OK", __1.Color.Orange);
    __1.CLI
        .setIndent(4)
        .outn("Indent Text Sample Text Sample Text Sample Text Sample Text Sample")
        .outn("Indent Text Sample Text Sample Text Sample Text Sample Text Sample")
        .setIndent(8)
        .outn("Indent Text Sample Text Sample Text Sample Text Sample Text Sample")
        .setIndent(0);
    __1.CLI.outn(".....").br();
    const val = yield __1.CLI.in("prease key");
    __1.CLI.outn("key=" + val);
    __1.CLI.outData({
        name: "aaaaa",
        age: 32 + "\n" + __1.CLI.setColor("# ", __1.Color.Green) + "option text text text...\nbbbbbbbbbb",
    });
    __1.CLI.wait("loading.....");
    yield (() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    })();
    __1.CLI.waitClose(__1.CLI.setColor("OK", __1.Color.Green));
    __1.CLI.wait("loading.....");
    yield (() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    })();
    __1.CLI.waitClose(__1.CLI.setColor("OK", __1.Color.Green));
    __1.CLI.outn("..... Complete!");
    __1.CLI.outData(__1.CLI.getArgs());
}))();
