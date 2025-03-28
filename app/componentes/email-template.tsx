import * as React from 'react';

interface EmailTemplateProps {
    mensaje: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    mensaje,
}) => (
    <div>
        <h1>Welcome, {mensaje}!</h1>
    </div>
);