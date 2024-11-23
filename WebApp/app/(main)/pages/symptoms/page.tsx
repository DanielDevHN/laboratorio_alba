/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useSymptom } from '@/hooks/useSymptom';

const Symptoms = () => {
    const { symptoms, loading, addSymptom, editSymptom, removeSymptom } = useSymptom();
    const [symptomDialog, setSymptomDialog] = useState(false);
    const [deleteSymptomDialog, setDeleteSymptomDialog] = useState(false);
    const [deleteSymptomsDialog, setDeleteSymptomsDialog] = useState(false);
    const [symptom, setSymptom] = useState({ id: '', name: '', description: '', createdAt: '', updatedAt: '' });
    const [selectedSymptoms, setSelectedSymptoms] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [isEditing, setIsEditing] = useState(false);

    const openNew = () => {
        setSymptom({ id: '', name: '', description: '', createdAt: '', updatedAt: '' });
        setSubmitted(false);
        setIsEditing(false); // Cambiar estado a creación
        setSymptomDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSymptomDialog(false);
    };

    const hideDeleteSymptomDialog = () => {
        setDeleteSymptomDialog(false);
    };

    const hideDeleteSymptomsDialog = () => {
        setDeleteSymptomsDialog(false);
    };

    const saveSymptom = async () => {
        setSubmitted(true);

        if (symptom.name.trim() && symptom.description.trim()) {
            const { id, createdAt, updatedAt, ...formattedSymptom } = symptom;

            try {
                if (isEditing) {
                    await editSymptom(id, formattedSymptom); // Editar síntoma
                    toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Síntoma actualizado', life: 3000 });
                } else {
                    await addSymptom(formattedSymptom); // Crear síntoma
                    toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Síntoma creado', life: 3000 });
                }
                setSymptomDialog(false);
            } catch (error) {
                const errorMessage = (error as any).response?.data?.message || 'No se pudo procesar el síntoma.';
                toast.current?.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 4000 });
            }
        }
    };

    const editSymptomData = (symptomData: any) => {
        if (!symptomData.id) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El síntoma no tiene un ID válido.', life: 3000 });
            return;
        }

        setSymptom({ ...symptomData });
        setIsEditing(true);
        setSymptomDialog(true);
    };

    const confirmDeleteSymptom = (symptomData: any) => {
        setSymptom(symptomData);
        setDeleteSymptomDialog(true);
    };

    const deleteSymptom = () => {
        removeSymptom(symptom.id);
        setDeleteSymptomDialog(false);
        setSymptom({ id: '', name: '', description: '', createdAt: '', updatedAt: '' });
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Síntoma eliminado', life: 3000 });
    };

    const confirmDeleteSelected = () => {
        setDeleteSymptomsDialog(true);
    };

    const deleteSelectedSymptoms = () => {
        const remainingSymptoms = symptoms.filter((val) => !(selectedSymptoms as any)?.includes(val));
        setSelectedSymptoms(null);
        setDeleteSymptomsDialog(false);
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Síntomas eliminados', life: 3000 });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo Síntoma" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    {/* <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedSymptoms || !(selectedSymptoms as any).length} /> */}
                </div>
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editSymptomData(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteSymptom(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestión de Síntomas</h5>
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
                    selection={selectedSymptoms}
                    onSelectionChange={(e) => setSelectedSymptoms(e.value as any)}
                    dataKey="id"
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} síntomas"
                    globalFilter={globalFilter}
                    emptyMessage="No se encontraron síntomas."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="Id" body={(rowData) => rowData.id || 'ID no disponible'} />
                    <Column field="name" header="Nombre" />
                    <Column field="description" header="Descripción" />
                    <Column field="createdAt" header="Creado" />
                    <Column field="updatedAt" header="Actualizado" />
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>

                <Dialog
                    visible={symptomDialog}
                    header={isEditing ? "Editar Síntoma" : "Detalles del Síntoma"}
                    modal
                    className="p-fluid"
                    onHide={hideDialog}
                    footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                            <Button label="Guardar" icon="pi pi-check" onClick={saveSymptom} autoFocus />
                        </>
                    }
                >
                    <div className="field">
                        <label htmlFor="name">Nombre</label>
                        <InputText id="name" value={symptom.name} onChange={(e) => setSymptom({ ...symptom, name: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Descripción</label>
                        <InputText id="description" value={symptom.description} onChange={(e) => setSymptom({ ...symptom, description: e.target.value })} required />
                    </div>
                </Dialog>


                <Dialog
                    visible={deleteSymptomDialog}
                    header="Confirmar"
                    modal
                    onHide={hideDeleteSymptomDialog}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={hideDeleteSymptomDialog} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deleteSymptom} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {symptom && (
                            <span>
                                ¿Está seguro de que desea eliminar <b>{symptom.name}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog
                    visible={deleteSymptomsDialog}
                    header="Confirmar"
                    modal
                    onHide={hideDeleteSymptomsDialog}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={hideDeleteSymptomsDialog} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deleteSelectedSymptoms} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {selectedSymptoms && <span>¿Está seguro de que desea eliminar los síntomas seleccionados?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Symptoms;
