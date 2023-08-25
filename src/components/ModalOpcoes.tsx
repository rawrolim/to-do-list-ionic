import { TodoContext } from "../contexts/todoContext";
import { useContext, useEffect } from "react";
import { IonBadge, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { chatbubbleOutline, checkmark, createOutline, stop, stopwatchOutline, trash } from "ionicons/icons";
import { Item } from "../@types/todo";

interface ContainerProps {

}

const ModalOpcoes: React.FC<ContainerProps> = () => {

    const { itemOpcoes, setItemOpcoes,
        openModalOpcoes, setOpenModalOpcoes,
        itemApontando, setItemApontando,
        deleteItem, alteraStatusItem, updateItem
    } = useContext(TodoContext);

    function selecionarItem(item: Item) {
        setItemApontando(item);
        localStorage.setItem("itemApontando", JSON.stringify(item));
        localStorage.setItem("tempoItemAtual", JSON.stringify({tempo: itemApontando.tempo, deadLine: Date.now()}));
        setOpenModalOpcoes(false);
    }

    function pararItem(){
        setItemApontando(null);
        localStorage.setItem("itemApontando", JSON.stringify(null));
        localStorage.setItem("tempoItemAtual", JSON.stringify(null));
        setOpenModalOpcoes(false);
    }

    function apontarItem() {
        if (itemApontando) {
            const tempoItemAtual = JSON.parse(localStorage.getItem("tempoItemAtual"));
            itemApontando.tempo = Math.floor((Date.now() - tempoItemAtual.deadLine)/1000);
            updateItem(itemApontando);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            apontarItem()
        }, 1000);

        return () => clearInterval(interval);
    }, [itemApontando]);

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
                                    <IonItem onClick={() => {pararItem()}}>
                                        <IonBadge slot='end' color="primary">
                                            <IonIcon icon={stop} style={{ fontSize: '20px' }} />
                                        </IonBadge>
                                        <IonLabel>
                                            Parar
                                        </IonLabel>
                                    </IonItem>
                                    :
                                    <IonItem id="apontar" onClick={() => { selecionarItem(itemOpcoes) }}>
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
