class GeocodeFeature {
    type: string = '';

    geometry = {
        type: '',
        coordinates:  []
    };

     properties = {
        label: '',

        score: 0,

        housenumber: '',

        id: '',

        type: '',

        name: '',

        postcode: '',

        citycode: '',

        x: 0,

        y: 0,

        city: '',

        context: '',

        importance: 0,

        street: ''
    };

    attribution: string = '';

    licence: string = '';

    query: string = '';

    limit: number = 0;

    constructor(geocodeFeature?: GeocodeFeature) {
        if( geocodeFeature !== null && geocodeFeature !== undefined ) {
            this.limit = geocodeFeature.limit;
            this.licence = geocodeFeature.licence;
            this.properties = geocodeFeature.properties;
            this.type = geocodeFeature.type;
            this.query = geocodeFeature.query;
            this.attribution = geocodeFeature.attribution;
            this.geometry = geocodeFeature.geometry;
        }
    }
}

class GeocodeResponse {
    type = '';

    version = '';

    features: GeocodeFeature[] = [];

    constructor( geocodeResponse?: GeocodeResponse) {
        if (geocodeResponse !== null && geocodeResponse !== undefined) {
            this.type = geocodeResponse.type;
            this.version = geocodeResponse.version;
            this.features = geocodeResponse.features;
        }
    }
}

export { GeocodeFeature, GeocodeResponse };
