import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from '../Sidebar';

const NoteComponent = () => {
    const [notes, setNotes] = useState([]);
    const [newNotes, setNewNotes] = useState({ title: "", description: "" });
    const [editingNote, setEditingNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axiosInstance.get("/api/notes/all");
            setNotes(response.data.notes);
        } catch (error) {
            toast.error("Error fetching notes");
            setNotes([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNotes({ ...newNotes, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { createdAt, ...updateData } = newNotes;
            if (editingNote) {
                const response = await axiosInstance.patch(
                    `/api/notes/update/${editingNote._id}`,
                    { ...updateData, createdAt: new Date() }
                );
                toast.success(response.data.msg);
                setEditingNote(null);
            } else {
                const response = await axiosInstance.post(
                    "/api/notes/create",
                    { ...updateData, createdAt: new Date() }
                );
                toast.success(response.data.msg);
            }
            setNewNotes({ title: "", description: "" });
            setIsModalOpen(false); // Close the modal after submission
            fetchNotes();
        } catch (error) {
            toast.error(error.response.data.msg || "An error occurred");
        }
    };

    const handleEdit = (note) => {
        setNewNotes({ title: note.title, description: note.description, createdAt: note.createdAt });
        setEditingNote(note);
        setIsModalOpen(true); // Open modal when editing a note
    };

    const handleAddNote = () => {
        setNewNotes({ title: "", description: "" });
        setEditingNote(null); // Ensure we're not editing
        setIsModalOpen(true); // Open modal for adding a new note
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation(); // Prevents event from propagating to other elements
        try {
            const response = await axiosInstance.delete(`/api/notes/delete/${id}`);
            toast.success(response.data.msg);
            // Optimistically update the UI by filtering out the deleted note
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            toast.error(error.response.data.msg || "An error occurred");
        }
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const colors = ['#F0A8D0', '#FFEBD4', '#FF76CE', '#FFA62F', '#B0EBB4'];

    return (
        <div>
            {/* <Sidebar /> */}
            <div className="container mx-auto p-4 ml-80 mt-8 w-2/3  rounded  h-2/3">
                <div className="flex items-center mb-4 space-x-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="p-2 w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <button onClick={handleAddNote} className="bg-blue-500 text-white px-4 py-2 rounded">Add New Note</button>
                </div>
                <div>
                    <h1 className='font-medium font-serif text-2xl mb-4 '>My Notes</h1>
                    <div className='grid grid-cols-3 auto-rows-auto'>
                        {notes.map((note, index) => (
                            <div
                                key={note._id}
                                className="block max-w-[18rem] max-h-[12rem] rounded-lg border border-success-600 bg-transparent text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white mb-4 cursor-pointer"
                                onClick={() => handleEdit(note)}
                                
                            >
                                <div className="border-b-2 border-success-600 px-6 py-3 rounded-lg font-serif text-xl text-bold font-medium"
                                    style={{ backgroundColor: colors[index % colors.length] }}>
                                    {note.title}
                                </div>
                                <div className="p-4 overflow-hidden">
                                    <p className="text-base text-success-600 text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {note.description}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <p className="text-sm text-gray-500">
                                            {formatDate(note.createdAt)}
                                        </p>
                                        <button
                                            onClick={() => handleEdit(note)}
                                            className="text-gray-400 px-4 py-2 rounded ml-16"
                                        >
                                            {/* Edit icon */}
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(note._id, e)}
                                            className="text-gray-400 px-4 py-2 ml-6 rounded"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                             </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-600 opacity-70 z-10"></div> {/* Overlay */}
                    <div className="fixed inset-0 flex items-center justify-center z-20">
                        <div className="bg-white p-6 rounded shadow-lg w-1/3">
                            <form onSubmit={handleSubmit}>
                                <ToastContainer />
                                <div className="flex flex-col mb-2">
                                    <p className='text-center mb-4 text-2xl font-semibold'>Note</p>
                                    
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={newNotes.title}
                                        onChange={handleInputChange}
                                        placeholder="Title"
                                        className="p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-2">
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="6"
                                        value={newNotes.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        className="p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    {editingNote ? "Submit" : "Submit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NoteComponent;
