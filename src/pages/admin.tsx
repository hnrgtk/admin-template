import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Table } from "../components/Table";
import { firestore } from "../services/firebase";

export default function Home() {
  const [adminUsers, setAdminUsers] = useState([]);

  const userRef = firestore.collection('users');

  async function getAllAdminUsers() {
    try {
      await userRef.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const { displayName, email, subscription } = doc.data();
          setAdminUsers(prevState => [...prevState, {
            name: displayName,
            email,
            subscription: subscription && subscription?.toDate().toDateString()
          }])
        }
        )
      })
    } catch (err) {
      console.log("ERROR:", err)
    }
  }

  useEffect(() => {
    getAllAdminUsers();
  }, []);

  return (
    <Layout title="Página Inicial" subtitle="Template Admin!">
      <h3>Content!!</h3>
      <Table data={adminUsers} headers={['Nome', 'E-mail', 'Data de inscrição']} />
    </Layout>
  );
}
