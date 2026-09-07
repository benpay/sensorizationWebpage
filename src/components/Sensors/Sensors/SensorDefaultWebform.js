import { useState } from 'react';
import {
    Hash,
    FileInputIcon,
    Link,
    Settings,
    Search
} from 'lucide-react';
import '../../Forms/FormStyle.css';

export const SensorWebform = ({ formSensorMode = 'add' }) => {
    const [sensorData, setSensorData] = useState({
        name: '',
        sensorCode: '',
        type: '',
        status: '',
        url: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        const isAddMode = formSensorMode === 'add';
        const endpoint = isAddMode
            ? 'http://localhost:5000/sensors/registerSensor'
            : `http://localhost:5000/sensors/updateSensorById/${sensorData.id}`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sensorData)
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || 'No se pudo registrar el sensor.');
            }

            setMessage(data.message || 'Sensor registrado correctamente.');
            setSensorData({ name: '', sensorCode: '', type: '', status: '', url: '' });
        } catch (error) {
            setMessage(error.message || 'No se pudo conectar con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formActions = {
        add: {
            title: 'Añadir nuevo sensor',
            description: 'Introduce los datos del nuevo sensor',
            button: 'Añadir',
            loadingButton: 'Añadiendo...'
        },
        update: {
            title: 'Actualizar sensor',
            description: 'La actualización se hace por UUID, por favor introducir uno existente',
            button: 'Actualizar',
            loadingButton: 'Actualizando...'
        },
        search: {
            title: 'Buscar sensor',
            description: 'Introduce los datos del sensor',
            button: 'Buscar',
            loadingButton: 'Buscando...'
        },
        delete: {
            title: 'Eliminar sensor',
            description: 'Selecciona el sensor que deseas eliminar',
            button: 'Eliminar',
            loadingButton: 'Eliminando...'
        }
    };
    const currentAction = formActions[formSensorMode] || formActions.add;
    const buttonAction = () => {
        const action = formActions[formSensorMode] || formActions.add;
        return isSubmitting
            ? action.loadingButton
            : action.button;
    }

    // const [searchSensorId, setSearchSensorId] = useState('');
    // const [searchSensorResults, setSearchSensorResults] = useState([]);
    // const [isSearching, setIsSearching] = useState(false);

    // const handleSearch = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/sensor/${searchSensorId}`);
    //         const data = await response.json();
    //         setSensorData(data);
    //     } catch (error) {
    //         setMessage(error.message || 'No se pudo conectar con el servidor.');
    //     }
    // }   

    return (
        <main className="main-content">
            <div className="page-header">
                <h1>{currentAction.title}</h1>
                <p>{currentAction.description}</p>
            </div>

            <div className="sensor-card">
                <form onSubmit={handleSubmit} className="form-form">
                    {formSensorMode === 'update' ? (

                        <div className="form-group">
                            <label htmlFor="name">UUID del sensor</label>
                            <div className="input-wrapper">
                                <FileInputIcon className="input-icon left-icon" size={18} />
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    placeholder="Ej: b10d9768-aed3-4973-a870-4d0edcb7adf8"
                                    value={sensorData.id}
                                    onChange={(e) => setSensorData({ ...sensorData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    ) : <>  </> }
                    <div className="form-group">
                        <label htmlFor="name">Nombre del sensor</label>
                        <div className="input-wrapper">
                            <FileInputIcon className="input-icon left-icon" size={18} />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ej: temp002"
                                value={sensorData.name}
                                onChange={(e) => setSensorData({ ...sensorData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sensorCode">Código del sensor</label>
                        <div className="input-wrapper">
                            <Hash className="input-icon left-icon" size={18} />
                            <input
                                type="text"
                                id="sensorCode"
                                name="sensorCode"
                                placeholder="Ej: TS-001"
                                value={sensorData.sensorCode}
                                onChange={(e) => setSensorData({ ...sensorData, sensorCode: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Tipo</label>
                        <div className="input-wrapper">
                            <Settings className="input-icon left-icon" size={18} />
                            <select
                                id='type'
                                name='type'
                                value={sensorData.type}
                                onChange={(e) => setSensorData({ ...sensorData, type: e.target.value })}
                                required
                            >
                                <option value="HTTP_POLL">HTTP_POLL</option>
                                <option value="MANUAL_UPLOAD">MANUAL_UPLOAD</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Estado</label>
                        <div className="input-wrapper">
                            <Settings className="input-icon left-icon" size={18} />
                            <select
                                id='status'
                                name='status'
                                value={sensorData.status}
                                onChange={(e) => setSensorData({ ...sensorData, status: e.target.value })}
                                required
                            >
                                <option value="active">ACTIVE</option>
                                <option value="paused">PAUSED</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <div className="input-wrapper">
                            <Link className="input-icon left-icon" size={18} />
                            <input
                                type="url"
                                id="url"
                                name="url"
                                placeholder="Ej: http://sensorizacion:3050/sensors/ts-001"
                                value={sensorData.url}
                                onChange={(e) => setSensorData({ ...sensorData, url: e.target.value })}                                
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {buttonAction()}
                    </button>

                    {message && <p role="alert">{message}</p>}
                </form>
            </div>
        </main>
    );
}