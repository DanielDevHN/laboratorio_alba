/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useSymptom } from '@/hooks/useSymptom';

const ListSymptoms = () => {
    const { symptoms, loading } = useSymptom();
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
            <h5 className="m-0">Lista de Síntomas</h5>
        </div>
    );

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={symptoms}
                    dataKey="id"
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} síntomas"
                    globalFilter=""
                    emptyMessage="No se encontraron síntomas."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column field="id" header="Id" sortable />
                    <Column field="name" header="Nombre" sortable />
                    <Column field="description" header="Descripción" />
                    <Column field="createdAt" header="Creado" />
                    <Column field="updatedAt" header="Actualizado" />
                </DataTable>
            </div>
        </div>
    );
};

export default ListSymptoms;
