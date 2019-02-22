export interface Project {
    'name'?: string;
    'description'?: string;
    'storeName'?: string;
    'storeNumber'?: number;
    'm2'?: number;
    'location'?: string;
    'localReception'?: Date;
    'openingDate'?: Date;
    'furnitureDate'?: Date;
    'alertsActivated'?: Boolean;
    'activities'?: Object[];
    'alerts'?: Object[];

}
