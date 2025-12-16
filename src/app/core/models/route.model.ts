import { Truck } from './truck.model';
import { Load } from './load.model';

export interface Route {
    id: string;
    routeNumber: string;
    scheduledDate: string;
    status: string;
    truck?: Truck | null;
    loads?: Load[]; // Used for detail, omit for list
}