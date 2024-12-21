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
export enum Color {
    Default,
    Red,
    Yellow,
    Green,
    Blue,
    Gray,    
    Orange,
};

export const ColorRGB= {
    [Color.Default] : [255, 255, 255],
    [Color.Red] : [255, 40, 40],
    [Color.Yellow] : [255, 255, 20],
    [Color.Green] : [40, 255, 40],
    [Color.Blue] : [70, 130, 255],
    [Color.Gray] : [140, 140, 140],
    [Color.Orange]: [255, 180, 20],
};