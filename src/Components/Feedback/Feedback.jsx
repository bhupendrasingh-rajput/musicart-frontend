import React, { useState } from 'react';
import style from './Feedback.module.css';
import Select from 'react-select';
import { feedbackOptions } from '../../Utils/Options';
import { feedBackStyle } from '../../Utils/CustomStyle';
import FeedbackLogo from '../../Assets/Icons/FeedbackLogo.png';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../../Store/Apis/userApi';

const Feedback = () => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackData, setFeedbackData] = useState({ type: '', content: '' });
    const [feedbackError, setFeedbackError] = useState({ type: false, content: false });
    const dispatch = useDispatch();

    const handleFeedbackPopup = () => {
        setIsFeedbackOpen(!isFeedbackOpen);
    };

    const handleTypeChange = (selectedOption) => {
        setFeedbackData({ ...feedbackData, type: selectedOption.value });
        setFeedbackError({ ...feedbackError, type: false });
    };

    const handleContentChange = (e) => {
        setFeedbackData({ ...feedbackData, content: e.target.value });
        setFeedbackError({ ...feedbackError, content: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!feedbackData.type) {
            setFeedbackError({ ...feedbackError, type: true });
            return;
        }
        if (!feedbackData.content.trim()) {
            setFeedbackError({ ...feedbackError, content: true });
            return;
        }

        dispatch(addFeedback(feedbackData));
        setFeedbackData({ type: '', content: '' });
        setIsFeedbackOpen(false);
    };

    return (
        <div className={style.feedback}>
            <div className={style.feedbackCircle} onClick={handleFeedbackPopup}>
                <img src={FeedbackLogo} alt="feedback-logo" />
            </div>
            {isFeedbackOpen &&
                <div className={style.feedbackPopup}>
                    <div className={style.feedbackType}>
                        <p className={style.label}>Type of feedback</p>
                        <Select
                            placeholder={"Choose the type"}
                            options={feedbackOptions}
                            styles={feedBackStyle}
                            onChange={handleTypeChange}
                            value={feedbackOptions.find(option => option.value === feedbackData.type)}
                            className={feedbackError.type ? style.errorSelect : ''}
                        />
                        {feedbackError.type && <p className={style.error}>*Required Field</p>}
                    </div>
                    <div className={style.feedbackContent}>
                        <p className={style.label}>Feedback</p>
                        <textarea
                            name="feedback"
                            placeholder='Type your feedback'
                            className={feedbackError.content ? style.errorSelect : ''}
                            cols="27"
                            rows="5"
                            value={feedbackData.content}
                            onChange={handleContentChange}
                        />
                        {feedbackError.content && <p className={style.error}>*Required Field</p>}
                    </div>
                    <button className={style.submitButton} onClick={handleSubmit}>Submit</button>
                </div>
            }
        </div>
    )
}

export default Feedback;
