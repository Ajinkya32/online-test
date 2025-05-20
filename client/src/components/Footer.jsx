function Footer({ idx, questions, onPrev, onNext, onSubmit }) {
  return (
    <div className="footer">
      <div className="question-next-prev-btn">
        <div className="next-prev-btn">
          <button className="btn btn-prev" onClick={onPrev} disabled={idx === 0}>
            Previous
          </button>
          <button className="btn btn-next" onClick={onNext} disabled={idx === questions.length - 1}>
            Next
          </button>
        </div>

        <button className="btn btn-submit" onClick={onSubmit}>
          Submit Test
        </button>
      </div>
      <div className="line-break"></div>
      <div className="legend">
        <span>
          <span className="box current"></span> Current
        </span>
        <span>
          <span className="box not-visited"></span> Not Attempted
        </span>
        <span>
          <span className="box answered"></span> Answered
        </span>
        <span>
          <span className="box not-answered"></span> Not Answered
        </span>
      </div>
    </div>
  );
}

export default Footer;
