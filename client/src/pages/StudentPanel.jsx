import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Question from "../components/Question";
import Timer from "../components/Timer";
import Navigator from "../components/Navigator";
import { fetchQuestions, submitResponses, checkSubmission } from "../services/api";
import "./StudentPanel.css";
import Footer from "../components/Footer";

export default function StudentPanel() {
  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState([]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("userId", id);
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;
    checkSubmission(userId).then((res) => {
      if (res.data.submitted) {
        setDone(true);
      } else {
        fetchQuestions().then((res) => {
          const q = res.data;
          setQuestions(q);
          setAnswers(Array(q.length).fill(null));
          setStatus(Array(q.length).fill(0));
        });
      }
    });
  }, [userId]);

  const updateStatus = () => {
    setStatus((st) => {
      const copy = [...st];
      if (copy[idx] === 0) copy[idx] = 1;
      return copy;
    });
  };

  const onSelect = (index) => {
    setAnswers((a) => {
      const c = [...a];
      c[idx] = index;
      return c;
    });
    setStatus((st) => {
      const c = [...st];
      c[idx] = index == null ? 1 : 2;
      return c;
    });
  };

  const onNext = () => {
    updateStatus();
    setIdx((i) => Math.min(i + 1, questions.length - 1));
  };

  const onPrev = () => {
    updateStatus();
    setIdx((i) => Math.max(i - 1, 0));
  };

  const onSubmit = () => {
    submitResponses({
      userId,
      answers: questions.map((question, index) => ({
        questionId: question._id,
        selected: answers[index],
      })),
    }).then(() => setDone(true));
  };

  const onExpire = () => onSubmit();

  if (done)
    return (
      <div className="wrapper">
        <div className="header">Online Test Submitted</div>
        <div className="main">
          <div className="thank-you">
            <h2>Thank you!</h2>
          </div>
        </div>
      </div>
    );

  if (!questions.length) return <div>Loading…</div>;

  return (
    <div className="wrapper">
      <div className="main">
        {/* Left question panel */}
        <div className="left-side">
          <div className="header">Online Test – CAT Preparation</div>

          <Question question={questions[idx]} answer={answers[idx]} onSelect={onSelect} idx={idx} />

          <Footer
            idx={idx}
            questions={questions}
            onPrev={onPrev}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>

        {/* Right sidebar */}
        <div className="sidebar">
          <Timer onExpire={onExpire} />

          <Navigator
            status={status}
            current={idx}
            onJump={(i) => {
              updateStatus();
              setIdx(i);
            }}
          />
        </div>
      </div>
    </div>
  );
}
