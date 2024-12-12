import app from "./app.js"

app.listen(app.get("port"), ()=>{
    console.log(`Ejecutado en: http://localhost:${app.get("port")}`);    
})