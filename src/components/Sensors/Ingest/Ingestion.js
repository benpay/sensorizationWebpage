import { useState } from 'react';
import '../../Forms/FormStyle.css';
import { ingestById } from '../../../services/api';
import {
    FileInputIcon
} from 'lucide-react';

export const IngestData = () => {
    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const [sending, setIsSending] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setMessage('');


        try {
            let parsedData;

            try {
                parsedData = JSON.parse(data);
            } catch (e) {
                throw new Error('El formato introducido no es un JSON valido.')
            }

            const responseData = await ingestById(id, parsedData);
            setMessage(responseData.message || 'Datos insertados correctamente.');
        } catch (error) {
            setMessage(error.message || 'No se pudieron insertar los datos.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main className="main-content">
            <div className="page-header">
                <h1>Ingesta de datos</h1>
                <p>Ingesta de datos en la base de datos</p>
            </div>
            <div className="sensor-card">                        <div className="form-group">
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
                <form onSubmit={handleSubmit} className="form-form">
                    <div className="form-group">
                        <label htmlFor="ingestion-data">Datos</label>
                        <textarea
                            id="ingestion-data"
                            name="ingestion-data"
                            rows="16"
                            placeholder="Introduce aquí los datos..."
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={sending}>
                        {sending ? 'Enviando...' : 'Enviar'}
                    </button>

                    {message && <p role="alert">{message}</p>}
                </form>
            </div>
        </main>
    );
};