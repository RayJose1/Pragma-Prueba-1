import axios from "axios";


const EliminarUsuario = async (values) => {
    try {        
        const resultado = await axios.post("https://localhost:7022/api/Usuario/Borrar",{
            usuarioId: values
            
        },);

        return resultado

    } catch (error) {

        console.log(error);

    }

}

export {EliminarUsuario};