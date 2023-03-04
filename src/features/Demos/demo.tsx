import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei/core'
import { Model } from './components/Hand_asl'
import styles from './demo.module.css'


const Demo = () => {
    return (

        <Suspense fallback={null}>
            <Canvas className={styles.canvas3D}>
                <ambientLight />
                <pointLight position={[5, 4, -1]} intensity={1} />
                <pointLight position={[-3, -3, 2]} />

                <Model />


            </Canvas>
        </Suspense>


    )
}

export default Demo