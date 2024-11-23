/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { usePatientSymptom } from '@/hooks/usePatientSymptom';
import { usePatient } from '@/hooks/usePatient';
import { useSymptom } from '@/hooks/useSymptom';

const PatientSymptom = () => {
    const { relations, loading, addPatientSymptom, removePatientSymptom } = usePatientSymptom();
    const { patients } = usePatient();
    const { symptoms } = useSymptom();

    const [relationDialog, setRelationDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedRelation, setSelectedRelation] = useState<any>(null);

    const [selectedPatient, setSelectedPatient] = useState<{ id: string; firstName: string; lastName: string } | null>(null);
    const [selectedSymptom, setSelectedSymptom] = useState<{ id: string; name: string } | null>(null);

    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        console.log('Relations:', relations); // Depurar los datos recibidos
    }, [relations]);

    const openNewRelation = () => {
        setSelectedPatient(null);
        setSelectedSymptom(null);
        setRelationDialog(true);
    };

    const hideDialog = () => {
        setRelationDialog(false);
    };

    const saveRelation = async () => {
        if (selectedPatient && selectedSymptom) {
            try {
                await addPatientSymptom(selectedPatient.id, selectedSymptom.id);
                toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Relación creada', life: 3000 });
                hideDialog();
            } catch (error) {
                console.error('Error al guardar la relación:', error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la relación.', life: 3000 });
            }
        }
    };

    const confirmDeleteRelation = (relation: any) => {
        setSelectedRelation(relation);
        setDeleteDialog(true);
    };

    const deleteRelation = async () => {
        try {
            await removePatientSymptom(selectedRelation.patientId, selectedRelation.symptomId);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Relación eliminada', life: 3000 });
            setDeleteDialog(false);
        } catch (error) {
            console.error('Error al eliminar la relación:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la relación.', life: 3000 });
        }
    };

    const header = (
        <div className="flex justify-content-between">
            <h5>Relaciones entre Pacientes y Síntomas</h5>
        </div>
    );

    const formatRelationData = (rowData: any) => {
        const patient = patients.find((p) => p.id === rowData.patientId);
        const symptom = symptoms.find((s) => s.id === rowData.symptomId);

        if (!patient || !symptom) {
            console.warn('Paciente o síntoma no encontrado para la relación:', rowData);
        }

        return {
            ...rowData,
            patientFirstName: patient?.firstName || 'Desconocido',
            patientLastName: patient?.lastName || 'Desconocido',
            symptomName: symptom?.name || 'Desconocido',
        };
    };

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={
                        <Button label="Nueva Relación" icon="pi pi-plus" className="p-button-success" onClick={openNewRelation} />
                    }
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={relations} // Formatea las relaciones antes de mostrarlas
                    dataKey="id"
                    paginator
                    rows={10}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}
                    emptyMessage="No se encontraron relaciones."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column field="patient.firstName" header="Nombre del Paciente" />
                    <Column field="patient.lastName" header="Apellido del Paciente" />
                    <Column field="symptom.name" header="Nombre del Síntoma" />
                    <Column field="assignedAt" header="Creado" />
                    <Column field="updatedAt" header="Actualizado" />
                    <Column
                        header="Acciones"
                        body={(rowData) => (
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteRelation(rowData)} />
                        )}
                    />
                </DataTable>

                <Dialog
                    visible={relationDialog}
                    header="Nueva Relación"
                    modal
                    onHide={hideDialog}
                    footer={
                        <>
                            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
                            <Button label="Guardar" icon="pi pi-check" onClick={saveRelation} />
                        </>
                    }
                >
                    <div className="field">
                        <label htmlFor="patient">Paciente</label>
                        <Dropdown
                            id="patient"
                            value={selectedPatient}
                            options={patients}
                            onChange={(e) => setSelectedPatient(e.value)}
                            optionLabel="firstName"
                            valueTemplate={(option) =>
                                option ? `${option.firstName} ${option.lastName}` : 'Seleccione un paciente'
                            }
                            itemTemplate={(option) =>
                                option ? `${option.firstName} ${option.lastName}` : 'Paciente no válido'
                            }
                            placeholder="Seleccione un paciente"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="symptom">Síntoma</label>
                        <Dropdown
                            id="symptom"
                            value={selectedSymptom}
                            options={symptoms}
                            onChange={(e) => setSelectedSymptom(e.value)}
                            optionLabel="name"
                            valueTemplate={(option) =>
                                option ? option.name : 'Seleccione un síntoma'
                            }
                            itemTemplate={(option) =>
                                option ? option.name : 'Síntoma no válido'
                            }
                            placeholder="Seleccione un síntoma"
                        />
                    </div>
                </Dialog>

                <Dialog
                    visible={deleteDialog}
                    header="Confirmar"
                    modal
                    onHide={() => setDeleteDialog(false)}
                    footer={
                        <>
                            <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialog(false)} className="p-button-text" />
                            <Button label="Sí" icon="pi pi-check" onClick={deleteRelation} autoFocus />
                        </>
                    }
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {selectedRelation && (
                            <span>
                                ¿Está seguro de que desea eliminar la relación entre <b>{selectedRelation.patientFirstName}</b> y{' '}
                                <b>{selectedRelation.symptomName}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default PatientSymptom;
