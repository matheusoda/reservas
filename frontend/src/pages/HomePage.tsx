import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Reservation } from '../types';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/reservations/user/${userId}`);
                setReservations(response.data);
            } catch (error) {
                console.error('Erro ao buscar reservas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [userId]);

    return (
        <div className="home">
            <h2>Minhas Reservas</h2>
            {loading ? (
                <ProgressSpinner />
            ) : (
                <div>
                    {reservations.length === 0 ? (
                        <p>Você não tem reservas.</p>
                    ) : (
                        reservations.map((reservation: Reservation) => (
                            <Card key={reservation.id} className="mb-3">
                                <h4>Mesa: {reservation.tableId}</h4>
                                <p>Data: {new Date(reservation.date).toLocaleDateString()}</p>
                                <p>Hora: {new Date(reservation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                {/* <p>Número de pessoas: {reservation.numberOfPeople}</p> */}
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

