import { useEffect, useRef, useState } from 'react'
import { Html, PerspectiveCamera as DreiPerspectiveCamera } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import GUI from 'lil-gui'
import { DoubleSide, type PerspectiveCamera } from 'three'
import './App.css'

const initialCamera = {
  x: 0,
  y: 2,
  z: 2.5,
  targetX: 0,
  targetY: 1.9,
  targetZ: 0,
  fov: 45,
}
const initialCameraPosition: [number, number, number] = [initialCamera.x, initialCamera.y, initialCamera.z]

type ItemSettings = {
  x: number
  y: number
  z: number
  scaleX: number
  scaleY: number
  scaleZ: number
  rotationY: number
}

const initialItems = {
  lamp: { x: -2.1, y: 1.14, z: -0.45, scaleX: 1, scaleY: 1, scaleZ: 1, rotationY: 0 },
  corkboard: { x: -1.25, y: 1.7, z: -0.95, scaleX: 1.25, scaleY: 1.25, scaleZ: 1, rotationY: 20 },
  window: { x: 0, y: 2.4, z: -1.52, scaleX: 2.1, scaleY: 1.55, scaleZ: 1, rotationY: 0 },
  radio: { x: 1.65, y: 1.25, z: -0.65, scaleX: 1.2, scaleY: 1.3, scaleZ: 1.6, rotationY: -27 },
  calendar: { x: 0.25, y: 1.35, z: -0.9, scaleX: 1, scaleY: 0.75, scaleZ: 1, rotationY: 0 },
  clock: { x: 0.65, y: 1.25, z: -0.75, scaleX: 1, scaleY: 1, scaleZ: 1, rotationY: -8 },
} satisfies Record<string, ItemSettings>

type ItemName = keyof typeof initialItems
const itemNames = Object.keys(initialItems) as ItemName[]

const legPositions: [number, number, number][] = [
  [-2.15, 0.5, -0.95],
  [2.15, 0.5, -0.95],
  [-2.15, 0.5, 0.95],
  [2.15, 0.5, 0.95],
]

function CameraSetup({
  guiContainer,
  setItems,
}: {
  guiContainer: HTMLDivElement | null
  setItems: React.Dispatch<React.SetStateAction<Record<ItemName, ItemSettings>>>
}) {
  const cameraRef = useRef<PerspectiveCamera>(null)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return

    const cameraSettings = { ...initialCamera }
    const updateCamera = () => {
      camera.position.set(cameraSettings.x, cameraSettings.y, cameraSettings.z)
      camera.lookAt(cameraSettings.targetX, cameraSettings.targetY, cameraSettings.targetZ)
      camera.fov = cameraSettings.fov
      camera.updateProjectionMatrix()
      invalidate()
    }

    updateCamera()
    if (!guiContainer) return

    const gui = new GUI({ container: guiContainer, title: 'Scene setup' })
    const cameraFolder = gui.addFolder('Camera')
    const position = cameraFolder.addFolder('Position')
    position.add(cameraSettings, 'x', -10, 10, 0.1).name('X').onChange(updateCamera)
    position.add(cameraSettings, 'y', 0.1, 10, 0.1).name('Y').onChange(updateCamera)
    position.add(cameraSettings, 'z', 0.1, 15, 0.1).name('Z').onChange(updateCamera)

    const target = cameraFolder.addFolder('Look at')
    target.add(cameraSettings, 'targetX', -5, 5, 0.1).name('X').onChange(updateCamera)
    target.add(cameraSettings, 'targetY', -5, 5, 0.1).name('Y').onChange(updateCamera)
    target.add(cameraSettings, 'targetZ', -5, 5, 0.1).name('Z').onChange(updateCamera)
    cameraFolder.add(cameraSettings, 'fov', 20, 90, 1).name('Field of view').onChange(updateCamera)

    const itemsFolder = gui.addFolder('Items')
    for (const name of itemNames) {
      const settings: ItemSettings = { ...initialItems[name] }
      const folder = itemsFolder.addFolder(name[0].toUpperCase() + name.slice(1))
      const updateItem = () => {
        setItems((current) => ({ ...current, [name]: { ...settings } }))
      }

      folder.add(settings, 'x', -4, 4, 0.05).name('X').onChange(updateItem)
      folder.add(settings, 'y', 0, 4, 0.05).name('Y').onChange(updateItem)
      folder.add(settings, 'z', -2, 2.5, 0.05).name('Z').onChange(updateItem)
      folder.add(settings, 'scaleX', 0.4, 2.5, 0.05).name('Width').onChange(updateItem)
      folder.add(settings, 'scaleY', 0.4, 2.5, 0.05).name('Height').onChange(updateItem)
      folder.add(settings, 'scaleZ', 0.4, 2.5, 0.05).name('Depth').onChange(updateItem)
      folder.add(settings, 'rotationY', -180, 180, 1).name('Y rotation').onChange(updateItem)
      folder.close()
    }
    itemsFolder.close()

    return () => gui.destroy()
  }, [guiContainer, invalidate, setItems])

  return (
    <DreiPerspectiveCamera
      makeDefault
      ref={cameraRef}
      position={initialCameraPosition}
      fov={initialCamera.fov}
    />
  )
}

