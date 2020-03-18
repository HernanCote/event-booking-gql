import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, P } from '../../components/Foundation';

import Backdrop from '../../components/Backdrop';
import Modal from '../../components/Modal';

const EventsControl = styled.div`
    text-align: center;
    border: 1px solid #172839;
    padding: 1rem;
    margin: 2rem auto;
    width: 30rem;
    max-width: 80%;
`;

const EventsIndex = () => {

    const [isCreatingEvent, setIsCreatingEvent] = useState(false);

    const startCreateEvent = () => {
        setIsCreatingEvent(true)
    };

    const modalConfirmHandler = () => {
        setIsCreatingEvent(false);
    };

    const modalCancelHandler = () => {
        setIsCreatingEvent(false);
    };

    return (
        <>
            {isCreatingEvent && (
                <>
                    <Backdrop />
                    <Modal
                        title="Add Event"
                        onCancel={modalCancelHandler}
                        onConfirm={modalConfirmHandler}
                        canCancel
                        canConfirm
                    >
                        <p>Modal content</p>
                    </Modal>
                </>
            )}
            <EventsControl>
                <P>Share your own Events!</P>
                <Button onClick={startCreateEvent}>Create Events</Button>
            </EventsControl>
        </>
    );
};

export default EventsIndex;