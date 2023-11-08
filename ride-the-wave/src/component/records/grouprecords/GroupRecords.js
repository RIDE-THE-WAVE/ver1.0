import React, { useState } from 'react';
import styles from './GroupRecords.module.css';
import logo from '../../img/logo.png'; // 나중에 공통이미지는 따로 관리하기
import arrow from '../../img/arrow.png';
import search_record from '../../img/search_record.png';
import { Link } from 'react-router-dom';
import BottomNav from '../../common/BottomNav';



function GroupRecords() {
    const [username, setUsername] = useState('');
    // 개인 기록(마이페이지)와 겹치는 구간이 매우 많음
    const [activeTurnTab, setActiveTurnTab] = useState('tabSide');
    const [activeLengthTab, setActiveLengthTab] = useState('tabEntireLength');
    const [classToggle, setClassToggle] = useState(false);
    const [showBtn, setShowBtn] = useState(6);

    const findUser = () => {
        console.log(username);
    };

    const findUserByEnter = (e) => {
        if (e.key === 'Enter') {
            findUser();
        }
    };

    const handleShowBtn = (selectedClass) => {
        setShowBtn(selectedClass);
        handleToggle();
    };

    const handleToggle = () => {
        setClassToggle(!classToggle);
    };


    return (
        <div className={styles.GroupRecords}>
            <div className={styles.header}>
                <Link to="/grouprecords">
                    <div className={styles.logo_box}>
                        <img src={logo} alt="logo" />
                    </div>
                </Link>
                <div className={styles.user_search_box}>
                    <div className={styles.user_search_inner_box}>
                        <div className={styles.user_search_img} onClick={findUser}>
                            {/* 버튼 누르면 해당 하는 사람 찾아야함 */}
                            <img src={search_record} alt="search_record" />
                        </div>
                        <div className={styles.user_search}>
                            <input
                                type="text"
                                placeholder="이름"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyUp={findUserByEnter}
                            />
                        </div>
                        <div className={styles.empty}></div>
                    </div>
                </div>
            </div>
            <div className={styles.contents_info_toggle_box}>
                {/* 
                    토글 넣기 - 디비에서 긁어서 
                    myrecord 와 grouprecord 는 같은 컴포넌트를 사용하므로 common 에 빼줘야한다.
                */}
                <div className={styles.contents_period_toggle}>
                    <span className={styles.toggle_img}><img src={arrow} alt="arrow"/></span>
                    <span>&nbsp;2023.06 - 12</span>
                </div>
                <div className={styles.contents_class_toggle}>
                    <div>
                        <span className={styles.toggle_img}><img src={arrow} alt="arrow" onClick={handleToggle}/></span>
                    </div>
                    <div className={styles.toggle}>
                        {(() => {
                            if (classToggle === false) {
                                if (showBtn === 6) {
                                    return (
                                        <div className={`${styles.classBtn}`}>
                                            <span>&nbsp;6AM</span>
                                        </div>
                                    )
                                } else if (showBtn === 7) {
                                    return (
                                        <div className={`${styles.classBtn}`}>
                                            <span>&nbsp;7AM</span>
                                        </div>
                                    )
                                }
                            } else {
                                return (
                                    <div className={`${styles.classBtn} ${styles.classBtn_active}`}>
                                        <span onClick={handleShowBtn.bind(this, 6)}>&nbsp;6AM</span>
                                        <span onClick={handleShowBtn.bind(this, 7)}>&nbsp;7AM</span>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </div>
                <div className={styles.contents_type_toggle}>
                    <span className={styles.toggle_img}><img src={arrow} alt="arrow"/></span>
                    <span>&nbsp;자유형</span>
                </div>
            </div>
            <div className={styles.contents_turn_type}>
                <div className={`${styles.turn_type} ${activeTurnTab === "tabSide" ? styles.turn_type_active : ""}`} onClick={() => setActiveTurnTab("tabSide")}>
                    <span>사이드</span>
                </div>
                <div className={`${styles.turn_type} ${activeTurnTab === "tabFlip" ? styles.turn_type_active : ""}`} onClick={() => setActiveTurnTab("tabFlip")}>
                    <span>플립</span>
                </div>
                <div className={`${styles.turn_type} ${activeTurnTab === "tabStart" ? styles.turn_type_active : ""}`} onClick={() => setActiveTurnTab("tabStart")}>
                    <span>스타트</span>
                </div>
                <div className={`${styles.turn_type} ${activeTurnTab === "tabFin" ? styles.turn_type_active : ""}`} onClick={() => setActiveTurnTab("tabFin")}>
                    <span>오리발</span>
                </div>
                {/* <div className={`${styles.turn_type} ${activeTurnTab === "tabEntireTurn" ? styles.turn_type_active : ""}`} onClick={() => setActiveTurnTab("tabEntireTurn")}>
                    <span>전체</span>
                </div> */}
            </div>
            <div className={styles.contents_length_option_box}>
                <div className={styles.length_option_inner_box}>
                    <div className={`${styles.length_option} ${activeLengthTab === "tabHalf" ? styles.length_option_active : ""}`} onClick={() => setActiveLengthTab("tabHalf")}>
                        <span>25</span>
                    </div>
                    <div className={`${styles.length_option} ${activeLengthTab === "tabFull" ? styles.length_option_active : ""}`} onClick={() => setActiveLengthTab("tabFull")}>
                        <span>50</span>
                    </div>
                    <div className={`${styles.length_option} ${activeLengthTab === "tabEntireLength" ? styles.length_option_active : ""}`} onClick={() => setActiveLengthTab("tabEntireLength")}>
                        <span>전체</span>
                    </div>
                </div>
            </div>
            <div className={styles.contents_box}>
                {/* 모든 턴에 대한 정보를 통째로 갖고 있는 상태에서 해야겠다...?! */}
                <div className={styles.contents}>
                    {/* 반복문으로 구현 및 무한 스크롤 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 7 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름B드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름B</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름B트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름B발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름C드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름C</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름C트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름C발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    {/* 한 사람의 기록 시작 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    {/* 한 사람의 기록 끝 */}
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.content} ${showBtn === 6 ? "" : styles.content_unactive}`}>
                        <div className={`${styles.records} ${activeTurnTab === "tabSide" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A드</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFlip" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabStart" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A트</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                        <div className={`${styles.records} ${activeTurnTab === "tabFin" ? "" : styles.records_unactive}`}>
                            <div className={styles.record}>
                                <span>이름A발</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabHalf")) ? "" : styles.record_unactive}`}>
                                <span>10.00</span>
                            </div>
                            <div className={`${styles.record} ${((activeLengthTab === "tabEntireLength") || (activeLengthTab === "tabFull")) ? "" : styles.record_unactive}`}>
                                <span>21.00</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <BottomNav />
        </div>
    );
}

export default GroupRecords;
