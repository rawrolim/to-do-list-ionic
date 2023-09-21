import { IonBadge, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { Item } from "../@types/todo";
import { chatbubble, hourglass } from "ionicons/icons";
import { TodoContext } from "../contexts/todoContext";
import { ProjetoContext } from "../contexts/projetoContext";
import { useContext, useEffect } from "react";

interface ContainerProps {
    item: Item
}

const Lista: React.FC<ContainerProps> = ({ item }) => {
    const { itemApontando, setItemOpcoes, setOpenModalOpcoes } = useContext(TodoContext);
    const { get, dados } = useContext(ProjetoContext);

    useEffect(() => {
        get();
    }, [item])

    return (
        <>
            <IonList lines={"full"}>
                <IonItem onClick={() => { setOpenModalOpcoes(true); setItemOpcoes(item); }}>
                    <IonLabel className="ion-text-wrap">
                        <div>{item.titulo}</div>
                        <div className="ion-float-end" style={{ display: 'flex' }}>

                            {dados.length > 0 &&
                                <IonBadge color={"medium"} style={{ display: 'flex', marginRight: '5px' }}>
                                    <label style={{ textTransform: 'capitalize' }} className='ion-align-self-center'>
                                        {dados.find(dado => dado._id === item.projetoId).nome}
                                    </label>
                                </IonBadge>
                            }

                            {itemApontando && (itemApontando._id === item._id) &&
                                <IonBadge color={"success"} style={{ display: 'flex', marginRight: '5px' }}>
                                    <label className='ion-align-self-center'>
                                        Apontando
                                    </label>
                                </IonBadge>
                            }
                            <IonBadge style={{ display: 'flex', marginRight: '5px' }}>
                                <label className='ion-align-self-center'>
                                    {Math.floor((item.tempo / 60) % 60)}:{Math.floor((item.tempo) % 60)}
                                </label>
                                <IonIcon icon={hourglass} style={{ fontSize: "24px" }} />
                            </IonBadge>

                            <IonBadge style={{ display: 'flex' }}>
                                <label className='ion-align-self-center'>
                                    {item.comentarios.length}
                                </label>
                                <IonIcon icon={chatbubble} style={{ fontSize: "24px" }} />
                            </IonBadge>
                        </div>
                    </IonLabel>
                </IonItem>
            </IonList>
        </>
    );
};

export default Lista;
