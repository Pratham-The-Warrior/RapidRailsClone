const API_BASE = '/api';

export async function searchRoutes(params) {
    const response = await fetch(`${API_BASE}/route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to search routes');
    }

    return response.json();
}
