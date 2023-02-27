import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.state = { lng: null, lat: null };
    }

    // get location
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition((position) =>
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
        );
    }
    render() {
        return (
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={this.state}
                    zoom={14}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </LoadScript>
        );
    }
}

export default Maps;

//https://react-google-maps-api-docs.netlify.app/
//npm install --save @react-google-maps/api
