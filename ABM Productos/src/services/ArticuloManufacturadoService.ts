import { useNavigate } from 'react-router-dom'
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080/api/v1';

export const ArticuloManufacturadoService = {

    getArticuloManufacturados: async (): Promise<ArticuloManufacturado[]> => {
        try {
            const response = await fetch(`${BASE_URL}/ArticuloManufacturado/paged?page=0&size=20&sort=id,asc`, {
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

    getArticuloManufacturado: async (id: number): Promise<ArticuloManufacturado> => {

        const response = await fetch(`${BASE_URL}/ArticuloManufacturado/${id}`, {
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

    createArticuloManufacturado: async (ArticuloManufacturado: ArticuloManufacturado): Promise<ArticuloManufacturado> => {

        const response = await fetch(`${BASE_URL}/ArticuloManufacturado`, {
            method: "POST",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ArticuloManufacturado)
        });

        const data = await response.json();
        return data;

    },

    updateArticuloManufacturado: async (id: number, ArticuloManufacturado: ArticuloManufacturado): Promise<ArticuloManufacturado> => {

        const response = await fetch(`${BASE_URL}/ArticuloManufacturado/${id}`, {
            method: "PUT",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ArticuloManufacturado)
        });

        const data = await response.json();
        return data;
    },

    deleteArticuloManufacturado: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/ArticuloManufacturado/${id}`, {
            method: "DELETE",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
    }
}
