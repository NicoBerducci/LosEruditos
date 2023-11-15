import { useNavigate } from 'react-router-dom'
import { Articulo } from "../types/Articulo";
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080/api/v1';

export const ArticuloService = {

    getArticulos: async (): Promise<Articulo[]> => {
        try {
            const response = await fetch(`${BASE_URL}/ArticuloInsumo/paged?page=0&size=20&sort=id,asc`, {
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

    getArticulo: async (id: number): Promise<Articulo> => {

        const response = await fetch(`${BASE_URL}/ArticuloInsumo/${id}`, {
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

    createArticulo: async (Articulo: Articulo): Promise<Articulo> => {

        const response = await fetch(`${BASE_URL}/ArticuloInsumo`, {
            method: "POST",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Articulo)
        });

        const data = await response.json();
        return data;

    },

    updateArticulo: async (id: number, Articulo: Articulo): Promise<Articulo> => {

        const response = await fetch(`${BASE_URL}/ArticuloInsumo/${id}`, {
            method: "PUT",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Articulo)
        });

        const data = await response.json();
        return data;
    },

    deleteArticulo: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/ArticuloInsumo/${id}`, {
            method: "DELETE",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
    }
}
