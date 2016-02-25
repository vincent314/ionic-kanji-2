declare interface IToast{
    show(message:string,time:string,position:string):void;
}

declare interface IPlugins{
    toast:IToast;
}

declare interface Window{
    plugins:IPlugins;
}

declare module wanakana{
    function isHiragana(input:string):boolean;
    function isKatakana(input:string):boolean;
    function isRomaji(input:string):boolean;
    function toRomaji(input:string):string;
}