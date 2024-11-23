/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { usePatient } from '@/hooks/usePatient';

const ListPatients = () => {
    const { patients, loading } = usePatient();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar Data" icon="pi pi-upload" className="p-button-help" onClick={() => dt.current?.exportCSV()} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Lista de Pacientes</h5>
        </div>
    );

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={patients}
                    dataKey="id"
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} pacientes"
                    globalFilter=""
                    emptyMessage="No se encontraron pacientes."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column field="id" header="Id" sortable />
                    <Column field="firstName" header="Nombre" sortable />
                    <Column field="lastName" header="Apellido" sortable />
                    <Column field="birthDate" header="Fecha de Nacimiento" sortable />
                    <Column field="address" header="Dirección" />
                    <Column field="phones" header="Teléfonos" body={(rowData) => rowData.phones?.join(', ') || ''} />
                    <Column field="emails" header="Emails" body={(rowData) => rowData.emails?.join(', ') || ''} />
                    <Column field='createdAt' header='Creado' />
                    <Column field='updatedAt' header='Actualizado' />
                </DataTable>
            </div>
        </div>
    );
};

export default ListPatients;
