import { useNavigate } from "react-router-dom";
import { UnidadMedida } from "../types/UnidadMedida";
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080/api/v1';

export const UnidadMedidaService = {

    
    getUnidadMedidas: async (): Promise<UnidadMedida[]> => {
        try {
            const response = await fetch(`${BASE_URL}/UnidadMedida/paged?page=0&size=20&sort=id,asc`, {
                method: "GET",
                headers:
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch {
            const Navigate = useNavigate();
            toast.error('No tienes permisos para acceder a esta pagina');
            Navigate('/login');
            throw new Error('Inicio de sesion fallido');
        }
    },

    

    getUnidadMedida: async (id: number): Promise<UnidadMedida> => {

        const response = await fetch(`${BASE_URL}/UnidadMedida/${id}`, {
            method: "GET",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;

    },

    createUnidadMedida:async (UnidadMedida:UnidadMedida):Promise<UnidadMedida> => {

        const response = await fetch(`${BASE_URL}/UnidadMedida`, {
            method: "POST",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UnidadMedida)
        });

        const data = await response.json();
        return data;
    },

    updateUnidadMedida: async (id: number, UnidadMedida: UnidadMedida): Promise<UnidadMedida> => {
        
        const response = await fetch(`${BASE_URL}/UnidadMedida/${id}`, {
            method: "PUT",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UnidadMedida)
        });

        const data = await response.json();
        return data;
    },


    deleteUnidadMedida: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/UnidadMedida/${id}`, {
            method: "DELETE",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
    }
}
