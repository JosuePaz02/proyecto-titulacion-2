//moi

const vistaprincipal =( req, res)=>{
    res.render('home')
}

const vistalinks =( req, res)=>{
    res.render('links')
}
const vistanotificaciones =( req, res)=>{
    res.render('notificaciones')
}

module.exports ={
    vistaprincipal,
    vistalinks,
    vistanotificaciones
}