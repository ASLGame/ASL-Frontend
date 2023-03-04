import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei/core'
import Hands3D from './components/Hands3D'
import styles from './demo.module.css'
import { Model } from './components/Hand_asl'
import { Model2 } from './components/Hand_asl2'
const Demo = () => {
    return (
        <div className={styles.canvas3D}>
            <Suspense fallback={null}>
                <Canvas>
                    <ambientLight />

                    <Model2 />
                </Canvas>
            </Suspense>

        </div >
    )
}

export default Demo