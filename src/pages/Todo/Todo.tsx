import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Todo.css';
import { useEffect, useState, useContext } from 'react';
import Lista from '../../components/Lista';
import { TodoContext } from '../../contexts/todoContext';
import ModalForularioItem from '../../components/ModalFormularioItem.tsx';
import ModalOpcoes from '../../components/ModalOpcoes';

const Todo: React.FC = () => {
  const [filtroItensConcluidos, setFiltroItensConcluidos] = useState<boolean>(false);

  const {dadosFiltrados, get, pesquisar, setPesquisar, itemOpcoes } = useContext(TodoContext)

  useEffect(() => {
    get();
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de tarefas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lista</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar value={pesquisar} onIonInput={e=>setPesquisar(e.target.value)}   style={{paddingLeft: '3px', paddingRight: '3px'}} animated={true} placeholder='Pesquisar' />

        <IonButtons style={{marginTop:"5px"}}>
          <IonButton style={{width:'50%'}} fill={filtroItensConcluidos? "outline":"solid"} color={"primary"} onClick={()=>setFiltroItensConcluidos(false)}>
            Pendentes
          </IonButton>
          <IonButton style={{width:'50%'}} fill={!filtroItensConcluidos? "outline":"solid"} color={"primary"} onClick={()=>setFiltroItensConcluidos(true)}>
            Concluídos
          </IonButton>
        </IonButtons>


        {dadosFiltrados && dadosFiltrados.filter(i => i.concluido === filtroItensConcluidos).map(item => {
          return <Lista item={item} key={item._id} />
        })}

        <ModalForularioItem item={itemOpcoes} />

        <ModalOpcoes />

      </IonContent>
    </IonPage>
  );
};

export default Todo;
