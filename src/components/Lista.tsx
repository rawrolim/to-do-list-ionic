import { IonItem, IonLabel, IonList } from "@ionic/react";
import Item from "../interfaces/Item";

interface ContainerProps {
    item: Item
}

const Lista: React.FC<ContainerProps> = ({ item }) => {
    return (
        <IonList lines={"full"}>
            <IonItem detail={true} href={"/todo/"+item._id}>
                <IonLabel className="ion-text-wrap">
                    {item.titulo}
                </IonLabel>
            </IonItem>
        </IonList>
    );
};

export default Lista;
