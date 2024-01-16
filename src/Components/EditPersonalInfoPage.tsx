import { useState, useEffect } from 'react';
import { getPersonalInfo } from '../utils/getPersonalInfo';
import '../CSS/EditPersonalInfo.css';
import {editBio, editTitle} from "../utils/editPersonalInfo.tsx";

export const EditPersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState({ name: '', title: '', bio: '' });
    const [editing, setEditing] = useState({ title: false, bio: false });


    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const data = await getPersonalInfo();
                setPersonalInfo(data);
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };

        fetchPersonalInfo();
    }, []);

    const handleEditClick = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleSave = async (field) => {
        
        if (field === 'title') {
            try {
                await editTitle(personalInfo[field]);
            }
            catch (error) {
                console.error('Error editing title:', error);
            }
        }
        
        if (field === 'bio') {
            try {
                await editBio(personalInfo[field]);
            }
            catch (error) {
                console.error('Error editing bio:', error);
            }
        }
        
        setPersonalInfo({ ...personalInfo, [field] : personalInfo[field] });
        setEditing({ ...editing, [field]: false });
    };

    return (
        <div>
            <h2 className="edit-title">Edit Personal Information</h2>
            <div className="info-section">
                <label>Name:</label>
                <div className="info-field">
                    <p>{personalInfo.name}</p>
                </div>
            </div>

            <div className="info-section">
                <label>Title:</label>
                {editing.title ? (
                    <div>
                        <input
                            className={"info-field-input"}
                            type="text"
                            value={personalInfo.title}
                            onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                        />
                        <br/>
                        <button onClick={() => handleSave('title')} className="save-button">Save</button>
                    </div>
                ) : (
                    <>
                        <p>{personalInfo.title}</p>
                        <button onClick={() => handleEditClick('title')} className="edit-button">Edit</button>
                    </>
                )}
            </div>

            <div className="info-section">
                <label>Bio:</label>
                {editing.bio ? (
                    <>
                        <textarea
                            className={"info-field-textarea"}
                            value={personalInfo.bio}
                            onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
                        />
                        <br/>
                        <button onClick={() => handleSave('bio')} className="save-button">Save</button>
                    </>
                ) : (
                    <>
                        <p>{personalInfo.bio}</p>
                        <button onClick={() => handleEditClick('bio')} className="edit-button">Edit</button>
                    </>
                )}
            </div>
        </div>
    );
};
