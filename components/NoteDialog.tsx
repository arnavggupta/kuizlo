"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';
import { Plus } from 'lucide-react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NoteDialog() {
    const [noteName, setNoteName] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();

    const handleClick = async (e: any) => {
        e.preventDefault();

        if (noteName === '') {
            window.alert('Please Enter Notebook Name');
            return;
        }

        setLoading(true); // Set loading to true when the request starts

        try {
            const response = await axios.post('/api/createNotebook', { name: noteName });
            router.push(`/notebook/${response.data.data.id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            window.alert('Failed to create notebook. Please try again.');
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className='border-dashed border-2 flex border-green-600 h-full
                        rounded-lg items-center justify-center sm:flex-col p-5'
                >
                    <h2 className='font-semibold text-green-600 sm:mt-2'>
                        <Plus size={16} />
                        Create New Notebook
                    </h2>
                </div>
            </DialogTrigger>
            <DialogContent className='bg-white'>
                <DialogHeader>
                    <DialogTitle className='font-extrabold'>New Notebook</DialogTitle>
                    <DialogDescription>
                        You can create a new notebook from here.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input
                        placeholder='Enter Notebook Name'
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                    />
                    <div className='h-4'></div>

                    <Button
                        type='submit'
                        className='bg-green-600 text-white'
                        onClick={handleClick}
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? 'Creating...' : 'Create'} {/* Show loading text */}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
