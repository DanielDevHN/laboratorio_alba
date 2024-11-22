/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Pacientes',
            items: [
                { label: 'Registrar Pacientes', icon: 'pi pi-fw pi-human', to: '/pages/vehicles' },
                { label: 'Ver Lista de Pacientes', icon: 'pi pi-fw pi-check-square', to: '/pages/list-vehicles' }
            ]
        },
        {
            label: 'Sintomas',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Registrar Sintomas',
                    icon: 'pi pi-fw pi-ticket',
                    to: '/pages/entries-exits'
                },
                {
                    label: 'Filtros Sintomas por Paciente',
                    icon: 'pi pi-fw pi-filter',
                    to: '/pages/list-entries-exits'
                }
            ]
        },
        {
            label: 'Citas',
            icon: 'pi pi-fw pi-calendar',
            to: '/pages',
            items: [
                {
                    label: 'Registrar Sintomas a Paciente',
                    icon: 'pi pi-fw pi-ticket',
                    to: '/pages/entries-exits'
                },
                {
                    label: 'Filtros Sintomas por Paciente',
                    icon: 'pi pi-fw pi-filter',
                    to: '/pages/list-entries-exits'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://samsahn.com/" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Samsa" className="w-full mt-3" src={"https://samsahn.com/wp-content/uploads/2022/06/samsa-logo-h.svg"} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
