import axios from "axios";



const CrearUsuario = async (values) => {
    try { 
        const resultado = await axios.post("https://localhost:7022/api/Usuario/Crear",
        {   nombre: values.nombre,
            rut: values.rut,
            correo: values.correo,
            fechaNacimiento: values.fechaNacimiento  
        },
        {headers: {"Content-Type": "application/json"}}
         );

        return resultado

    } catch (error) {

        console.log(error);

    }

}

export { CrearUsuario };