import React, { useState, useEffect } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

export default function Battle() {
    useEffect(() => {
        
    }, []);
    return (
        <div className='flex flex-row h-screen w-full'>
            <div className='w-1/3'>
            </div>
            <div className='w-2/3'>
                <Editor defaultLanguage='Python'></Editor>
            </div>
        </div>
    );
}