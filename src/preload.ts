// import { ipcRenderer } from "electron";

// /**
//  * nodeIntegration:false(= ほぼWebと同じ)であるため、
//  * 本来ならレンダラープロセスでElectronの機能を使用できない
//  *
//  * Window オブジェクトにicpRendererメソッドを追加して、
//  * レンダラープロセスからも利用できるようにする。
//  *
//  * TypeScriptではWindowオブジェクトに属性をつかすることが
//  * できないため、tsconfig.jsonの以下の設定値を
//  * (Base directory to resolve non-absolute module names)
//  * paths: paths": {"*":["@types/*"]} を定義した上で
//  * そのファイル置き場へファイルを追加する
//  */

// window.ipcRenderer = ipcRenderer;
