import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  IonRippleEffect,
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  useIonAlert,
} from "@ionic/react";

import "./main.css";

// user feedback buttons yes/no
/*
function ProductUserFeedback() {
  const userFeedback = (buttonFeedback) => {
    if (buttonFeedback === "yes") {
      console.log("Product available");
      ProductUserFeedbackQty();
    } else {
      console.log("Product not available");
    }
  };
  return (
    <div className="wrapper">
      <b>Did you find the product?</b>

      <div
        className="ion-activatable ripple-parent"
        onClick={() => {
          userFeedback("yes");
        }}
      >
        <Icon icon="material-symbols:check" color="white" />
        <IonRippleEffect className="yes-button-ripple"></IonRippleEffect>
      </div>

      <div
        className="ion-activatable ripple-parent"
        onClick={() => {
          userFeedback("no");
        }}
      >
        <Icon icon="bx:x" color="white" />
        <IonRippleEffect className="no-button-ripple"></IonRippleEffect>
      </div>
    </div>
  );
}
*/

//overlay screen with user feedback yes/no

export default function UserFeedbackScreen(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [isProductFeedbackOpen, setProductFeedbackOpen] = useState(false);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    setIsOpen(true);
  }, [props]);

  const userFeedback = (buttonFeedback) => {
    if (buttonFeedback === "yes") {
      console.log("Product available");
      setProductFeedbackOpen(true);
    } else {
      console.log("Product not available");
    }
  };

  const handleProductFeedbackClose = () => {
    setProductFeedbackOpen(false);
  };

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{props.name}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="wrapper">
            <b>Did you find the product?</b>

            <div
              className="ion-activatable ripple-parent"
              onClick={() => {
                setTimeout(() => {
                  userFeedback("yes");
                  setIsOpen(false);
                }, 200);
              }}
            >
              <p>yes</p>
              <IonRippleEffect className="yes-button-ripple"></IonRippleEffect>
            </div>

            <div
              className="ion-activatable ripple-parent"
              onClick={() => {
                userFeedback("no");
                setTimeout(() => {
                  setIsOpen(false);
                  presentAlert({
                    subHeader: "Thank you for your feedback!",
                  });
                }, 200);
              }}
            >
              <p>no</p>
              <IonRippleEffect className="no-button-ripple"></IonRippleEffect>
            </div>
          </div>
        </IonContent>
      </IonModal>

      <ProductUserFeedback
        isOpen={isProductFeedbackOpen}
        onClose={handleProductFeedbackClose}
      />
    </>
  );
}

//overlay screen with user feedback - quantity

function ProductUserFeedback(props) {
  const [presentAlert] = useIonAlert();
  const handleBackButtonClick = () => {
    setTimeout(() => {
      props.onClose();
    }, 200);
  };

  const handleQtyButtonClick = () => {
    setTimeout(() => {
      props.onClose();
    }, 200);
    setTimeout(() => {
      presentAlert({
        subHeader: "Thank you for your feedback!",
      });
    }, 200);
  };

  return (
    <>
      <IonModal isOpen={props.isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle></IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleBackButtonClick}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="wrapper">
            <b>Quantity</b>

            <div
              className="ion-activatable ripple-parent"
              onClick={handleQtyButtonClick}
            >
              <p>some</p>
              <IonRippleEffect className="a-few-button-ripple"></IonRippleEffect>
            </div>

            <div
              className="ion-activatable ripple-parent"
              onClick={handleQtyButtonClick}
            >
              <p>many</p>
              <IonRippleEffect className="a-lot-button-ripple"></IonRippleEffect>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
}
