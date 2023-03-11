import ProductUserFeedback from "./ProductUserFeedback";

export default function UserFeedbackScreen(props) {
        return (
          <div>
            <h2>{props.name}</h2>
           {/* <p>Lat: {props.lat}, Lng: {props.lng}</p> */}
           <ProductUserFeedback />
          </div>
        );
      }
