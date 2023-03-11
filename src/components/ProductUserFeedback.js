import { IonButton, IonItem } from "@ionic/react";
import { Icon } from "@iconify/react";

export default function ProductFound() {
    
    const userFeedback = (buttonFeedback) => {

        if (buttonFeedback === "yes") {
            console.log("Product available");
        }
        else {
            console.log("Product not available");
        }
    };

return (
<>
<IonItem>
    <IonButton slot="start" fill="clear" size="large" onClick={() => {userFeedback("yes");}}>
        <Icon icon="material-symbols:check" color="white" />
    </IonButton>
    <IonButton slot="start" fill="clear" size="large" onClick={() => {userFeedback("no");}}>
        <Icon icon="bx:x" color="white" />
    </IonButton>
</IonItem>
</>
)
}