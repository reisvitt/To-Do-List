const {app, BrowserWindow, Menu} = require("electron")

function createWindow(){
  win = new BrowserWindow({width:800, height:500}),

  win.loadFile("./src/Index.html")
  //Menu.setApplicationMenu(null)

}


app.on("ready", createWindow)