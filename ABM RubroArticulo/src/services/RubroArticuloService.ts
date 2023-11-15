import { useNavigate } from 'react-router-dom'
import { RubroArticulo } from "../types/RubroArticulo";
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080/api/v1';

export const RubroArticuloService = {

    getRubroArticulos: async (): Promise<RubroArticulo[]> => {
        try {
            const response = await fetch(`${BASE_URL}/RubroArticulo/paged?page=0&size=20&sort=id,asc`, {
                method: "GET",
                headers:
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data;
        } catch {
            const Navigate = useNavigate();
            toast.error('No tienes permisos para acceder a esta pagina');
            Navigate('/login');
            throw new Error('Inicio de sesion fallido');
        }
    },

    getRubroArticulo: async (id: number): Promise<RubroArticulo> => {

        const response = await fetch(`${BASE_URL}/RubroArticulo/${id}`, {
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

    createRubroArticulo: async (RubroArticulo: RubroArticulo): Promise<RubroArticulo> => {

        const response = await fetch(`${BASE_URL}/RubroArticulo`, {
            method: "POST",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RubroArticulo)
        });

        const data = await response.json();
        return data;

    },

    updateRubroArticulo: async (id: number, RubroArticulo: RubroArticulo): Promise<RubroArticulo> => {

        const response = await fetch(`${BASE_URL}/RubroArticulo/${id}`, {
            method: "PUT",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RubroArticulo)
        });

        const data = await response.json();
        return data;
    },

    deleteRubroArticulo: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/RubroArticulo/${id}`, {
            method: "DELETE",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
    }
}