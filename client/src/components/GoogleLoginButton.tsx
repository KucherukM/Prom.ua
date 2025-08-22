import React, { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

declare global {
    interface Window {
        google: any;
    }
}

interface GoogleLoginButtonProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
    const { loginWithGoogle, loading } = useAuth();

    useEffect(() => {
        // Load Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '392333680083-lkmvmouhgs150sbnsoe62ki525or112m.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('google-login-button'),
                    {
                        theme: 'outline',
                        size: 'large',
                        type: 'standard',
                        text: 'signin_with',
                        shape: 'rectangular',
                        logo_alignment: 'left',
                    }
                );
            }
        };

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const handleCredentialResponse = async (response: any) => {
        try {
            const success = await loginWithGoogle(response.credential);
            if (success) {
                onSuccess?.();
            } else {
                onError?.('Помилка автентифікації через Google');
            }
        } catch (error) {
            onError?.('Помилка автентифікації через Google');
        }
    };

    const handleManualGoogleLogin = () => {
        // Fallback for manual Google login
        if (window.google && window.google.accounts) {
            window.google.accounts.id.prompt();
        } else {
            onError?.('Google автентифікація недоступна');
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <div id="google-login-button"></div>
        </Box>
    );
};

export default GoogleLoginButton;
