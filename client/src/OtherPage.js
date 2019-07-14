import React from 'react';
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div>
           Text On Other Page
           <Link to="/">Go Home!</Link>
        </div>
    );
}