import React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Circle, Stats } from '@react-three/drei'


const Hands3D = () => {

    const gltf = useLoader(GLTFLoader, '/hand_asl.glb')
    return (
        <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
            <directionalLight position={[3.3, 1.0, 4.4]} castShadow />
            <primitive
                object={gltf.scene}
                position={[0, 1, 0]}
                children-0-castShadow
            />
            <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
                <meshStandardMaterial />
            </Circle>

            <axesHelper args={[5]} />
            <Stats />
        </Canvas>
    )
}

export default Hands3D