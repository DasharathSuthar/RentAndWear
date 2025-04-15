import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminContact() {
    const URL = "http://localhost:8080/Contact/";

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get(URL)
            .then((res) => res.data)
            .then((data) => setContacts(data))
            .catch((err) => console.error("Error fetching contacts:", err));
    }, []);

    return (
        
           
            <div className="p-6 h-screen ">
                <h1 className="text-2xl font-bold text-black mb-4">Contact Requests</h1>
                <div className="bg-gray-300 text-white p-4 rounded-lg shadow-md">
                    {contacts.length === 0 ? (
                        <p>No contact requests yet.</p>
                    ) : (
                        <table className="w-full border border-black text-black">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="p-2 border border-black">Name</th>
                                    <th className="p-2 border border-black">Email</th>
                                    <th className="p-2 border border-black">Subject</th>
                                    <th className="p-2 border border-black">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id} className="border border-black">
                                        <td className="p-2 border border-black">{contact.name}</td>
                                        <td className="p-2 border border-black">{contact.email}</td>
                                        <td className="p-2 border border-black">{contact.subject}</td>
                                        <td className="p-2 border border-black">{contact.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        
    );
}
