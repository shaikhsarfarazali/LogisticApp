export interface Load {
    id: string;
    referenceNumber: string;
    pickupAddress: string;
    deliveryAddress: string;
    status: string;
    routeId?: string | null;
}