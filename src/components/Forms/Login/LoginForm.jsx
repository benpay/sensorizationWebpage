import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import '../FormStyle.css';

export const LoginForm = ({ onSwitchForm, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || 'No se pudo completar el login.');
            }

            setMessage(data.message || 'Login completado correctamente.');
            setFormData({ email: '', password: '' });
            onLoginSuccess();
        } catch (error) {
            setMessage(error.message || 'No se pudo conectar con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">

                <div className="form-header">
                    <h1>Sensorization</h1>
                    <p>Inicio de sesión</p>
                </div>


                <form onSubmit={handleSubmit} className="form-form">

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <User className="input-icon left-icon" size={18} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="nombre@empresa.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon left-icon" size={18} />
                            <input
                                type='password'
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>


                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Logeando...' : 'Logearse'}
                    </button>

                    {message && <p role="alert">{message}</p>}

                    <button type="button" className="btn-secondary" onClick={onSwitchForm}>
                        Crear una cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};
