import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from "../hangMan.module.css"
import { isMobile } from 'react-device-detect';

interface WrongLetter {
    wrong: Array<String>;
}

const Figure: FunctionComponent<WrongLetter> = (props) => {

    const errors = props.wrong.length;
    const [isDesktop, setIsDesktop] = useState<Boolean>(true)
    const [base, setBase] = useState<string>('20')

    useEffect(() => {
        if (isMobile) {
            setIsDesktop(false)
            setBase('60')
        } else {
            setIsDesktop(true)
            setBase('20')
        }

    }, [isDesktop])

    return (
        <svg height="250" width="200" className={styles.figureContainer}>
            {/* <!-- Rod --> */}
            {errors > 0 &&

                <line className={styles.base} x1={base} y1="230" x2="100" y2="230" />
            }
            {errors > 1 &&
                <line className={styles.rodUp} x1="60" y1="20" x2="60" y2="230" />
            }

            {errors > 2 &&
                <line className={styles.rodRight} x1="60" y1="20" x2="140" y2="20" />
            }
            {errors > 3 &&

                <line className={styles.rodDown} x1="140" y1="20" x2="140" y2="50" />

            }


            {/* <!-- Head --> */}
            {errors > 4 &&
                <circle className={styles.head} cx="140" cy="70" r="20" />
            }
            {/* <!-- Body --> */}
            {errors > 5 &&
                <line className={styles.torso} x1="140" y1="90" x2="140" y2="150" />
            }
            {/* <!-- Arms --> */}
            {errors > 6 &&
                <line className={styles.armLeft} x1="140" y1="120" x2="120" y2="100" />
            }
            {errors > 7 &&
                <line className={styles.armRight} x1="140" y1="120" x2="160" y2="100" />
            }
            {/* <!-- Legs --> */}
            {errors > 8 &&
                <line className={styles.legLeft} x1="140" y1="150" x2="120" y2="180" />
            }
            {errors > 9 &&
                <line className={styles.legRight} x1="140" y1="150" x2="160" y2="180" />
            }
        </svg>
    )
}

export default Figure