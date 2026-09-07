const API_BASE_URL = 'http://localhost:5000';

const request = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'La petición no se pudo completar.');
    }

    return data;
};

export const login = (credentials) => request('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
});

export const registerUser = (userData) => request('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
});

export const registerSensor = (sensorData) => request('/sensors/registerSensor', {
    method: 'POST',
    body: JSON.stringify(sensorData)
});

export const updateSensor = (sensorId, sensorData) => request(`/sensors/updateSensorById/${sensorId}`, {
    method: 'PATCH',
    body: JSON.stringify(sensorData)
});

export const getSensors = () => request('/sensors/getSensors', {
    method: 'GET'
});

export const getSensorById = (sensorId) => request(`/sensors/getSensorById/${sensorId}`, {
    method: 'GET'
});

export const deleteSensorById = (sensorId) => request(`/sensors/deleteSensorById/${sensorId}`, {
    method: 'DELETE'
});

export const ingestById = (sensorId, sensorData) => request(`/ingestion/ingest/${sensorId}/ingest`, {
    method: 'POST',
    body: JSON.stringify(sensorData)
});