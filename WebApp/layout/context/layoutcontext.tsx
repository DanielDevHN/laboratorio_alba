'use client';
import React, { useState, createContext, useCallback, useContext, useRef } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '@/types';
import { PrimeReactContext } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const { changeTheme } = useContext(PrimeReactContext);
    const toast = useRef<Toast>(null);
    const router = useRouter(); // Para redirigir al usuario

    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const toggleTheme = useCallback(() => {
        const newTheme = layoutConfig.colorScheme === 'light' ? 'viva-dark' : 'lara-light-indigo';
        const newColorScheme = layoutConfig.colorScheme === 'light' ? 'dark' : 'light';

        changeTheme?.(layoutConfig.theme, newTheme, 'theme-css', () => {
            setLayoutConfig((prevConfig) => ({
                ...prevConfig,
                theme: newTheme,
                colorScheme: newColorScheme,
            }));
        });
    }, [layoutConfig, changeTheme]);

    const showLogoutDialog = () => {
        setLogoutDialogVisible(true);
    };

    const logout = () => {
        // Lógica para cerrar sesión
        try {
            // Eliminar token almacenado
            localStorage.removeItem('authToken'); // O sessionStorage.removeItem si usas sessionStorage
            sessionStorage.removeItem('authToken'); // Opcional, en caso de tener token aquí

            // Mostrar mensaje de éxito
            toast.current?.show({
                severity: 'success',
                summary: 'Sesión cerrada',
                detail: 'Tu sesión ha sido cerrada correctamente.',
                life: 3000
            });

            // Redirigir al usuario a la página de inicio de sesión
            router.push('/login'); // Cambia '/login' por la ruta de tu página de login
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cerrar la sesión.',
                life: 3000
            });
        } finally {
            setLogoutDialogVisible(false);
        }
    };

    const cancelLogout = () => {
        setLogoutDialogVisible(false);
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        toggleTheme,
        logout: showLogoutDialog // Exponer el método para mostrar el diálogo
    };

    return (
        <LayoutContext.Provider value={value}>
            <Toast ref={toast} />
            {children}

            {/* Diálogo de confirmación de logout */}
            <Dialog
                visible={logoutDialogVisible}
                header="Confirmar Logout"
                modal
                onHide={cancelLogout}
                footer={
                    <>
                        <Button label="No" icon="pi pi-times" onClick={cancelLogout} className="p-button-text" />
                        <Button label="Sí" icon="pi pi-check" onClick={logout} autoFocus />
                    </>
                }
            >
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>¿Estás seguro de que deseas cerrar sesión?</span>
                </div>
            </Dialog>
        </LayoutContext.Provider>
    );
};
