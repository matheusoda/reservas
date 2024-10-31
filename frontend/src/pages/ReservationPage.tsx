import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { fetchTables } from '../api';
import { Table } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function  ReservationForm() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState<number | null>(1);
    const [tables, setTables] = useState<{ id: number, name: string }[]>([]);
    const [selectedTable, setSelectedTable] = useState<{ id: number; name: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true)
        const loadData = async () => {
            try {
                const fetchedTables = await fetchTables();

                // Ordenar os dados ordem alfabética
                fetchedTables.sort((a: Table, b: Table) => a.name.localeCompare(b.name));

                setTables(fetchedTables);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };

        loadData();
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true); 

        const formattedDateTime = date ? new Date(date) : null;
        if (formattedDateTime && time) {
            const [hours, minutes] = time.split(':');
            formattedDateTime.setHours(Number(hours), Number(minutes), 0, 0);

            const reservationData = {
                tableId: selectedTable?.id,
                userId: 'd96fdcba-31f4-4b7d-b245-f0e66710b13b', 
                date: formattedDateTime.toISOString(),
            };

            try {
                const response = await axios.post('http://localhost:5000/api/reservations', reservationData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status !== 201) {
                    throw new Error('Erro ao criar reserva');
                }

                // Aqui você pode adicionar lógica para lidar com a resposta
                navigate('/')
                console.log('Reserva criada com sucesso:', response.data);
            } catch (error) {
                console.error('Erro ao criar reserva:', error);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            console.error('Data ou hora não estão definidas');
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="py-4 px-2">
            <div className="reservation-form ">
                <p className='text-2xl font-semibold'>Reservar Mesa</p>
                {loading ? (
                    <ProgressSpinner />
                ) : (
                    <form onSubmit={handleSubmit} className='px-3 pt-3'>
                        <div className="field">
                            <label htmlFor="date">Data</label>
                            <Calendar
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.value as Date | null)}
                                dateFormat="mm/dd/yy"
                                showIcon
                                placeholder='Selecione uma data'
                                inputClassName='ml-36'
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="time">Hora</label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className='ml-36'
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="numberOfPeople">Número de Pessoas</label>
                            <InputNumber
                                id="numberOfPeople"
                                value={numberOfPeople}
                                onValueChange={(e) => setNumberOfPeople(e.value ?? 1)}
                                min={1}
                                className='ml-10'
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="table">Escolha uma Mesa</label>
                            <Dropdown
                                id="table"
                                value={selectedTable}
                                options={tables}
                                onChange={(e) => setSelectedTable(e.value)}
                                optionLabel="name"
                                placeholder="Selecione uma mesa"
                                className='ml-10'
                            />
                        </div>
                        <Button className='mt-4 px-2 py-1 bg-green-300' type="submit" label={isSubmitting ? 'Reservando...' : 'Reservar'} disabled={isSubmitting} />
                    </form>
                )}
            </div>
        </Card>
    );
};

