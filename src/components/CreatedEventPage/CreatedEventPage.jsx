import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


function CreatedEventPage(){
    const dispatch = useDispatch();
    const event = useSelector(store => store.currentEvent)
    console.log("Here's the event, baybee:", event);
    return (
        <div>
            We've done it
        </div>
    )
}

export default CreatedEventPage;