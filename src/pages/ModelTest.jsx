import React, { Suspense, useState } from 'react';
import { OrbitControls, useGLTF, Stage, Html, View } from '@react-three/drei';

// A helper to handle the loading state
function Model({ url }) {
  // We use the string URL directly here
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ModelTest = () => {
  // Update these paths to match your EXACT folder structure
  // If "3d models" has a space, ensure it is written exactly like that
 const models = [
    { name: 'Circuit Microchip', url: '/src/assets/3d models/Circuit_Microchip.glb' },
    { name: 'Cloud Sync', url: '/src/assets/3d models/Cloud_Sync.glb' },
    { name: 'Code Brackets', url: '/src/assets/3d models/Code_Brackets.glb' },
    { name: 'Cursor Window', url: '/src/assets/3d models/Cursor_Window.glb' },
    { name: 'Dashboard', url: '/src/assets/3d models/Dashboard.glb' },
    { name: 'Data Flow Pipeline', url: '/src/assets/3d models/Data_Flow_Pipeline.glb' },
    { name: 'Data Vis', url: '/src/assets/3d models/Data_Vis.glb' },
    { name: 'Database', url: '/src/assets/3d models/Database.glb' },
    { name: 'Energy Core', url: '/src/assets/3d models/Energy_Core.glb' },
    { name: 'Envelope', url: '/src/assets/3d models/Envelope.glb' },
    { name: 'Glowing Document', url: '/src/assets/3d models/Glowing_Document.glb' },
    { name: 'HexaCore Crystal', url: '/src/assets/3d models/HexaCore_Crystal.glb' },
    { name: 'Innovation', url: '/src/assets/3d models/Innovation.glb' },
    { name: 'Layered Glass Squares', url: '/src/assets/3d models/Layered_Glass_Squares.glb' },
    { name: 'Lightbulb', url: '/src/assets/3d models/Lightbulb.glb' },
    { name: 'Link Chain', url: '/src/assets/3d models/Link_Chain.glb' },
    { name: 'Neural Network', url: '/src/assets/3d models/Neural_Network.glb' },
    { name: 'Ring Molecule', url: '/src/assets/3d models/Ring_Molecule.glb' },
    { name: 'Ringed Gears', url: '/src/assets/3d models/Ringed_Gears.glb' },
    { name: 'Security Lock', url: '/src/assets/3d models/Security_Lock.glb' },
    { name: 'Server Stack', url: '/src/assets/3d models/Server_Stack.glb' },
    { name: 'Spiral Data', url: '/src/assets/3d models/Spiral_Data.glb' },
    { name: '👤 My Avatar', url: '/models/Avatar.glb' },
  ];

  const [selectedModel, setSelectedModel] = useState(models[0]);

  return (
    <section className="w-full h-screen relative bg-slate-100">
      <div className="absolute top-28 left-0 right-0 z-10 flex justify-center">
        <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col gap-2 border border-slate-200">
          <label className="text-xs uppercase tracking-wider font-black text-slate-400">Model Inspector</label>
          <select 
            className="p-2 bg-slate-50 border rounded-md border-slate-300 outline-none focus:ring-2 focus:ring-blue-400 text-slate-800"
            value={selectedModel.name}
            onChange={(e) => setSelectedModel(models.find(m => m.name === e.target.value))}
          >
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <View className="w-full h-full" camera={{ position: [0, 0, 15], fov: 50 }}>
        <Suspense fallback={<Html center>Loading Model...</Html>}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          
          <Stage environment="city" intensity={0.5}>
            <Model key={selectedModel.url} url={selectedModel.url} />
          </Stage>

          <OrbitControls makeDefault />
        </Suspense>
      </View>
    </section>
  );
};

export default ModelTest;
