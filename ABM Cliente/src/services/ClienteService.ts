import { useNavigate } from 'react-router-dom'
import { Cliente } from "../types/Cliente";
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080/api/v1';

export const ClienteService = {

    getClientes: async (): Promise<Cliente[]> => {
        try {
            const response = await fetch(`${BASE_URL}/Cliente/paged?page=0&size=20&sort=id,asc`, {
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

    getCliente: async (id: number): Promise<Cliente> => {

        const response = await fetch(`${BASE_URL}/Cliente/${id}`, {
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

    createCliente: async (Cliente: Cliente): Promise<Cliente> => {

        const response = await fetch(`${BASE_URL}/Cliente`, {
            method: "POST",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Cliente)
        });

        const data = await response.json();
        return data;

    },

    updateCliente: async (id: number, Cliente: Cliente): Promise<Cliente> => {

        const response = await fetch(`${BASE_URL}/Cliente/${id}`, {
            method: "PUT",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Cliente)
        });

        const data = await response.json();
        return data;
    },

    deleteCliente: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/Cliente/${id}`, {
            method: "DELETE",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
    }
}
