import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { createLogEntry } from '../api'
const LogEntryForm = ({ latitude, longitude , onClose}) => {

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState('')

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {
            setLoading(true)
            data.latitude = latitude
            data.longitude = longitude
            const created = await createLogEntry(data)
            onClose()
        } catch (error) {
            console.log(error)
            setError(error)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            {error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="title">Title</label>
            <input name='title' ref={register} required />
            <label htmlFor="comments">Comment</label>
            <textarea name='comments' ref={register} rows={3} />
            <label htmlFor="description">Description</label>
            <textarea name='description' ref={register} rows={3} />
            <label htmlFor="image">Image</label>
            <input name="image" ref={register} />
            <label htmlFor="visitDate">VisitDate</label>
            <input name="visitDate" ref={register} type="date" required />
            <button disabled={loading}> {loading ? 'Loading': 'Create  Entry'}</button>
        </form>
    );
}

export default LogEntryForm