import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Projeto.css';
import { useEffect, useState, useContext } from 'react';
import ListaProjeto from '../../components/ListaProjeto';
import { ProjetoContext } from '../../contexts/projetoContext';
import ModalFormularioProjeto from '../../components/ModalFormularioProjeto';
import ModalOpcoes from '../../components/ModalOpcoes';

const Projeto: React.FC = () => {
    const [filtroItensConcluidos, setFiltroItensConcluidos] = useState<boolean>(false);

    const { dadosFiltrados, get, pesquisar, setPesquisar, projeto } = useContext(ProjetoContext)

    useEffect(() => {
        get();
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lista de projetos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Lista</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonSearchbar value={pesquisar} onIonInput={e => setPesquisar(e.target.value)} style={{ paddingLeft: '3px', paddingRight: '3px' }} animated={true} placeholder='Pesquisar' />

                <IonButtons style={{ marginTop: "5px" }}>
                    <IonButton style={{ width: '50%' }} fill={filtroItensConcluidos ? "outline" : "solid"} color={"primary"} onClick={() => setFiltroItensConcluidos(false)}>
                        Em andamento
                    </IonButton>
                    <IonButton style={{ width: '50%' }} fill={!filtroItensConcluidos ? "outline" : "solid"} color={"primary"} onClick={() => setFiltroItensConcluidos(true)}>
                        Concluídos
                    </IonButton>
                </IonButtons>


                {dadosFiltrados && dadosFiltrados.filter(i => i.concluido === filtroItensConcluidos).map(item => {
                    return <ListaProjeto projetoAtual={item} key={item._id} />
                })}

                <ModalFormularioProjeto item={projeto} />

                <ModalOpcoes />

            </IonContent>
        </IonPage>
    );
};

export default Projeto;
