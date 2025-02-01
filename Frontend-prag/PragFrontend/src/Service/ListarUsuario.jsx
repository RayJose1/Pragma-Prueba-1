import axios from "axios";

const ListarUsuario = async (exportar) => {
    try {
        
        const resultado = await axios.post("https://localhost:7022/api/Usuario/ListaUsuarios",       
                exportar

            , { headers: { "Content-Type": "application/json" }});

        return resultado;
    }
    catch (error) { console.log(error); }
};

export { ListarUsuario };