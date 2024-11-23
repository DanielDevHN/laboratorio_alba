/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getPatients } from '@/services/patientService';
import { getSymptoms } from '@/services/symptomService';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import Link from 'next/link';

const DashboardContent = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [symptoms, setSymptoms] = useState<any[]>([]);
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const { layoutConfig } = useContext(LayoutContext);

    useEffect(() => {
        // Obtener datos de pacientes y síntomas
        getPatients().then((data) => setPatients(data));
        getSymptoms().then((data) => setSymptoms(data));
    }, []);

    useEffect(() => {
        // Actualizar fecha y hora solo en el cliente
        setDateTime(new Date());
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Bienvenido (a)</h5>
                    <p>{dateTime && dateTime.toLocaleDateString()} {dateTime && dateTime.toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Lista de Pacientes Recientes</h5>
                    <DataTable value={patients} rows={5} paginator responsiveLayout="scroll">
                        <Column field="firstName" header="Nombre" sortable style={{ width: '35%' }} />
                        <Column field="lastName" header="Apellido" sortable style={{ width: '35%' }} />
                        <Column field="birthDate" header="Fecha de Nacimiento" sortable style={{ width: '20%' }} />
                        <Column
                            header="Ver"
                            style={{ width: '10%' }}
                            body={() => (
                                <Link href="/pages/list-patients">
                                    <Button icon="pi pi-search" text />
                                </Link>
                            )}
                        />
                    </DataTable>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Lista de Síntomas Recientes</h5>
                    <DataTable value={symptoms} rows={5} paginator responsiveLayout="scroll">
                        <Column field="name" header="Nombre" sortable style={{ width: '40%' }} />
                        <Column field="description" header="Descripción" sortable style={{ width: '50%' }} />
                        <Column
                            header="Ver"
                            style={{ width: '10%' }}
                            body={() => (
                                <Link href="/pages/list-symptoms">
                                    <Button icon="pi pi-search" text />
                                </Link>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
