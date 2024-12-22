import { CLI, Color } from "../";

(async () => {

    CLI
        .out("# ")
        .outn("CLI Text Sample....")
        .outn("........")
    ;

    CLI
        .outn("Red Text ...... OK", Color.Red)
        .outn("Yellow Text ...... OK", Color.Yellow)
        .outn("Green Text ...... OK", Color.Green)
        .outn("Blue Text ...... OK", Color.Blue)
        .outn("Gray Text ...... OK", Color.Gray)
        .outn("Orange Text ...... OK", Color.Orange)
    ;

    CLI
        .setIndent(4)
        .outn("Indent Text Sample Text Sample Text Sample Text Sample Text Sample")
        .outn("Indent Text Sample Text Sample Text Sample Text Sample Text Sample")
        .setIndent(8)
        .outn("Indent Text Sample Text Sample Text Sample Text Sample Text Sample")
        .setIndent(0)
    ;

    CLI.outn(".....").br();

    const val = await CLI.in("prease key");

    CLI.outn("key=" + val);

    CLI.outData({
        name: "aaaaa",
        age: 32 + "\n" + CLI.setColor("# ", Color.Green) + "option text text text...\nbbbbbbbbbb",   
    });

    CLI.wait("loading.....");

    await (()=>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(true);
            },1000);
        });
    })();

    CLI.waitClose(CLI.setColor("OK",Color.Green));
    CLI.wait("loading.....");

    await (()=>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(true);
            },1000);
        });
    })();
    CLI.waitClose(CLI.setColor("OK",Color.Green));

    CLI.outn("..... Complete!");

    console.log(CLI.getArgs());
    console.log(CLI.getArgsOPtion());

})();