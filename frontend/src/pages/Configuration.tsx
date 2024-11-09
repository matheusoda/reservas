import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Configuration.css';

export default function ConfigurationPage() {
    const token = localStorage.getItem('token');
    const [selectedOption, setSelectedOption] = useState<string>(''); // Para selecionar o que editar
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [description, setDescription] = useState(''); // Para menus
    const [price, setPrice] = useState(''); // Para menus
    const [categoryId, setCategoryId] = useState(''); // Para menus
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]); // Para opções de categorias
    const [menuItems, setMenuItems] = useState<{ id: string, name: string, description: string, price: string, categoryId: string }[]>([]);
    const [tables, setTables] = useState<{ id: string, name: string }[]>([]);
    const [users, setUsers] = useState<{ id: string, name: string, email: string, phone: string, isAdmin: boolean }[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [options] = useState([
        { label: 'Selecionar', value: '' },
        { label: 'Usuários', value: 'user' },
        { label: 'Menus', value: 'menu' },
        { label: 'Categorias', value: 'category' },
        { label: 'Mesas', value: 'table' },
    ]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage('')
        setSuccessMessage('');
        event.preventDefault();
        const userData = { name, email, password, phone, isAdmin };
        const menuData = { name, description, price, category: categoryId };
        const categoryData = { name };
        let response
        try {
            if(!id){
                if (selectedOption === 'user' ) {
                     response = await axios.post('http://localhost:5000/api/users', userData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                    setSuccessMessage('Usuário cadastrado com sucesso!');
                } else if (selectedOption === 'menu') {
                     response = await axios.post('http://localhost:5000/api/menus', menuData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    setSuccessMessage('Menu cadastrado com sucesso!');
                } else if (selectedOption === 'category') {
                     response = await axios.post('http://localhost:5000/api/categoryMenu', categoryData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                    setSuccessMessage('Categoria cadastrada com sucesso!');
                } else if (selectedOption === 'table') {
                    const tableData = { name };
                     response = await axios.post('http://localhost:5000/api/tables', tableData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                    setSuccessMessage('Mesa cadastrada com sucesso!');
                }
            } else {
                if (selectedOption === 'user' ) {
                    response = await axios.put(`http://localhost:5000/api/users/${id}`, userData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                   setSuccessMessage('Usuário cadastrado com sucesso!');
               } else if (selectedOption === 'menu') {
                    response = await axios.put(`http://localhost:5000/api/menus/${id}`, menuData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                   setSuccessMessage('Menu cadastrado com sucesso!');
               } else if (selectedOption === 'category') {
                    response = await axios.put(`http://localhost:5000/api/categoryMenu/${id}`, categoryData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                   setSuccessMessage('Categoria cadastrada com sucesso!');
               } else if (selectedOption === 'table') {
                   const tableData = { name };
                    response = await axios.put(`http://localhost:5000/api/tables/${id}`, tableData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                     });
                   setSuccessMessage('Mesa cadastrada com sucesso!');
               }
            }

            resetForm();
            return response;
        } catch (error) {
            setErrorMessage('Erro ao cadastrar. Tente novamente.');
            console.error('Erro no cadastro:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setIsAdmin(false);
        setDescription('');
        setPrice('');
        setCategoryId('');
        setId('');
        setErrorMessage('');
        setSuccessMessage('');
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categoryMenu', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
             });
            setCategories(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/menus', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
             });
            setMenuItems(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens do menu:', error);
        }
    };

    const fetchTables = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tables', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
             });
            setTables(response.data);
        } catch (error) {
            console.error('Erro ao buscar mesas:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
             });
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        if (selectedOption === 'category') {
            fetchCategories();
        } else if (selectedOption === 'menu') {
            fetchMenuItems();
            fetchCategories(); // Para obter categorias para o menu
        } else if (selectedOption === 'table') {
            fetchTables();
        } else if (selectedOption === 'user') {
            fetchUsers();
        }
    }, [selectedOption, successMessage]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (item: any) => {
        setId(item.id)
        if (selectedOption === 'user') {
            setName(item.name);
            setEmail(item.email);
            setPhone(item.phone);
            setIsAdmin(item.isAdmin);
        } else if (selectedOption === 'menu') {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
            setCategoryId(item.categoryId);
        } else if (selectedOption === 'category') {
            setName(item.name);
        } else if (selectedOption === 'table') {
            setName(item.name);
        }
    };

    function handleResetFields() {
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setIsAdmin(false);
        setDescription('');
        setPrice('');
        setCategoryId('');
        setErrorMessage('');
        setSuccessMessage('');
    }

    return (
        <div className="configuration-container">
            <Card className="configuration-card py-4 px-2">
                <p className='text-2xl font-semibold'>Configurações</p>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className="field mt-2 ml-2">
                    <label htmlFor="options">O que deseja editar?</label>
                    <Dropdown
                        id="options"
                        value={selectedOption}
                        options={options}
                        onChange={(e) => { setSelectedOption(e.value); handleResetFields()}}
                        placeholder="Selecionar opção"
                        className='ml-2'
                    />
                </div>

                {selectedOption === 'user' && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="name">Nome</label>
                                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className='ml-10' required/>
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='ml-10' required/>
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Telefone</label>
                                <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className='ml-6'/>
                            </div>
                            <div className="field">
                                <label htmlFor="isAdmin">
                                    Administrador
                                    <input 
                                        type="checkbox" 
                                        id="isAdmin" 
                                        checked={isAdmin} 
                                        onChange={(e) => setIsAdmin(e.target.checked)} 
                                        className='ml-4'
                                    />
                                </label>
                            </div>
                            <Button className='mt-4 px-2 py-1 bg-green-300' type="submit" label={name ? 'Editar' : 'Cadastrar'} />
                        </form>
                        <hr className='mt-2' />
                        <h3 className="mt-4 text-lg font-semibold">Usuários Cadastrados</h3> 
                        <DataTable value={users} paginator rows={6}>
                            <Column field="name" header="Nome" />
                            <Column field="email" header="Email" />
                            <Column field="phone" header="Telefone" />
                            <Column header="Ações" body={(rowData) => (
                                <Button className='mt-4 px-2 py-1 bg-green-300' label="Editar" onClick={() => handleEdit(rowData)} />
                            )} />
                        </DataTable>
                    </>
                )}

                {selectedOption === 'menu' && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="name">Nome do Menu</label>
                                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className='ml-3' required/>
                            </div>
                            <div className="field">
                                <label htmlFor="description">Descrição</label>
                                <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} className='ml-12' required/>
                            </div>
                            <div className="field">
                                <label htmlFor="price">Preço</label>
                                <InputText id="price" value={price} onChange={(e) => setPrice(e.target.value)} className='ml-20' required/>
                            </div>
                            <div className="field">
                                <label htmlFor="categoryId">Categoria</label>
                                <Dropdown
                                    id="categoryId"
                                    value={categoryId}
                                    options={categories}
                                    onChange={(e) => setCategoryId(e.value)}
                                    optionLabel="name"
                                    placeholder="Selecionar Categoria"
                                    className='ml-12'
                                    required
                                />
                            </div>
                            <Button className='mt-4 px-2 py-1 bg-green-300' type="submit" label={name ? 'Editar' : 'Cadastrar'} />
                        </form>
                        <hr className='mt-2' />
                        <h3 className="mt-4 text-lg font-semibold">Itens do Menu Cadastrados</h3>
                        <DataTable value={menuItems} paginator rows={6}>
                            <Column field="name" header="Nome" />
                            <Column field="description" header="Descrição" />
                            <Column field="price" header="Preço" />
                            <Column header="Categoria" body={(rowData) => (
                                <span>{categories.find(cat => cat.id === rowData.categoryId)?.name}</span>
                            )} />
                            <Column header="Ações" body={(rowData) => (
                                <Button className='mt-4 px-2 py-1 bg-green-300' label="Editar" onClick={() => handleEdit(rowData)} />
                            )} />
                        </DataTable>
                    </>
                )}

                {selectedOption === 'category' && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="name">Nome da Categoria</label>
                                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className='ml-2'/>
                            </div>
                            <Button className='mt-4 px-2 py-1 bg-green-300' type="submit" label={name ? 'Editar' : 'Cadastrar'} />
                        </form>
                        <hr className='mt-2'/>
                        <h3 className="mt-4 text-lg font-semibold">Categorias Cadastradas</h3>
                        <DataTable value={categories} paginator rows={10}>
                            <Column field="name" header="Nome" />
                            <Column header="Ações" body={(rowData) => (
                                <Button className='mt-4 px-2 py-1 bg-green-300' label="Editar" onClick={() => handleEdit(rowData)} />
                            )} />
                        </DataTable>
                    </>
                )}

                {selectedOption === 'table' && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="name">Nome da Mesa</label>
                                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className='ml-2'/>
                            </div>
                            <Button className='mt-4 px-2 py-1 bg-green-300' type="submit" label={name ? 'Editar' : 'Cadastrar'} />
                        </form>
                        <hr className='mt-2'/>
                        <h3 className="mt-4 text-lg font-semibold">Mesas Cadastradas</h3>
                        <DataTable value={tables} paginator rows={10}>
                            <Column field="name" header="Nome" />
                            <Column header="Ações" body={(rowData) => (
                                <Button className='mt-4 px-2 py-1 bg-green-300' label="Editar" onClick={() => handleEdit(rowData)} />
                            )} />
                        </DataTable>
                    </>
                )}
            </Card>
        </div>
    );
}
