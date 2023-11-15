import { useState } from 'react';
import { LoginService } from '../../services/LoginService';
import './Login.css';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const FormLogin = () => {
    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const handleEmail = event => setEmail(event.target.value);
    const handleContra = event => setContra(event.target.value);

    const login = async () => {
        var respuesta: String = await LoginService.login(email, contra);
        if (respuesta == "true"){
            Navigate('/');
            toast.success("Logueado correctamente")
        }
    };

    return (
        <>
            <div className='pantallaLogin'>
                <div className='formLogin'>
                    <h1>Bienvenido</h1>
                    <input className='inputLogin' type="text" placeholder='Ingrese su email' onChange={handleEmail} />
                    <input className='inputLogin' type="password" placeholder='Ingrese su contraseña' onChange={handleContra} />
                    <a href="">¿Olvidaste tu contraseña?</a>
                    <button id='iniciarSesion' onClick={login}>Iniciar Sesión</button>
                </div>
            </div>
        </>
    );
};

export default FormLogin;