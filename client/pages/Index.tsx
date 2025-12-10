import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: 1,
  },
];

const ScoreCounter = ({ finalScore }: { finalScore: number }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayScore(Math.floor(progress * finalScore));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [finalScore]);

  return (
    <div className="text-7xl md:text-4xl font-bold italic text-transparent bg-clip-text bg-gradient-to-br from-[#0A3D62] to-[#2E8BC0]">
      {displayScore}%
    </div>
  );
};

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const filledSegments = Math.ceil((current / total) * 4);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-4 flex gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${index < filledSegments ? "bg-[#0A385C]" : "bg-[#D8D8D8]"
            }`}
        />
      ))}
    </div>
  );
};

export default function Index() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === QUESTIONS[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / QUESTIONS.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BECFEE] via-[#71C6E2] to-[#D9F4FA] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-[42px] p-4 md:p-6 shadow-xl shadow-blue-900/5">
            <div className="bg-white rounded-[28px] px-8 py-12 md:px-20 md:py-16 shadow-sm min-h-[420px] flex flex-col items-center justify-center">
              <p className="text-quiz-dark text-lg mb-4 font-sans font-medium">
                Keep Learning!
              </p>

              <h2 className="quiz-title text-4xl md:text-5xl mb-10 font-serif italic font-semibold text-[#0A385C]">
                Your Final score is
              </h2>

              <div className="mb-8">
                <ScoreCounter finalScore={score} />
              </div>

              <button
                onClick={handleStartAgain}
                className="bg-[#E0F2FE] hover:bg-blue-100 text-[#0A385C] font-semibold py-4 px-12 rounded-full transition-colors text-lg shadow-sm"
              >
                Start Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BECFEE] via-[#71C6E2] to-[#D9F4FA] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        {/* outer blue frame card */}
        <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-[42px] p-4 md:p-6 shadow-xl shadow-blue-900/5">
          {/* inner white main card */}
          <div className="bg-white rounded-[28px] px-6 py-10 md:px-16 md:py-14 shadow-sm relative overflow-hidden min-h-[540px]">
            {/* mascot inside bottom-left */}
            {currentQuestion === 0 && (
              <div className="absolute -left-4 bottom-0 z-20 flex flex-col items-center pointer-events-none">
                <div className="relative">
                  <img
                    src="/paw.gif"
                    alt="Gift Mascot"
                    className="w-28 md:w-32 drop-shadow-lg"
                  />
                  <img
                    src="/bestofluck.png"
                    alt="Best of Luck"
                    className="absolute -top-14 left-2 w-24 animate-bounce"
                  />
                </div>
              </div>
            )}

            {/* central content column */}
            <div className="max-w-3xl mx-auto flex flex-col min-h-[460px]">
              {/* header */}
              <div className="text-center mb-6">
                <h1
                  className="
                    font-serif font-bold italic 
                    text-4xl md:text-5xl 
                    bg-gradient-to-br from-[#0A3D62] to-[#2E8BC0]
                    text-transparent bg-clip-text 
                    mb-6 tracking-wide
                  "
                >
                  Test Your Knowledge
                </h1>

                <div className="inline-block bg-[#F8FAFC] rounded-full px-8 py-3 mb-4 shadow-sm">
                  <span className="text-[#4A4A4A] text-sm md:text-base font-medium">
                    Answer all questions to see your results
                  </span>
                </div>

                <ProgressBar
                  current={currentQuestion + 1}
                  total={QUESTIONS.length}
                />
              </div>

              {/* question */}
              <div className="bg-[#E0F2FE] rounded-[18px] px-10 py-6 mb-6 text-center">
                <h2 className="text-[#0A385C] text-lg md:text-xl font-medium">
                  {currentQuestion + 1}. {question.question}
                </h2>
              </div>

              {/* options */}
              <div className="flex-1 flex flex-col gap-4 mb-8">
                {question.options.map((option, index) => {
                  const selected = answers[currentQuestion] === index;
                  // lighter, flat options like the mock
                  const base =
                    "w-full py-4 px-8 rounded-[18px] text-base md:text-lg font-medium transition-all duration-200 text-[#0A385C]";
                  const selectedClasses =
                    "bg-[#DDF1FF] shadow-inner border border-[#C5E4FF]";
                  const normalClasses =
                    "bg-[#F7FBFF] hover:bg-[#ECF6FF] border border-transparent";

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      className={`${base} ${selected ? selectedClasses : normalClasses
                        }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* nav buttons row */}
              <div className="flex items-center justify-end gap-4 mt-auto pb-2">
                {/* prev */}
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors text-sm
                    ${currentQuestion === 0
                      ? "bg-[#F3F4F6] text-gray-300 cursor-not-allowed"
                      : "bg-[#F3F4F6] text-gray-600 hover:bg-[#E5E7EB]"
                    }
                  `}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* next / submit */}
                {isLastQuestion && answers[currentQuestion] !== null ? (
                  <button
                    onClick={handleSubmit}
                    className="h-11 px-6 rounded-full bg-[#E0F2FE] hover:bg-blue-100 text-[#0A385C] font-semibold flex items-center justify-center gap-2 text-sm md:text-base transition-colors"
                  >
                    <span>Submit</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={
                      currentQuestion === QUESTIONS.length - 1 ||
                      answers[currentQuestion] === null
                    }
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors text-sm
                      ${currentQuestion === QUESTIONS.length - 1 ||
                        answers[currentQuestion] === null
                        ? "bg-[#DDEAF7] text-blue-200 cursor-not-allowed"
                        : "bg-[#E0F2FE] text-[#0A385C] hover:bg-blue-100"
                      }
                    `}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
