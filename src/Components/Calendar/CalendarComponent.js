import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);

    const Date_Click_Fun = (date) => {
        // Adjust the date to local time by creating a new Date object based on the selected date
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        setSelectedDate(localDate);
    };
    

    const Event_Data_Update = (event) => {
        setEventName(event.target.value);
    };

    const Create_Event_Fun = () => {
        if (selectedDate && eventName) {
            const newEvent = {
                id: new Date().getTime(),
                date: selectedDate,
                title: eventName,
            };
            setEvents([...events, newEvent]);
            setSelectedDate(null);
            setEventName("");
            setSelectedDate(newEvent.date);
        }
    };

    const Update_Event_Fun = (eventId, newName) => {
        const updated_Events = events.map((event) => {
            if (event.id === eventId) {
                return {
                    ...event,
                    title: newName,
                };
            }
            return event;
        });
        setEvents(updated_Events);
    };

    const Delete_Event_Fun = (eventId) => {
        const updated_Events = events.filter((event) => event.id !== eventId);
        setEvents(updated_Events);
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
            <div className="flex flex-col lg:flex-row w-full lg:max-w-5xl">
                <div className="calendar-container bg-white shadow-lg rounded-lg p-6 mb-8 lg:mb-0 lg:mr-8 w-full lg:w-2/5">
                    <Calendar
                        value={selectedDate}
                        onClickDay={Date_Click_Fun}
                        tileClassName={({ date }) =>
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString()
                                ? "bg-blue-500 text-white"
                                : events.some(
                                      (event) =>
                                          event.date.toDateString() === date.toDateString(),
                                  )
                                ? "bg-yellow-400 text-gray-800"
                                : ""
                        }
                    />
                </div>
                <div className="event-container w-full lg:w-3/5">
                    {selectedDate && (
                        <div className="event-form bg-white shadow-lg rounded-lg p-6 mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Event</h2>
                            <p className="text-gray-600 mb-4">Selected Date: {selectedDate.toDateString()}</p>
                            <input
                                type="text"
                                placeholder="Event Name"
                                value={eventName}
                                onChange={Event_Data_Update}
                                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                            />
                            <button
                                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={Create_Event_Fun}
                            >
                                Add Event
                            </button>
                        </div>
                    )}
                    {events.length > 0 && selectedDate && (
                        <div className="event-list bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Created Event List</h2>
                            <div className="event-cards">
                                {events.map((event) =>
                                    event.date.toDateString() === selectedDate.toDateString() ? (
                                        <div
                                            key={event.id}
                                            className="event-card bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
                                        >
                                            <div className="event-card-header flex justify-between items-center mb-2">
                                                <span className="event-date text-gray-700">{event.date.toDateString()}</span>
                                                <div className="event-actions flex">
                                                    <button
                                                        className="bg-yellow-400 text-gray-800 font-semibold py-1 px-2 rounded-lg hover:bg-yellow-500 transition mr-2"
                                                        onClick={() =>
                                                            Update_Event_Fun(
                                                                event.id,
                                                                prompt("Enter New Title"),
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-600 transition"
                                                        onClick={() =>
                                                            Delete_Event_Fun(event.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="event-card-body">
                                                <p className="event-title text-gray-800">{event.title}</p>
                                            </div>
                                        </div>
                                    ) : null,
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
