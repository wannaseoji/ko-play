"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./ChildProfileCard.module.scss";
import deleteChildAxios from "@/app/axios/deleteChildAxios";
import { removeChild } from "@/redux/slices/parentChaildsSlice";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';
const mouseClickSound = "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3";

export default function ChildProfileCard({ name, birth, src, id, bgColor }) {
    const color = { backgroundColor: bgColor };
    const dispatch = useDispatch();
    const router = useRouter();
    const buttonEs = effectSound(buttonSound, 1);
    const mouseClickEs = effectSound(mouseClickSound, 1);

    const handleClick = async (id) => {
        buttonEs.play();
        const response = await deleteChildAxios(id);
        if (response != null) {
            //삭제후로직. 저장된거삭제해줘야함
            dispatch(removeChild(id));  
        }
    };

    const handleProfileClick = () => {
        mouseClickEs.play();
        router.replace(`/parent/child/${id}`);
    };

    return (
        <>
            <div className={`${styles.profileCard} ${styles.profileCardBg}`} style={color} >
                <img className={styles.closeButton} src="close.png" alt="close" onClick={() => handleClick(id)}/>
                <div>
                    <div className={styles.profileInput}  onClick={handleProfileClick} >
                        <img className={styles.profileImg} src={src || "hehe.png"} alt={name}
                            onError={(e) => { e.target.src = "hehe.png"; }}
                        />
                    </div>
                    <h1 className={styles.profileName}>{name}</h1>
                    <h2 className={styles.profileBirth}>{birth}</h2>
                </div>
            </div>
        </>

    );
}

