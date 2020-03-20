import React from 'react';

import {
    FormItem,
    Input,
    Label,
    TextArea,
} from '../Form';

import {
    FormRoot,
} from './StyledComponents';

const EventForm = ({
    className,
    titleRef,
    priceRef,
    dateRef,
    descriptionRef,
}) => {


    return (
        <FormRoot className={className}>
            <FormItem>
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" ref={titleRef} />
            </FormItem>
            <FormItem>
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" ref={priceRef} />
            </FormItem>
            <FormItem>
                <Label htmlFor="date">Date</Label>
                <Input type="datetime-local" id="date" ref={dateRef} />
            </FormItem>
            <FormItem>
                <Label htmlFor="description">Description</Label>
                <TextArea rows="4" id="description" ref={descriptionRef} />
            </FormItem>
        </FormRoot>
    );
};

export default EventForm;