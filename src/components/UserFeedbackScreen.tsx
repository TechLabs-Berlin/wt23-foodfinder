import React, { useState, useEffect } from "react";
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
} from "@ionic/react";

import "./main.css";

// user feedback buttons

function ProductUserFeedback() {
  const userFeedback = (buttonFeedback) => {
    if (buttonFeedback === "yes") {
      console.log("Product available");
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

//overlay screen with user feedback

function UserFeedbackScreen(props) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [props.name]);

  return (
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
        <ProductUserFeedback />
      </IonContent>
    </IonModal>
  );
}

export default UserFeedbackScreen;
