import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Todo.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENV } from '../../environments/environment';
import Lista from '../../components/Lista';
import Item from '../../interfaces/Item';

const Todo: React.FC = () => {
  const [dados, setDados] = useState<Item[]>([]);

  useEffect(() => {
    getDados();
  },[])

  async function getDados(){
    const res = await axios.get(ENV.BACKEND_URI);
    const data = res.data;
    setDados(data);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lista</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {dados && dados.map(item => {
          return <Lista item={item} key={item._id} />
        })}
      </IonContent>
    </IonPage>
  );
};

export default Todo;
