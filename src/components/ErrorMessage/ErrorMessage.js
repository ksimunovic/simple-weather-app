import React from 'react';
    import PropTypes from 'prop-types';
    import './ErrorMessage.scss'; // Optional for styling

    const ErrorMessage = ({ message }) => {
        if (!message) return null;

        return (
            <div className="error-message" role="alert">
                {message}
            </div>
        );
    };

    ErrorMessage.propTypes = {
        message: PropTypes.string,
    };

    export default ErrorMessage;