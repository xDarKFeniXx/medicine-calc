import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div>
            404 not found
            <Link to='/'></Link>
        </div>
    );
};

