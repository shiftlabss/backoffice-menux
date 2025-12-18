
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ui/Form';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const { login, forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            if (isResetting) {
                await forgotPassword(email);
                setSuccess('Se o email estiver cadastrado, você receberá um link para redefinir sua senha.');
            } else {
                await login(email, password);
                navigate('/');
            }
        } catch (err) {
            setError(isResetting
                ? 'Erro ao solicitar redefinição. Tente novamente.'
                : 'Falha no login. Verifique suas credenciais.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsResetting(!isResetting);
        setError('');
        setSuccess('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/logo-menux.svg" alt="Menux" className="h-[40px] w-auto" />
                </div>
                <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-foreground">
                    {isResetting ? 'Redefinir Senha' : 'Bem-vindo de volta'}
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    {isResetting
                        ? 'Informe seu email para receber o link de redefinição'
                        : 'Entre para gerenciar seu restaurante'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-border sm:rounded-[24px] sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                        />

                        {!isResetting && (
                            <Input
                                label="Senha"
                                id="password"
                                name="password"
                                type="password"
                                required={!isResetting}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        )}

                        {!isResetting && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="text-sm font-medium text-primary hover:text-[#404040]"
                                >
                                    Esqueci minha senha
                                </button>
                            </div>
                        )}

                        {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
                        {success && <p className="text-green-600 text-sm text-center font-medium bg-green-50 p-2 rounded-lg border border-green-100">{success}</p>}

                        <div>
                            <Button type="submit" className="w-full bg-primary hover:bg-[#262626] text-white shadow-lg shadow-black/10" disabled={isLoading}>
                                {isLoading ? 'Processando...' : (isResetting ? 'Enviar Email' : 'Entrar')}
                            </Button>
                        </div>

                        {isResetting && (
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                >
                                    Voltar para o Login
                                </button>
                            </div>
                        )}
                    </form>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        &copy; 2024 Menux Technologies.
                    </p>
                </div>
            </div>
        </div>
    );
}
