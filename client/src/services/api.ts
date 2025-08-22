const API_BASE_URL = 'http://localhost:5000/api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phoneNumber?: string;
}

export interface AuthResponse {
    token: string;
    user: UserDto;
    expiresAt: string;
}

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber?: string;
    createdAt: string;
    lastLoginAt?: string;
    pictureUrl?: string;
}

export interface GoogleAuthRequest {
    idToken: string;
}

export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    pictureUrl?: string;
}

class ApiService {
    private getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка входу');
        }

        return response.json();
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка реєстрації');
        }

        return response.json();
    }

    async getCurrentUser(): Promise<UserDto> {
        console.log('API: Getting current user...');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: this.getAuthHeaders(),
        });

        console.log('API: Response status:', response.status);

        if (!response.ok) {
            console.error('API: Error getting user data');
            throw new Error('Не вдалося отримати дані користувача');
        }

        const userData = await response.json();
        console.log('API: User data received:', userData);
        return userData;
    }

    async getProducts() {
        const response = await fetch(`${API_BASE_URL}/products`, {
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Не вдалося отримати товари');
        }

        return response.json();
    }

    async getCategories() {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Не вдалося отримати категорії');
        }

        return response.json();
    }

    async googleAuth(idToken: string): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка Google автентифікації');
        }

        return response.json();
    }

    async updateProfile(userData: UpdateProfileRequest): Promise<UserDto> {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Помилка оновлення профілю');
        }

        return response.json();
    }
}

export const apiService = new ApiService();
