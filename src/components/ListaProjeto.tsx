import { IonBadge, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { Projeto } from "../@types/projeto";
import { checkbox } from "ionicons/icons";
import { ProjetoContext } from "../contexts/projetoContext";
import { useContext } from "react";

interface ContainerProps {
    projetoAtual: Projeto
}

const Lista: React.FC<ContainerProps> = ({ projetoAtual }) => {
    const { setOpenModalOpcoes } = useContext(ProjetoContext);

    return (
        <>
            <IonList lines={"full"}>
                <IonItem onClick={() => { setOpenModalOpcoes(true); }}>
                    <IonLabel className="ion-text-wrap">
                        <div>{projetoAtual.nome}</div>
                        <div className="ion-float-end" style={{ display: 'flex' }}>
                            <IonBadge style={{ display: 'flex' }}>
                                <label className='ion-align-self-center'>
                                    3
                                </label>
                                <IonIcon icon={checkbox} style={{ fontSize: "24px" }} />
                            </IonBadge>
                        </div>
                    </IonLabel>
                </IonItem>
            </IonList>
        </>
    );
};

export default Lista;
