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
import { usePatient } from '@/hooks/usePatient';

const Patients = () => {
    const { patients, loading, addPatient, editPatient, removePatient } = usePatient();
    const [patientDialog, setPatientDialog] = useState(false);
    const [deletePatientDialog, setDeletePatientDialog] = useState(false);
    const [deletePatientsDialog, setDeletePatientsDialog] = useState(false);
    const [patient, setPatient] = useState({ id: '', firstName: '', lastName: '', birthDate: '', address: '', phones: '', emails: '', createdAt: '', updatedAt: '' });
    const [selectedPatients, setSelectedPatients] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [isEditing, setIsEditing] = useState(false);

    const openNew = () => {
        setPatient({ id: '', firstName: '', lastName: '', birthDate: '', address: '', phones: '', emails: '', createdAt: '', updatedAt: '' });
        setSubmitted(false);
        setIsEditing(false); // Cambiar estado a creación
        setPatientDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPatientDialog(false);
    };

    const hideDeletePatientDialog = () => {
        setDeletePatientDialog(false);
    };

    const hideDeletePatientsDialog = () => {
        setDeletePatientsDialog(false);
    };

    const savePatient = async () => {
        setSubmitted(true);

        if (patient.firstName.trim() && patient.lastName.trim() && patient.birthDate.trim()) {
            const { id, createdAt, updatedAt, ...formattedPatient } = {
                ...patient,
                phones: patient.phones.split(',').map((phone) => phone.trim()),
                emails: patient.emails.split(',').map((email) => email.trim()),
            };

            try {
                if (isEditing) {
                    await editPatient(id, formattedPatient); // Asegúrate de pasar solo los datos requeridos
                    toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente actualizado', life: 3000 });
                } else {
                    await addPatient(formattedPatient);
                    toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente creado', life: 3000 });
                }
                setPatientDialog(false);
            } catch (error) {
                const errorMessage = (error as any).response?.data?.message || 'No se pudo procesar el paciente.';
                toast.current?.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 4000 });
            }
        }
    };




    const editPatientData = (patientData: any) => {
        if (!patientData.id) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El paciente no tiene un ID válido.', life: 3000 });
            return;
        }

        setPatient({
            ...patientData,
            phones: patientData.phones?.join(', ') || '',
            emails: patientData.emails?.join(', ') || '',
        });
        setIsEditing(true);
        setPatientDialog(true);
    };


    const confirmDeletePatient = (patientData: any) => {
        setPatient(patientData);
        setDeletePatientDialog(true);
    };

    const deletePatient = () => {
        removePatient(patient.id);
        setDeletePatientDialog(false);
        setPatient({ id: '', firstName: '', lastName: '', birthDate: '', address: '', phones: '', emails: '', createdAt: '', updatedAt: '' });
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Paciente eliminado', life: 3000 });
    };

    const confirmDeleteSelected = () => {
        setDeletePatientsDialog(true);
    };

    const deleteSelectedPatients = () => {
        const remainingPatients = patients.filter((val) => !(selectedPatients as any)?.includes(val));
        setSelectedPatients(null);
        setDeletePatientsDialog(false);
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Pacientes eliminados', life: 3000 });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo Paciente" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    {/* <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedPatients || !(selectedPatients as any).length} /> */}
                </div>
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPatientData(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeletePatient(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestión de Pacientes</h5>
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
                    selection={selectedPatients}
                    onSelectionChange={(e) => setSelectedPatients(e.value as any)}
                    dataKey="id"
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} pacientes"
                    globalFilter={globalFilter}
                    emptyMessage="No se encontraron pacientes."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="Id" body={(rowData) => rowData.id || 'ID no disponible'} />
                    <Column field="firstName" header="Nombre" />
                    <Column field="lastName" header="Apellido" />
                    <Column field="birthDate" header="Fecha de Nacimiento" />
                    <Column field="address" header="Dirección" />
                    <Column field="phones" header="Teléfonos" body={(rowData) => rowData.phones?.join(', ') || ''} />
                    <Column field="emails" header="Emails" body={(rowData) => rowData.emails?.join(', ') || ''} />
                    <Column field="createdAt" header="Creado" />
                    <Column field="updatedAt" header="Actualizado" />
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>

                <Dialog
                    visible={patientDialog}
                    header={isEditing ? "Editar Paciente" : "Detalles del Paciente"}
                    modal
                    className="p-fluid"
                    onHide={hideDialog}
                    footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                            <Button label="Guardar" icon="pi pi-check" onClick={savePatient} autoFocus />
                        </>
                    }
                >
                    <div className="field">
                        <label htmlFor="firstName">Nombre</label>
                        <InputText id="firstName" value={patient.firstName} onChange={(e) => setPatient({ ...patient, firstName: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="lastName">Apellido</label>
                        <InputText id="lastName" value={patient.lastName} onChange={(e) => setPatient({ ...patient, lastName: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="birthDate">Fecha de Nacimiento</label>
                        <InputText id="birthDate" value={patient.birthDate} onChange={(e) => setPatient({ ...patient, birthDate: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="address">Dirección</label>
                        <InputText id="address" value={patient.address} onChange={(e) => setPatient({ ...patient, address: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="phones">Teléfonos (separados por comas)</label>
                        <InputText id="phones" value={patient.phones} onChange={(e) => setPatient({ ...patient, phones: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="emails">Emails (separados por comas)</label>
                        <InputText id="emails" value={patient.emails} onChange={(e) => setPatient({ ...patient, emails: e.target.value })} required />
                    </div>
                </Dialog>


                <Dialog
                    visible={deletePatientDialog}
                    header="Confirmar"
                    modal
                    onHide={hideDeletePatientDialog}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={hideDeletePatientDialog} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deletePatient} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {patient && (
                            <span>
                                ¿Está seguro de que desea eliminar <b>{patient.firstName}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog
                    visible={deletePatientsDialog}
                    header="Confirmar"
                    modal
                    onHide={hideDeletePatientsDialog}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={hideDeletePatientsDialog} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deleteSelectedPatients} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {selectedPatients && <span>¿Está seguro de que desea eliminar los pacientes seleccionados?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Patients;
