/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */

const checkRol = (roles) => (req, res, next) => {

    try {
        //console.log(roles)
        const { user } = req;  //este user lo traemos del middleware de la sesion
        //console.log(user)
        const rolesByUser = user.type;
        //console.log(rolesByUser)

        const checkValueRol =  roles.some((rolSingle) => rolesByUser.includes(rolSingle)) //rol es el array que viene por parametro
        //console.log(checkValueRol)
        if(!checkValueRol) return res.status(403).send({ message:"User no permission." });

        next()
        
    } catch (error) {
        res.status(403).send("Error de permiso")
    }
}

module.exports = checkRol