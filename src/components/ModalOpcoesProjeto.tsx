import { useContext, useEffect } from "react";
import { IonBadge, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { chatbubbleOutline, checkmark, createOutline, list, stop, stopwatchOutline, trash } from "ionicons/icons";
import { Projeto } from "../@types/projeto";
import { ProjetoContext } from "../contexts/projetoContext";
import { useHistory } from "react-router";

interface ContainerProps {

}

const ModalOpcoesProjeto: React.FC<ContainerProps> = () => {
    const { projeto, setProjeto,
        openModalOpcoes, setOpenModalOpcoes,
        setId,
        deleteItem, alteraStatusItem, updateItem, setOpenModalFormulario
    } = useContext(ProjetoContext);

    const history = useHistory();


    return (
        <>
            <IonModal isOpen={openModalOpcoes} initialBreakpoint={0.4} breakpoints={[0, 0.4, 0.5, 0.75]} onIonModalDidDismiss={() => { setOpenModalOpcoes(false); setProjeto(null) }}>
                <IonContent >
                    <IonList lines='full'>

                        {projeto && !projeto.concluido &&
                            <IonItem onClick={() => { setOpenModalFormulario(true); setId(projeto._id) }}>
                                <IonBadge slot='end' color="primary">
                                    <IonIcon icon={createOutline} style={{ fontSize: '20px' }} />
                                </IonBadge>
                                <IonLabel>
                                    Editar
                                </IonLabel>
                            </IonItem>
                        }

                        <IonItem onClick={() => { setOpenModalOpcoes(false); history.push('/todo/'+projeto._id) }}>
                            <IonBadge slot='end' color="primary">
                                <IonIcon icon={list} style={{ fontSize: '20px' }} />
                            </IonBadge>
                            <IonLabel>
                                Tarefas
                            </IonLabel>
                        </IonItem>

                        {projeto && projeto.concluido ?
                            <IonItem onClick={() => alteraStatusItem(projeto)}>
                                <IonBadge slot='end' color="danger">
                                    <IonIcon icon={checkmark} style={{ fontSize: '20px' }} />
                                </IonBadge>
                                <IonLabel>
                                    Alterar para pendente
                                </IonLabel>
                            </IonItem>
                            :
                            <IonItem onClick={() => alteraStatusItem(projeto)}>
                                <IonBadge slot='end' color="success">
                                    <IonIcon icon={checkmark} style={{ fontSize: '20px' }} />
                                </IonBadge>
                                <IonLabel>
                                    Concluir
                                </IonLabel>
                            </IonItem>
                        }

                        <IonItem onClick={() => deleteItem(projeto)}>
                            <IonBadge slot='end' color="danger">
                                <IonIcon icon={trash} style={{ fontSize: '20px' }} />
                            </IonBadge>
                            <IonLabel>
                                Deletar
                            </IonLabel>
                        </IonItem>

                    </IonList>
                </IonContent>
            </IonModal>
        </>
    )
}

export default ModalOpcoesProjeto;
