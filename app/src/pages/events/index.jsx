import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';

import {
    Button,
    P,
    H2,
    H3,
} from '../../components/Foundation';

import Backdrop from '../../components/Backdrop';
import Modal from '../../components/Modal';
import EventsForm from '../../components/EventForm';
import EventList from '../../components/EventList';

import authContext from '../../context/auth-context'
import Spinner from '../../components/Spinner';

const EventsRoot = styled.div`
    padding-top: 0.5rem;
`;

const EventsControl = styled.div`
    text-align: center;
    border: 1px solid #172839;
    padding: 1rem;
    margin: 2rem auto;
    width: 30rem;
    max-width: 80%;
`;

const Section = styled.section`
    width: 40rem;
    max-width: 90%;
    margin: 2rem auto;
`;

const EventsIndex = () => {
    const { token, userId } = useContext(authContext);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const titleInput = useRef();
    const priceInput = useRef();
    const dateInput = useRef();
    const descriptionInput = useRef();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        const requestBody = {
            query: `
                query {
                    events {
                        _id
                        title
                        description
                        date
                        price
                        creator {
                            _id
                            email
                        }
                    }
                }
            `,
        };

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }
            const { data, errors } = await response.json();
            if (errors) {
                throw new Error(errors[0].message);
            }
            const { events: fetchedEvents } = data;
            setEvents(fetchedEvents);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    const startCreateEvent = () => {
        setIsCreatingEvent(true)
    };

    const modalConfirmHandler = async () => {
        const title = titleInput.current.value;
        const price = +priceInput.current.value;
        const date = dateInput.current.value;
        const description = descriptionInput.current.value;

        if (
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return;
        }

        const requestBody = {
            query: `
                mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
                    createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
                        _id
                        title
                        description
                        date
                        price
                    }
                }
            `,
            variables: {
                title,
                description,
                price,
                date,
            },
        };

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }
            const { data, errors } = await response.json();
            if (errors) {
                throw new Error(errors[0].message);
            }

            const createdEvent = {
                _id: data.createEvent._id,
                title: data.createEvent.title,
                description: data.createEvent.description,
                date: data.createEvent.date,
                price: data.createEvent.price,
                creator: {
                    _id: userId
                }
            }
            setEvents([...events, createdEvent]);
        }
        catch (err) {
            console.log(err);
        }

        setIsCreatingEvent(false);
    };

    const modalCancelHandler = () => {
        setIsCreatingEvent(false);
        setSelectedEvent(false);
    };

    const bookEventHandler = async () => {
        if (!token) {
            setSelectedEvent(null);
            return;
        }

        const requestBody = {
            query: `
                mutation BookEvent($eventId: ID!) {
                    bookEvent(eventId: $eventId) {
                        _id
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: {
                eventId: selectedEvent._id,
            },
        };

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed');
            }
            const { data, errors } = await response.json();
            if (errors) {
                throw new Error(errors[0].message);
            }

            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setSelectedEvent(null);
        }
    };

    const onViewDetailHandler = eventId => {
        setSelectedEvent(events.find(e => e._id === eventId));
    };

    return (
        <EventsRoot>
            {(isCreatingEvent || selectedEvent) && (
                <Backdrop />
            )}
            {isCreatingEvent && (
                <Modal
                    title="Add Event"
                    onClose={modalCancelHandler}
                    onConfirm={modalConfirmHandler}
                    canClose
                    canConfirm
                    confirmText="Confirm"
                >
                    <EventsForm
                        titleRef={titleInput}
                        priceRef={priceInput}
                        dateRef={dateInput}
                        descriptionRef={descriptionInput}
                    />
                </Modal>
            )}
            {selectedEvent && (
                <Modal
                    title={selectedEvent.title}
                    canConfirm
                    canClose
                    onClose={modalCancelHandler}
                    onConfirm={bookEventHandler}
                    confirmText={token ? "Book" : 'Confirm'}
                >
                    <H2>{selectedEvent.title}</H2>
                    <H3>${selectedEvent.price} - {new Date(selectedEvent.date).toLocaleDateString('DE-de')}</H3>
                    <P>{selectedEvent.description}</P>
                </Modal>
            )}
            {userId && (
                <EventsControl>
                    <P>Share your own Events!</P>
                    <Button onClick={startCreateEvent}>Create Events</Button>
                </EventsControl>
            )}
            <Section>
                {isLoading ?
                    <Spinner /> :
                    <EventList
                        events={events}
                        authUserId={userId}
                        onDetailClicked={onViewDetailHandler}
                    />}
            </Section>
        </EventsRoot>
    );
};

export default EventsIndex;