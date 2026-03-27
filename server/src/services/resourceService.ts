// import prisma from '../lib/prisma'; // Reserved for when we move resources to the database

export interface MentalHealthResource {
    id: string;
    name: string;
    type: 'COUNSELING' | 'HOSPITAL' | 'HOTLINE';
    address: string;
    phone: string;
    lat: number;
    lng: number;
    university?: string;
}

const STATIC_RESOURCES: MentalHealthResource[] = [
    {
        id: 'knust-counseling',
        name: 'KNUST Counseling Center',
        type: 'COUNSELING',
        address: 'Commercial Area, KNUST, Kumasi',
        phone: '+233 24 412 3456',
        lat: 6.6745,
        lng: -1.5716,
        university: 'KNUST'
    },
    {
        id: 'ug-hospital',
        name: 'University of Ghana Hospital',
        type: 'HOSPITAL',
        address: 'Legon, Accra',
        phone: '+233 30 250 1234',
        lat: 5.6508,
        lng: -0.1870,
        university: 'UNIVERSITY_OF_GHANA'
    },
    {
        id: 'pantang-hospital',
        name: 'Pantang Psychiatric Hospital',
        type: 'HOSPITAL',
        address: 'Adenta, Accra',
        phone: '+233 30 291 2345',
        lat: 5.7689,
        lng: -0.1745
    },
    {
        id: 'crisis-line-gh',
        name: 'National Crisis Hotline',
        type: 'HOTLINE',
        address: 'Remote',
        phone: '0800 123 456',
        lat: 0,
        lng: 0
    }
];

export class ResourceService {
    static async getNearbyResources(lat: number, lng: number): Promise<MentalHealthResource[]> {
        // Simple Haversine distance sorting
        const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
            if (lat1 === 0 || lat2 === 0) return 99999; // For hotlines
            const R = 6371; // km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        return [...STATIC_RESOURCES].sort((a, b) => {
            const distA = calculateDistance(lat, lng, a.lat, a.lng);
            const distB = calculateDistance(lat, lng, b.lat, b.lng);
            return distA - distB;
        }).slice(0, 5);
    }

    static async getResourceById(id: string): Promise<MentalHealthResource | null> {
        return STATIC_RESOURCES.find(r => r.id === id) || null;
    }
}
