'use client'

import React, { useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion'
import Input from '../../components/Input'
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/app/components/SnackbarContext';
import Textarea from '../../components/Textarea';
import SubmitButton from '../../components/SubmitButton';
import StaggeredText from '../../components/StaggeredText';


const words = [
  { line: '1', word: 'Ship', style: 'pr-2', spanStyle: '' },
  { line: '1', word: 'With', style: '', spanStyle: '' },
  { line: '2', word: 'Confidence', style: '', spanStyle: '' },
]

// const words = [
//   { word: 'Privacy', style: 'pr-2.5 lg:pr-5' },
//   { word: 'Policy', style: '' },
// ]

function GetQuote() {
  const stepCount = 3
  const [step, setStep] = useState(1)
  
  // Calculate progress percentage
  const progress = (step / stepCount) * 100

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    departure_city: '',
    destination_city: '',
    cargo_type: '',
    weight: '',
    dimensions: '',
    shipping_date: '',
    additional_info: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({}); 

  const clearFieldError = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: [] }));
  }, []);

  // Framer Motion variants for sliding steps
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }
  
  // Track direction for animation (+1 for next, -1 for back)
  const [direction, setDirection] = useState(0)

  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  })

  // Parallax effect for image
  const translateY = useTransform(scrollYProgress, [0, 1], ['0px', '0px']);

  const handleNext = () => {
    // Simple validation before moving next
    if (step === 1) {
       if (!form.name || !form.email || !form.phone) return alert("Please fill in all Contact Details");
    }
    if (step === 2) {
       if (!form.departure_city || !form.destination_city || !form.shipping_date) return alert("Please fill in all Route Details");
    }

    setDirection(1)
    setStep((prev) => Math.min(prev + 1, stepCount))
  }

  const handleBack = () => {
    setDirection(-1)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const { showSnackbar } = useSnackbar()
  

  const { quoteCreate } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset previous errors
    setError(null);
    setLoading(true)

    const response = await quoteCreate(form);
    setLoading(false)
    if (response?.success) {
      showSnackbar("Quote request submitted successfully!", "success");
      // Reset form and go back to step 1
      setForm({
        name: '',
        email: '',
        phone: '',
        departure_city: '',
        destination_city: '',
        cargo_type: '',
        weight: '',
        dimensions: '',
        shipping_date: '',
        additional_info: ''
      });
      setStep(1);
    } else if (response?.errors) {
      const fieldErrors = {};

      response.errors.forEach(err => {
        fieldErrors[err.path] = fieldErrors[err.path] || [];
        fieldErrors[err.path].push(err.msg);
      });
      setErrors(fieldErrors);  
    } else if(response?.error) {        
      setError(response.error);
    } else {
      setError("Something went wrong. Please try again.");
    } 
  }

  return (
    <section ref={targetRef} className="bg-gray-200 flex justify-center min-h-screen">
      <div className='h-full container w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 bg-white md:bg-transparent shadow-xl md:shadow-none my-0 overflow-hidden max-w-6xl'>
        
        {/* Left Side - Image */}
        <div className='relative h-64 md:h-screen overflow-hidden'>
          {/* Replaced next/image with motion.img for standard HTML behavior in canvas */}
          <motion.img
            initial={{opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.3,
              delay: 1 * 0.6,
              ease: 'easeOut',
              stiffness: 100,
              damping: 50,
            }}
            data-src="https://res.cloudinary.com/dl4wyqxbe/image/upload/w_20,e_blur:300,q_auto/pexels-kursat-kuzu-42706530-12560711_pywvln.jpg"
            src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1764550175/pexels-kursat-kuzu-42706530-12560711_pywvln.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} // Using direct Pexels link as fallback/placeholder logic
            // src="https://res.cloudinary.com/demo/image/upload/w_20,e_blur:300/sample.jpg"
            // data-src="https://res.cloudinary.com/demo/image/upload/w_1200/sample.jpg"
            alt='Get a quote'
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-black/20 md:hidden" /> */}
        </div>

        {/* Right Side - Form */}
        <div className='flex flex-col md:justify-center bg-white overflow-y-auto relative z-10'>
          <div className='w-full px-8 pb-12 pt-5 md:pt-30 md:max-w-xl mx-auto'>
            
            <div className='mb-4'>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                <span className="block whitespace-nowrap">
                  {words.filter(w => w.line === '1').map((data, index) => (
                    <StaggeredText data={data} index={index} key={index} />
                  ))}
                </span>
                <span className="block whitespace-nowrap">
                  {words.filter(w => w.line === '2').map((data, index) => (
                    <StaggeredText data={data} index={index} key={index} />
                  ))}
                </span>
              </h1>
            </div>

            <motion.div
              initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.3,
                  delay: 1 * 0.6,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 200,
                  damping: 50,
                }}
              >

              <p className='text-gray-500 mb-8'>
                Fill out the form below to receive a personalized quote for our freight charter service.
              </p>
              <div className='mb-8'>
                <div className='flex justify-between items-end mb-2'>
                  <span className='font-semibold text-gray-700'>Step {step} of {stepCount}</span>
                  <span className='text-sm text-gray-400'>
                      {step === 1 && "Contact Info"}
                      {step === 2 && "Route Details"}
                      {step === 3 && "Cargo Details"}
                  </span>
                </div>
                <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden w-full'>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-[#0077FF] h-full rounded-full"
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='min-h-[300px]'> {/* Fixed height to prevent layout jumps */}
                  <AnimatePresence mode='wait' custom={direction}>
                    
                    {/* STEP 1: Contact Information */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className='flex flex-col gap-5'
                      >
                        <h4 className='font-bold text-xl text-gray-800'>Contact Information</h4>
                        <Input
                          label="Full Name"
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          errors={errors.name || []}
                          onFocus={() => clearFieldError('name')}
                        />
                        <div className='flex flex-col md:flex-row gap-4'>
                          <Input
                            label="Email Address"
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            errors={errors.email || []}
                            onFocus={() => clearFieldError('email')}
                          />
                          <Input
                            label="Phone"
                            id="phone"
                            type="text"
                            placeholder="Enter phone number"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required
                            errors={errors.phone || []}
                            onFocus={() => clearFieldError('phone')}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Trip Details */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className='flex flex-col gap-5'
                      >
                        <h4 className='font-bold text-xl text-gray-800'>Route Details</h4>
                        <div className='flex flex-col md:flex-row gap-4'>
                          <Input
                            label="Departure City"
                            id="departure_city"
                            type="text"
                            placeholder="Eg: Accra"
                            value={form.departure_city}
                            onChange={(e) => setForm({ ...form, departure_city: e.target.value })}
                            required
                            errors={errors.departure_city || []}
                            onFocus={() => clearFieldError('departure_city')}
                          />
                          <Input
                            label="Destination City"
                            id="destination_city"
                            type="text"
                            placeholder="Eg: London"
                            value={form.destination_city}
                            onChange={(e) => setForm({ ...form, destination_city: e.target.value })}
                            required
                            errors={errors.destination_city || []}
                            onFocus={() => clearFieldError('destination_city')}
                          />
                        </div>
                        <Input
                            label="Preferred Shipping Date"
                            id="shipping_date"
                            type="date"
                            value={form.shipping_date}
                            onChange={(e) => setForm({ ...form, shipping_date: e.target.value })}
                            required
                            errors={errors.shipping_date || []}
                            onFocus={() => clearFieldError('shipping_date')}
                        />
                      </motion.div>
                    )}

                    {/* STEP 3: Cargo Details */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className='flex flex-col gap-5'
                      >
                        <h4 className='font-bold text-xl text-gray-800'>Cargo Details</h4>
                        <Input
                            label="Cargo Type"
                            id="cargo_type"
                            type="text"
                            placeholder="Eg: Electronics, Textiles..."
                            value={form.cargo_type}
                            onChange={(e) => setForm({ ...form, cargo_type: e.target.value })}
                            required
                            errors={errors.cargo_type || []}
                            onFocus={() => clearFieldError('cargo_type')}
                        />
                        <Input
                            label="Estimated Weight (kg)"
                            id="weight"
                            type="number"
                            placeholder="Eg: 500"
                            value={form.weight}
                            onChange={(e) => setForm({ ...form, weight: e.target.value })}
                            required
                            errors={errors.weight || []}
                            onFocus={() => clearFieldError('weight')}
                        />
                        <Input
                            label="Dimensions (L x W x H in cm)"
                            id="dimensions"
                            type="text"
                            placeholder="Eg: 100 x 50 x 75"
                            value={form.dimensions}
                            onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                            required
                            errors={errors.dimensions || []}
                            onFocus={() => clearFieldError('dimensions')}
                        />
                        <Textarea
                          label="Additional Information (optional)"
                          id="additional_info"
                          rows={3}
                          placeholder="Any special instructions or details about your cargo"
                          value={form.additional_info || ''}
                          onChange={(e) => setForm({ ...form, additional_info: e.target.value })}
                        />

                        {/* <div className='p-4 bg-blue-50 text-blue-800 rounded-lg text-sm mt-2'>
                          <p><strong>Review:</strong> Sending quote for {form.name} from {form.departure_city} to {form.destination_city}.</p>
                        </div> */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className='flex justify-between items-center border-t border-gray-200 pt-6 mt-6'>
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={handleBack}
                      className="text-gray-500 font-medium hover:text-gray-800 transition-colors px-4 py-2"
                    >
                      Back
                    </button>
                  ) : (
                    /* Empty div to keep 'Next' button pushed to the right on Step 1 */
                    <div /> 
                  )}

                  {step < stepCount ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-600 text-white h-12 px-6 font-medium hover:bg-[#0A47C9] transition-colors rounded-3xl"
                    >
                      Next Step
                    </button>
                  ) : (
                    <SubmitButton
                      loading={loading}
                      className={'bg-blue-600 text-white h-12 px-6 font-medium hover:bg-[#0A47C9] transition-colors rounded-3xl'}>
                      Submit Request
                    </SubmitButton>
                  )}
                </div>

                <div className='mt-8 text-center md:text-right'>
                  <div className='text-gray-500 text-xs uppercase tracking-wide mb-1'>Prefer to talk?</div>
                  <a href="tel:+233302908064" className='text-blue-600 text-sm font-medium hover:underline'>
                    +233(0) 30 290 8064/5
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetQuote