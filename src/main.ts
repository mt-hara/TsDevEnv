import { BrowserWindow, app, ipcMain } from "electron";
import loadDevTool from "electron-load-devtool";

import path from "path";

/**
 * preloadスクリプトがあるディレクトリを取得
 * 開発時はWebpackの出力先を指定
 * electrton-builderによるパッケージには'arar.unpack'オプションに
 * 設定したディレクトリを返す
 */

const getResouceDirectory = (): string => {
  return process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "dist")
    : path.join(process.resourcesPath, "app.asar.unpack", "dist");
};

//ガベージコレクションされないようにグローバル変数化
let mainWindow: BrowserWindow | null = null;

/**
 * アプリが起動したらBrowserWindowインスタンスを生成
 * レンダラープロセス(index.htmlから呼ばれるスクリプト)を
 * ロードする
 */
app.once("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      /**
       * BrowserWindowいスタンス(レンダラープロセス)では
       * Note.jsの機能を無効化する
       */
      nodeIntegration: false,
      contextIsolation: false,
      /**
       * preloadスクリプトは絶対パスを指定する
       */
      preload: path.resolve(getResouceDirectory(), "preload.js"),
    },
  });

  // レンダラープロセスをロード
  mainWindow.loadFile("dist/index.html");

  // 開発時はデベロッパーツールを開く
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools({ mode: "detach" });
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
  }

  // ipcMain.on("async-message", (e, arg) => {
  //   // 受信
  //   console.log(arg);

  //   e.reply("asnyc-reply", "pong");
  // });

  mainWindow.once("closed", () => {
    // ウィンドウが閉じられたらインスタンスを初期化
    mainWindow = null;
  });
});

// 全てのウィンドウが閉じられたらアプリを終了する
app.once("window-all-closed", () => app.quit());
