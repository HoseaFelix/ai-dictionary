'use server'
import Input from "./components/input";
import AnimatedContent from "./components/animatedContent";

 
export default async function Home() {

  return (

   <main className="pt-20 px-10 bg-black mx-auto h-screen  relative overflow-x-hidden text-white pb-50">
      
      <AnimatedContent/>
      <Input/>
    
   </main>
  );
}