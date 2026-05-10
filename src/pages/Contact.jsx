import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader, Footer } from "../components";
import { hero, socialLinks } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: hero.name,
          from_email: form.email,
          to_email: socialLinks.find((s) => s.name === "Email")?.url.replace("mailto:", ""),
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <main className="bg-primary min-h-screen pt-24">
      <section className='section-container relative flex lg:flex-row flex-col gap-10'>
        {alert.show && <Alert {...alert} />}

        <div className='flex-1 min-w-[50%] flex flex-col'>
          <p className="section-label">Collaboration</p>
          <h1 className='section-title'>Let's build <br/><span className="gradient-text">Something Intelligent</span></h1>
          
          <p className="section-subtitle mt-4">
            Whether you're looking to automate a complex workflow or need 
            architectural advice on AI integration, I'm here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='w-full flex flex-col gap-5 mt-10'
          >
            <div className="flex flex-col gap-2">
              <span className='font-oxanium text-xs uppercase tracking-widest text-secondary font-bold'>Your Name</span>
              <input
                type='text'
                name='name'
                className='form-input'
                placeholder='Full Name'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className='font-oxanium text-xs uppercase tracking-widest text-secondary font-bold'>Your Email</span>
              <input
                type='email'
                name='email'
                className='form-input'
                placeholder='name@company.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className='font-oxanium text-xs uppercase tracking-widest text-secondary font-bold'>Message</span>
              <textarea
                name='message'
                rows='4'
                className='form-input'
                placeholder='How can I help you today?'
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary mt-4'
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <span>{loading ? "Transmitting..." : "Initiate Connection"}</span>
            </button>
          </form>
        </div>

        <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] relative'>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10 pointer-events-none" />
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />

            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.629, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;
