import { TodoContext } from "../contexts/todoContext";
import { useContext } from "react";
import { IonBadge, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { chatbubbleOutline, checkmark, createOutline, stop, stopwatchOutline, trash } from "ionicons/icons";

interface ContainerProps {

}

const ModalOpcoes: React.FC<ContainerProps> = () => {

    const { itemOpcoes, setItemOpcoes,
        openModalOpcoes, setOpenModalOpcoes,
        itemApontando,
        deleteItem, alteraStatusItem
    } = useContext(TodoContext);

    return (
        <>
            <IonModal isOpen={openModalOpcoes} initialBreakpoint={0.4} breakpoints={[0, 0.4, 0.5, 0.75]} onIonModalDidDismiss={() => { setOpenModalOpcoes(false); setItemOpcoes(null) }}>
                <IonContent >
                    <IonList lines='full'>

                        {itemOpcoes && !itemOpcoes.concluido &&
                            <IonItem>
                                <IonBadge slot='end' color="primary">
                                    <IonIcon icon={createOutline} style={{ fontSize: '20px' }} />
                                </IonBadge>
                                <IonLabel>
                                    Editar
                                </IonLabel>
                            </IonItem>
                        }

                        <IonItem>
                            <IonBadge slot='end' color="primary">
                                <IonIcon icon={chatbubbleOutline} style={{ fontSize: '20px' }} />
                            </IonBadge>
                            <IonLabel>
                                Comentários
                            </IonLabel>
                        </IonItem>

                        {itemOpcoes && !itemOpcoes.concluido &&
                            <>
                                {itemApontando && (itemApontando._id === itemOpcoes._id) ?
                                    <IonItem>
                                        <IonBadge slot='end' color="primary">
                                            <IonIcon icon={stop} style={{ fontSize: '20px' }} />
                                        </IonBadge>
                                        <IonLabel>
                                            Parar
                                        </IonLabel>
                                    </IonItem>
                                    :
                                    <IonItem>
                                        <IonBadge slot='end' color="primary">
                                            <IonIcon icon={stopwatchOutline} style={{ fontSize: '20px' }} />
                                        </IonBadge>
                                        <IonLabel>
                                            Apontar
                                        </IonLabel>
                                    </IonItem>
                                }
                            </>
                        }

                        {itemOpcoes && itemOpcoes.concluido ?
                            <IonItem onClick={() => alteraStatusItem(itemOpcoes)}>
                                <IonBadge slot='end' color="danger">
                                    <IonIcon icon={checkmark} style={{ fontSize: '20px' }} />
                                </IonBadge>
                                <IonLabel>
                                    Alterar para pendente
                                </IonLabel>
                            </IonItem>
                            :
                            <IonItem onClick={() => alteraStatusItem(itemOpcoes)}>
                                <IonBadge slot='end' color="success">
                                    <IonIcon icon={checkmark} style={{ fontSize: '20px' }} />
                                </IonBadge>
                                <IonLabel>
                                    Concluir
                                </IonLabel>
                            </IonItem>
                        }

                        <IonItem onClick={() => deleteItem(itemOpcoes)}>
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

export default ModalOpcoes;
