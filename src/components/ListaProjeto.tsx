import { IonBadge, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { Projeto } from "../@types/projeto";
import { checkbox } from "ionicons/icons";
import { ProjetoContext } from "../contexts/projetoContext";
import { useContext, useEffect } from "react";
import { TodoContext } from "../contexts/todoContext";

interface ContainerProps {
    projetoAtual: Projeto
}

const Lista: React.FC<ContainerProps> = ({ projetoAtual }) => {
    const { setOpenModalOpcoes, setProjeto } = useContext(ProjetoContext);

    const todoContextAll = useContext(TodoContext);

    useEffect(()=>{
        todoContextAll.get();
    },[])

    return (
        <>
            <IonList lines={"full"}>
                <IonItem onClick={() => { setOpenModalOpcoes(true); setProjeto(projetoAtual)}}>
                    <IonLabel className="ion-text-wrap">
                        <div>{projetoAtual.nome}</div>
                        <div className="ion-float-end" style={{ display: 'flex' }}>
                            <IonBadge style={{ display: 'flex' }}>
                                <label className='ion-align-self-center'>
                                    {todoContextAll.dados.filter(todo => todo.projetoId === projetoAtual._id).length}
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
