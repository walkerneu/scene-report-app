import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventPage(){

    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
          type: "SAGA/GET_CURRENT_EVENT",
          payload: id
        })
      }, [])
    const event = useSelector(store => store.currentEvent);
    console.log("We got the event:", event)
    return (
        <div>
            We got the event baybee
        </div>
    )
}

export default EventPage;