import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei/core'
import { Model } from './components/Hand_asl'
import styles from './demo.module.css'


const Demo = () => {
    return (
        <div className={styles.canvas3D}>
            <Suspense fallback={null}>
                <Canvas >
                    <ambientLight />
                    <pointLight position={[5, 4, -1]} intensity={1} />
                    <pointLight position={[0, 0, 0]} />
                    <Model />
                </Canvas>
            </Suspense>
        </div>


    )
}

export default Demo