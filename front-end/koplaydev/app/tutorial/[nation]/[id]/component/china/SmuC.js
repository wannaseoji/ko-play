"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Tutorial.module.scss";
import { useDispatch } from "react-redux";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function SmuC() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const tutorialImages = [
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC1.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC2.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC3.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/smugogae/smuC6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC4.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC5.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC6.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC7.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC8.png",
    "https://ko-play.s3.ap-northeast-2.amazonaws.com/tutorial/nation/china/commonC9.png",
  ];

  const handleNextStep = () => {
    if (currentStep < tutorialImages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      dispatch(changeGamePurposeIdx(0));
      dispatch(changeModalIdx(0));
      router.replace("/main");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.tutorialContainer}>
      <img
        src={tutorialImages[currentStep]}
        alt={`Tutorial Step ${currentStep + 1}`}
      />
      <button
        className={`${styles.navButton} ${styles.leftButton}`}
        onClick={handlePrevStep}
        disabled={currentStep === 0}
      >
        ◀
      </button>
      <button
        className={`${styles.navButton} ${styles.rightButton}`}
        onClick={handleNextStep}
      >
        ▶
      </button>
    </div>
  );
}
