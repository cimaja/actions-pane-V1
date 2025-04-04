import React, { useState, useEffect } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Stack } from '@fluentui/react/lib/Stack';

// Simple hash function for basic security
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

// The correct password hash
const CORRECT_HASH = hashPassword('actions2025');

interface LoginOverlayProps {
  onAuthenticated: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('actionsPane_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleLogin = () => {
    if (hashPassword(password) === CORRECT_HASH) {
      localStorage.setItem('actionsPane_authenticated', 'true');
      setIsAuthenticated(true);
      onAuthenticated();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Password Protected</h1>
        
        <p className="text-gray-600 mb-6 text-center">This site is password protected. Please enter the password to continue.</p>
        
        <Stack tokens={{ childrenGap: 16 }}>
          {error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {error}
            </MessageBar>
          )}
          
          <TextField
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(_, newValue) => setPassword(newValue || '')}
            onKeyPress={handleKeyPress}
            autoFocus
            borderless={false}
          />
          
          <PrimaryButton 
            text="Submit" 
            onClick={handleLogin}
            disabled={!password}
            styles={{
              root: {
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: '#3B82F6'
              }
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default LoginOverlay;
