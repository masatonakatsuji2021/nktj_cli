"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorRGB = exports.Color = void 0;
/**
 * ***Color***
 * Static variable for preset text color.
 * It can be set as below.
 *
 * Example:)
 *
 * Consoller.outn("Hallo Red", Color.red);
 *
 */
var Color;
(function (Color) {
    Color[Color["Default"] = 0] = "Default";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Yellow"] = 2] = "Yellow";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
    Color[Color["Gray"] = 5] = "Gray";
    Color[Color["Orange"] = 6] = "Orange";
})(Color || (exports.Color = Color = {}));
;
exports.ColorRGB = {
    [Color.Default]: [255, 255, 255],
    [Color.Red]: [255, 40, 40],
    [Color.Yellow]: [255, 255, 20],
    [Color.Green]: [40, 255, 40],
    [Color.Blue]: [70, 130, 255],
    [Color.Gray]: [140, 140, 140],
    [Color.Orange]: [255, 180, 20],
};
