export interface Load {
    id: string;
    referenceNumber: string;
    pickupAddress: string;
    deliveryAddress: string;
    status: string;
    capacity: number;
    routeId?: string | null;
}