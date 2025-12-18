import React from 'react';

const Loading = ({
    fullScreen = false,
    size = 'medium',
    text = 'Carregando...',
    className = ''
}) => {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-2',
        large: 'w-12 h-12 border-4',
    };

    const spinner = (
        <div className={`
      ${sizeClasses[size] || sizeClasses.medium}
      border-gray-200 border-t-gray-900 
      rounded-full animate-spin 
      ${className}
    `} />
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        {spinner}
                    </div>
                    {text && <p className="text-gray-600 text-sm">{text}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {spinner}
            {text && <p className="text-gray-500 text-sm mt-2">{text}</p>}
        </div>
    );
};

export default Loading;
