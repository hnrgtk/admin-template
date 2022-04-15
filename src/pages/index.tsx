import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Table } from "../components/Table";
import { firestore } from "../services/firebase";

export default function Home() {
  const [users, setUsers] = useState([]);

  const userRef = firestore.collection('users');

  async function getAllUsers() {
    try {
      await userRef.onSnapshot((snapshot) => {
        snapshot.forEach((doc) =>
          setUsers(prevState => [...prevState, doc.data()])
        )
      })
    } catch (err) {
      console.log("ERROR:", err)
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);


  console.log('Users: ', users);

  return (
    <Layout title="Página Inicial" subtitle="Template Admin!">
      <h3>Content!!</h3>
      <Table data={[
        {
          id: 1,
          name: 'Henry Gabriel',
          email: 'henry@email.com',
          subscription: '21/10/2021'
        },
        {
          id: 2,

          name: 'João Macaco',
          email: 'macaco@email.com',
          subscription: '01/10/2021'
        },
        {
          id: 3,
          name: 'Maria da Silva',
          email: 'maria@email.com',
          subscription: '14/10/2021'
        }
      ]} headers={['Nome', 'E-mail', 'Data de inscrição']} />
    </Layout>
  );
}
