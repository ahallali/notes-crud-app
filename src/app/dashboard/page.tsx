'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

  interface Note {
    id: string; 
    title: string;
    content: string;
    userId: string; 
  }

const Dashboard = () => {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState('');


  const fetchNotes = async () => {
    if (session) {
      const userId = session.user.id; 
      const response = await fetch(`/api/notes?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes:', response.statusText);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [session]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCurrentNoteId('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      console.error("User is not logged in");
      return;
    }
    const noteData = { title, content: description, userId: session.user.id }; 

    if (currentNoteId) {
      await fetch(`/api/notes/${currentNoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
    } else {
      await fetch(`/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
    }

    resetForm();
    fetchNotes(); 
    setIsModalOpen(false);
  };

  const handleEdit = (note:Note) => {
    setTitle(note.title);
    setDescription(note.content);
    setCurrentNoteId(note.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id:string) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchNotes(); 
    } else {
      console.error('Failed to delete note:', response.statusText);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Add Note
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {Array.isArray(notes) && notes.map((note:Note) => (
            <div key={note.id} className="bg-blue-200 p-4 rounded shadow-lg h-52 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto no-scrollbar max-h-32 w-52">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="p-2">{note.content}</p>
              </div>
              <div className="flex mt-6 justify-between">
                <button onClick={() => handleEdit(note)} className="text-blue-600 flex items-center">Edit</button>
                <button onClick={() => handleDelete(note.id)} className="text-red-600 flex items-center">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-semibold mb-4">{currentNoteId ? 'Edit Note' : 'Add Note'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="border p-2 mb-2 w-full"
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border p-2 mb-4 w-full"
                  required
                />
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                  <button type="button" onClick={() => { resetForm(); setIsModalOpen(false); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
