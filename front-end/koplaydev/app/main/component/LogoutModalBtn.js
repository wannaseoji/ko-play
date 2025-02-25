"use client";

import modifyStudentInfoAxios from "@/app/axios/modifyStudentInfoAxios";
import styles from "./LogoutModalBtn.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useRouter } from "next/navigation";
import logoutAxios from "@/app/axios/logoutAxios";
import { persistor } from '../../../redux/reduxStore';
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function LogoutModalBtn(props) {
  const userInfo = useSelector((state) => state.studentInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const buttonEs = effectSound(buttonSound, 1);

  return (
    <motion.div
      className={styles.LogoutModalBtn}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      onClick={async () => {
        buttonEs.play();
        if (props.bg === "#ffb703") {
          function getCookieValue(name) {
            const cookieArray = document.cookie.split(";");
            for (let i = 0; i < cookieArray.length; i++) {
              const cookie = cookieArray[i].trim();
              if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
              }
            }
            return null;
          }
          // 쿠키에서 Authorization 토큰 가져오기
          const authToken = getCookieValue("Authorization");
          if (authToken == null) {
            throw error;
          }
          
          // useEffect(() => {
            //   const fetchTranslations = async () => {
              //     try {
                //       const result = await translations("ko-KR");
                //       dispatch(changeTranslationWords(result));
                //     } catch (error) {
          //       console.error("Failed to fetch translations:", error);
          //     }
          //   };
          
          //   fetchTranslations(); // 비동기 함수 호출
          // }, [dispatch]);
          
          const response = await logoutAxios();
          
          persistor.purge();
          dispatch({ type: 'RESET_ALL' });
          
          if (response != null) {
            //null이 아니면 성공

            router.replace("/");
          }
        } else {
          props.setLogoutModal(!props.logoutModal);
        }
      }}
    >
      <motion.div
        className={styles.LogoutModalBtnTop}
        style={{
          backgroundColor: props.bg,
        }}
        whileTap={{
          backgroundColor: `${props.shadow}`,
          translateY: "5px",
          translateX: "-5px",
        }}
      >
        {props.children}
      </motion.div>
      <div
        style={{
          backgroundColor: props.shadow,
        }}
        className={styles.LogoutModalBtnBottom}
      />
    </motion.div>
  );
}
