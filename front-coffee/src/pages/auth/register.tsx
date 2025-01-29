// Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { register } from '../api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rfidTag, setRfidTag] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register(name, email, password, rfidTag); // Call register API
            navigate('/login'); // Redirect to login on success
        } catch (err: any) {
            setError(err.message || 'Registration failed'); // Display error message
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-coffee-theme">
            <Card className="w-96 p-5">
                <h2 className="text-xl mb-4 text-center font-bold">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <CardContent>
                    <Input 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="mb-4" 
                    />
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="mb-4" 
                    />
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="mb-4" 
                    />
                    <Input 
                        type="text" 
                        placeholder="RFID Tag" 
                        value={rfidTag} 
                        onChange={(e) => setRfidTag(e.target.value)} 
                        className="mb-4" 
                    />
                    <Button onClick={handleRegister} className="w-full">Register</Button>
                </CardContent>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-coffee-link">Already have an account? Login</Link>
                </div>
            </Card>
        </div>
    );
}