function TablePlaceholder() {
  return (
    <group>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[4.8, 0.18, 2.4]} />
        <meshStandardMaterial color="#936b4f" roughness={0.9} />
      </mesh>
      {legPositions.map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]}>
          <boxGeometry args={[0.18, 1, 0.18]} />
          <meshStandardMaterial color="#654937" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function ItemShape({ name }: { name: ItemName }) {
  switch (name) {
    case 'lamp':
      return (
        <group>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 20]} />
            <meshStandardMaterial color="#84906b" />
          </mesh>
          <mesh position={[0, 0.47, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.9, 12]} />
            <meshStandardMaterial color="#5b6651" />
          </mesh>
          <mesh position={[0, 0.98, 0]}>
            <coneGeometry args={[0.3, 0.3, 24, 1, true]} />
            <meshStandardMaterial color="#b7c39b" side={DoubleSide} />
          </mesh>
          <Html center position={[0, 1.16, 0]} distanceFactor={4} className="item-label">Lamp</Html>
        </group>
      )
    case 'corkboard':
      return (
        <group>
          <mesh>
            <boxGeometry args={[1.3, 0.9, 0.08]} />
            <meshStandardMaterial color="#ab7652" />
          </mesh>
          <Html center position={[0, 0, 0.06]} distanceFactor={4} className="item-label">Corkboard</Html>
        </group>
      )
    case 'window':
      return (
        <group>
          <mesh>
            <boxGeometry args={[1.9, 1.2, 0.08]} />
            <meshStandardMaterial color="#eee5d6" />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.72, 1.02]} />
            <meshStandardMaterial color="#9cb9be" />
          </mesh>
          <Html center position={[0, 0, 0.07]} distanceFactor={4} className="item-label">Window</Html>
        </group>
      )
    case 'radio':
      return (
        <group>
          <mesh>
            <boxGeometry args={[0.8, 0.42, 0.32]} />
            <meshStandardMaterial color="#a98255" />
          </mesh>
          <Html center position={[0, 0, 0.18]} distanceFactor={4} className="item-label">Radio</Html>
        </group>
      )
    case 'calendar':
      return (
        <group>
          <mesh>
            <boxGeometry args={[0.7, 0.65, 0.12]} />
            <meshStandardMaterial color="#e9ded0" />
          </mesh>
          <Html center position={[0, 0, 0.08]} distanceFactor={4} className="item-label">Calendar</Html>
        </group>
      )
    case 'clock':
      return (
        <group>
          <mesh>
            <boxGeometry args={[0.52, 0.32, 0.2]} />
            <meshStandardMaterial color="#76665c" />
          </mesh>
          <Html center position={[0, 0, 0.12]} distanceFactor={4} className="item-label">Clock</Html>
        </group>
      )
  }
}

function Placeholders({ items }: { items: Record<ItemName, ItemSettings> }) {
  return (
    <>
      {itemNames.map((name) => {
        const item = items[name]
        return (
          <group
            key={name}
            position={[item.x, item.y, item.z]}
            scale={[item.scaleX, item.scaleY, item.scaleZ]}
            rotation={[0, (item.rotationY * Math.PI) / 180, 0]}
          >
            <ItemShape name={name} />
          </group>
        )
      })}
    </>
  )
}

function App() {
  const [guiContainer, setGuiContainer] = useState<HTMLDivElement | null>(null)
  const [items, setItems] = useState<Record<ItemName, ItemSettings>>(initialItems)

  return (
    <main className="app">
      <section className="scene" aria-label="3D desk blockout with wall and labeled item placeholders">
        <Canvas
          frameloop="demand"
          dpr={[1, 2]}
          fallback={<p className="scene-fallback">This scene needs a browser with WebGL support.</p>}
        >
          <color attach="background" args={['#e6d9c7']} />
          <ambientLight intensity={2} />
          <directionalLight position={[3, 6, 5]} intensity={2.5} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#c9b9a3" roughness={1} />
          </mesh>
          <mesh position={[0, 2, -1.65]}>
            <boxGeometry args={[12, 4, 0.1]} />
            <meshStandardMaterial color="#e6d9c7" roughness={1} />
          </mesh>
          <TablePlaceholder />
          <Placeholders items={items} />
          <CameraSetup guiContainer={guiContainer} setItems={setItems} />
        </Canvas>
        {import.meta.env.DEV && <div className="camera-gui" ref={setGuiContainer} />}
        <div className="scene-label">
          <h1>Lo-fi Nook</h1>
          <p>Desk layout blockout</p>
        </div>
      </section>
      <section className="project-info" aria-label="Project information">
        <p>A quiet interactive desk is taking shape.</p>
      </section>
    </main>
  )
}

export default App
