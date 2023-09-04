export const handleError = ({ error, event }) => {
	return {
		// this will be the error message
		message: 'An unexpected error occurred',
		code: 'INTERNAL_ERROR_CLIENT'
	};
};
