const API_URL = 'http://localhost:3000';

// API helper for making authenticated requests
export const apiRequest = async (endpoint: string, options: any = {}): Promise<Response> => {
    let accessToken = localStorage.getItem('accessToken');

    const headers = {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
    };

    let response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    // Handle token expiration and refresh
    if (response.status === 401 && accessToken) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                // Retry the original request
                return apiRequest(endpoint, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.accessToken}`,
                    },
                });
            } else {
                // Clear all session data if refresh fails
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
    }

    return response;
};
