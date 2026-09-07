import { useEffect, useState } from 'react';
import {
    FileInputIcon
} from 'lucide-react';
import '../../Forms/FormStyle.css';
import { deleteSensorById, getSensorById, getSensors } from '../../../services/api';


export const ListSensors = ({ formSensorMode = 'search' }) => {
    const [id, setId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [message, setMessage] = useState('');
    const [sensor, setSensor] = useState(null);

    useEffect(() => {
        setSensor(null);
        setMessage('');
        setId('');

        if (formSensorMode === 'list') {
            loadSensors();
        }
    }, [formSensorMode]);
    
    const buttonAction = () => {
        const action = formActions[formSensorMode];
        return isSearching
            ? action.loadingButton
            : action.button;
    }

    const loadSensors = async () => {
        setIsSearching(true);
        setMessage('');

        try {
            const data = await getSensors();
            setSensor(data.sensors || data);
        } catch (error) {
            setMessage(error.message || 'No se pudieron cargar los sensores.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        setMessage('');
        setSensor(null);

        try {
            let data;
            if (formSensorMode === 'search') {
                data = await getSensorById(id);
                setSensor(data.sensor || data);
                setMessage('Sensor encontrado correctamente.');
            }
            else if (formSensorMode === 'delete') {
                data = await deleteSensorById(id);
                setMessage(data.message || 'Sensor borrado satisfactoriamente.');
            }
        } catch (error) {
            setMessage(error.message || 'No se pudo encontrar el sensor.');
        } finally {
            setIsSearching(false);
        }
    };
    const formActions = {
        search: {
            title: 'Buscar sensor',
            description: 'Introduce el UUID del sensor a buscar',
            button: 'Buscar',
            loadingButton: 'Buscando...'
        },
        list: {
            title: 'Lista de sensores',
            description: 'Listado de sensores en la base de datos',
            button: 'Listar',
            loadingButton: 'Listando...'
        },
        delete: {
            title: 'Sensor a borrar',
            description: 'Borrado de sensor mediante UUID',
            button: 'Borrar',
            loadingButton: 'Borrando...'
        },
    };

    const currentAction = formActions[formSensorMode] || formActions.search;
    return (
        <main className="main-content">
            <div className="page-header">
                <h1>{currentAction.title}</h1>
                <p>{currentAction.description}</p>
            </div>
            <div className="sensor-card">
                {formSensorMode === 'search' || formSensorMode === 'delete' ? (
                    <form onSubmit={handleSubmit} className="form-form">
                        <div className="form-group">
                            <label htmlFor="name">UUID del sensor</label>
                            <div className="input-wrapper">
                                <FileInputIcon className="input-icon left-icon" size={18} />
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    placeholder="Ej: b10d9768-aed3-4973-a870-4d0edcb7adf8"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" disabled={isSearching}>
                            {buttonAction()}
                        </button>
                        {message && <p role="alert">{message}</p>}
                    </form>
                ) : (
                    <div className="form-form">
                        {isSearching && <p>Cargando sensores...</p>}
                        {!isSearching && !sensor && !message && (
                            <p>No hay sensores para mostrar.</p>
                        )}
                        {message && <p role="alert">{message}</p>}
                    </div>
                )}
                {sensor && (
                    <pre>{JSON.stringify(sensor, null, 2)}</pre>
                )}
            </div>
        </main>
    );
}