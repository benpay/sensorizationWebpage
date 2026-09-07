import { SensorWebform } from '../Sensors/SensorDefaultWebform';
import { useState } from 'react';
import './Sidebar.css';
import {
    LogOut,
    Plus,
    RefreshCw,
    Trash2,
    List,
    Search,
    CloudUpload
} from 'lucide-react';

export const SidebarComponent = ({ onLogout }) => {
    const [formSensorMode, setFormSensorMode] = useState('add');

    return (
        <div className="dashboard-container">
            {/* MENU SUPERIOR */}
            <header className="dashboard-header">
                <h1>Sensorization</h1>
                <button onClick={onLogout} type='button' className="btn-logout" title="Cerrar sesión">
                    <LogOut size={16} />
                    <span>Cerrar sesión</span>
                </button>
            </header>

            <div className="dashboard-body">
                {/* MENU LATERAL */}
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <span className='sidebar-label'>MENÚ</span>
                        <h3 className='sidebar-title'>Sensores</h3>
                        <nav className='sidebar-menu'>
                            <button
                                type="button"
                                className={`menu-item ${formSensorMode === 'add' ? 'active' : ''}`}
                                onClick={() => setFormSensorMode('add')}>
                                <Plus size={16} />
                                <span>Añadir</span>
                            </button>
                            <button
                                type="button"
                                className={`menu-item ${formSensorMode === 'add' ? 'active' : ''}`}
                                onClick={() => setFormSensorMode('update')}>
                                <RefreshCw size={16} />
                                <span>Actualizar</span>
                            </button>
                            <button className='menu-item'>
                                <Trash2 size={16} />
                                <span>Eliminar</span>
                            </button>
                            <button className='menu-item'>
                                <List size={16} />
                                <span>Listar</span>
                            </button>
                            <button className='menu-item'>
                                <Search size={16} />
                                <span>Buscar</span>
                            </button>
                            <button className='menu-item'>
                                <CloudUpload size={16} />
                                <span>Subir datos</span>
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* FORMULARIO DEL SENSOR*/}
                <SensorWebform formSensorMode={formSensorMode} />
            </div>
        </div >
    );
};