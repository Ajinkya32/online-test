import React from "react";
export default function Question({ question, answer, onSelect, idx }) {
  return (
    <div className="question-area">
      <h3>Question {idx + 1}</h3>

      <div className="line-break"></div>

      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((opt, index) => (
          <label className="options-label" key={index}>
            <input
              type="radio"
              name={question.id}
              checked={answer === index}
              onChange={() => onSelect(index)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
