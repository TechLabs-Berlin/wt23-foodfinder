import React from 'react';

class UserLoc extends React.Component{
    // Specific to JavaScript, not react
    // Recommended not to do data loading in constructor,
    // do in componentDidMount instead
    constructor(props){
        super(props); // Reference to Parent's constructor -- must be called 

        this.state = { lon: null, lat: null, errorMessage: '' };
    }

    // Alternatively to using 'constructor(props),' simply write:
    // state = { lat: null, errorMessage: ' ' };

    componentDidMount(){
        // get location
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude, lon:position.coords.longitude}),
                // never write 'this.state.lat = position.coords.latitude'
                // -- only ever do direct assignment in initialization
            (err) => this.setState({ errorMessage: err.message})
        );        
    }

    // Helper function, avoids multiple return statements in render method
    // Easier to wrap everything in render with a common element
    renderContent(){
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat){
            return( //<SeasonDisplay lat={this.state.lat} />
            <div>
              <p>Current latitude: {this.state.lat}</p>
              <p>Current longitude: {this.state.lon}</p>
              </div>);
        }
        
        //return <div>"Please accept location request"</div>;
    }

    // Render is required
    // componentDidMount, componentDidUpdate, componentWillUnmount not required
    // Render is re-run every time 'setState' is called
    // Do not initialize requests in render method as it is called often
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default UserLoc;